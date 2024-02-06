import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { DepartmentList } from "./department/DepartmentList";
import { DepartmentCreate } from "./department/DepartmentCreate";
import { DepartmentEdit } from "./department/DepartmentEdit";
import { DepartmentShow } from "./department/DepartmentShow";
import { LecturerList } from "./lecturer/LecturerList";
import { LecturerCreate } from "./lecturer/LecturerCreate";
import { LecturerEdit } from "./lecturer/LecturerEdit";
import { LecturerShow } from "./lecturer/LecturerShow";
import { CourseList } from "./course/CourseList";
import { CourseCreate } from "./course/CourseCreate";
import { CourseEdit } from "./course/CourseEdit";
import { CourseShow } from "./course/CourseShow";
import { CourseLecturerList } from "./courseLecturer/CourseLecturerList";
import { CourseLecturerCreate } from "./courseLecturer/CourseLecturerCreate";
import { CourseLecturerEdit } from "./courseLecturer/CourseLecturerEdit";
import { CourseLecturerShow } from "./courseLecturer/CourseLecturerShow";
import { CourseSessionList } from "./courseSession/CourseSessionList";
import { CourseSessionCreate } from "./courseSession/CourseSessionCreate";
import { CourseSessionEdit } from "./courseSession/CourseSessionEdit";
import { CourseSessionShow } from "./courseSession/CourseSessionShow";
import { ScheduleList } from "./schedule/ScheduleList";
import { ScheduleCreate } from "./schedule/ScheduleCreate";
import { ScheduleEdit } from "./schedule/ScheduleEdit";
import { ScheduleShow } from "./schedule/ScheduleShow";
import { ScheduleCourseList } from "./scheduleCourse/ScheduleCourseList";
import { ScheduleCourseCreate } from "./scheduleCourse/ScheduleCourseCreate";
import { ScheduleCourseEdit } from "./scheduleCourse/ScheduleCourseEdit";
import { ScheduleCourseShow } from "./scheduleCourse/ScheduleCourseShow";
import { ReviewList } from "./review/ReviewList";
import { ReviewCreate } from "./review/ReviewCreate";
import { ReviewEdit } from "./review/ReviewEdit";
import { ReviewShow } from "./review/ReviewShow";
import { ReviewLikeList } from "./reviewLike/ReviewLikeList";
import { ReviewLikeCreate } from "./reviewLike/ReviewLikeCreate";
import { ReviewLikeEdit } from "./reviewLike/ReviewLikeEdit";
import { ReviewLikeShow } from "./reviewLike/ReviewLikeShow";
import { jwtAuthProvider } from "./auth-provider/ra-auth-jwt";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"barnomz"}
        dataProvider={dataProvider}
        authProvider={jwtAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="Department"
          list={DepartmentList}
          edit={DepartmentEdit}
          create={DepartmentCreate}
          show={DepartmentShow}
        />
        <Resource
          name="Lecturer"
          list={LecturerList}
          edit={LecturerEdit}
          create={LecturerCreate}
          show={LecturerShow}
        />
        <Resource
          name="Course"
          list={CourseList}
          edit={CourseEdit}
          create={CourseCreate}
          show={CourseShow}
        />
        <Resource
          name="CourseLecturer"
          list={CourseLecturerList}
          edit={CourseLecturerEdit}
          create={CourseLecturerCreate}
          show={CourseLecturerShow}
        />
        <Resource
          name="CourseSession"
          list={CourseSessionList}
          edit={CourseSessionEdit}
          create={CourseSessionCreate}
          show={CourseSessionShow}
        />
        <Resource
          name="Schedule"
          list={ScheduleList}
          edit={ScheduleEdit}
          create={ScheduleCreate}
          show={ScheduleShow}
        />
        <Resource
          name="ScheduleCourse"
          list={ScheduleCourseList}
          edit={ScheduleCourseEdit}
          create={ScheduleCourseCreate}
          show={ScheduleCourseShow}
        />
        <Resource
          name="Review"
          list={ReviewList}
          edit={ReviewEdit}
          create={ReviewCreate}
          show={ReviewShow}
        />
        <Resource
          name="ReviewLike"
          list={ReviewLikeList}
          edit={ReviewLikeEdit}
          create={ReviewLikeCreate}
          show={ReviewLikeShow}
        />
      </Admin>
    </div>
  );
};

export default App;
