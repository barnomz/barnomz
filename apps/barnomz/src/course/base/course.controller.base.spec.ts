import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { CourseController } from "../course.controller";
import { CourseService } from "../course.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  capacity: 42,
  code: "exampleCode",
  createdAt: new Date(),
  credit: 42,
  examDate: new Date(),
  group: 42,
  id: "exampleId",
  info: "exampleInfo",
  name: "exampleName",
  numberOfEnrolled: 42,
  numberOfPetitioners: 42,
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  capacity: 42,
  code: "exampleCode",
  createdAt: new Date(),
  credit: 42,
  examDate: new Date(),
  group: 42,
  id: "exampleId",
  info: "exampleInfo",
  name: "exampleName",
  numberOfEnrolled: 42,
  numberOfPetitioners: 42,
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    capacity: 42,
    code: "exampleCode",
    createdAt: new Date(),
    credit: 42,
    examDate: new Date(),
    group: 42,
    id: "exampleId",
    info: "exampleInfo",
    name: "exampleName",
    numberOfEnrolled: 42,
    numberOfPetitioners: 42,
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  capacity: 42,
  code: "exampleCode",
  createdAt: new Date(),
  credit: 42,
  examDate: new Date(),
  group: 42,
  id: "exampleId",
  info: "exampleInfo",
  name: "exampleName",
  numberOfEnrolled: 42,
  numberOfPetitioners: 42,
  updatedAt: new Date(),
};

const service = {
  createCourse() {
    return CREATE_RESULT;
  },
  courses: () => FIND_MANY_RESULT,
  course: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Course", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CourseService,
          useValue: service,
        },
      ],
      controllers: [CourseController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /courses", async () => {
    await request(app.getHttpServer())
      .post("/courses")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        examDate: CREATE_RESULT.examDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /courses", async () => {
    await request(app.getHttpServer())
      .get("/courses")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          examDate: FIND_MANY_RESULT[0].examDate.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /courses/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/courses"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /courses/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/courses"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        examDate: FIND_ONE_RESULT.examDate.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /courses existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/courses")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        examDate: CREATE_RESULT.examDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/courses")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
