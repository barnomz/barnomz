import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import BForm from "@/components/dls/BForm";
import BInput from "@/components/dls/BInput";
import BInputPassword from "@/components/dls/BInputPassword";
import BBtn from "@/components/dls/BBtn";
import Head from "next/head";
import BLink from "@/components/dls/BLink";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { hasValue } from "@/utils/validations";
import { useToast } from "@/components/dls/toast/ToastService";
import { getServerAuthSession } from "@/server/auth";
import messages from "@/constants/messages.js";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState([false, false]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    studentNumber: "",
  });

  const handleLogin = async (isFormValid, formIndex) => {
    if (!isFormValid) return;

    setIsLoading((prev) =>
      prev.map((loading, i) => (i === formIndex ? true : loading)),
    );
    const result = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
      studentNumber: credentials.studentNumber,
      method: formIndex === 0 ? "username" : "studentNumber",
      callbackUrl: "/schedules",
    });

    if (result.ok && result.url) {
      await router.replace(result.url);
      toast.open({ message: messages.LOGIN_SUCCESS, type: "success" });
    } else {
      console.error("Login failed:", result.error);
      if (result.error === "CredentialsSignin") {
        toast.open({
          message: "ورود ناموفق بود.",
          type: "error",
        });
      } else {
        toast.open({ message: "خطایی رخ داده است.", type: "error" });
      }
      setIsLoading((prev) =>
        prev.map((loading, i) => (i === formIndex ? false : loading)),
      );
    }
  };

  const updateField = (field) => (event) => {
    setCredentials({
      ...credentials,
      [field]: event.target.value,
    });
  };

  const usernameValidations = [
    { rule: hasValue, message: "وارد کردن نام کاربری الزامی است." },
  ];

  const studentNumberValidations = [
    { rule: hasValue, message: "وارد کردن شماره دانشجویی الزامی است." },
  ];

  const passwordValidations = [
    { rule: hasValue, message: "وارد کردن رمز عبور الزامی است." },
  ];

  return (
    <>
      <Head>
        <title>برنومز | ورود</title>
      </Head>
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-primary/50 p-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-grey-50">ورود به برنومز</h2>
          <BForm onSubmit={(isFormValid) => handleLogin(isFormValid, 0)}>
            <BInput
              required
              label="نام کاربری"
              placeholder="نام کاربری خود را وارد نمایید"
              validations={usernameValidations}
              onChange={updateField("username")}
            />
            <BInputPassword
              required
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد نمایید"
              validations={passwordValidations}
              onChange={updateField("password")}
            />
            <BBtn
              type="submit"
              className="mb-4 min-h-[44px]"
              block
              loading={isLoading[0]}
            >
              ورود
            </BBtn>
            <BLink
              to="/auth/register"
              iconSize="1x"
              postIcon={faArrowLeft}
              className="mx-auto max-w-fit"
            >
              ثبت‌نام نکرده‌اید؟
            </BLink>
          </BForm>
          <div className="relative flex h-px w-full items-center justify-center gap-2">
            <div className="h-px w-full bg-white/40"></div>
            <div className="flex h-6 w-6 items-center justify-center font-bold text-white">
              یا
            </div>
            <div className="h-px w-full bg-white/40"></div>
          </div>
          <BForm onSubmit={(isFormValid) => handleLogin(isFormValid, 1)}>
            <div className="flex items-center gap-4">
              <BInput
                required
                label="شماره دانشجویی"
                placeholder="شماره دانشجویی خود را وارد نمایید"
                validations={studentNumberValidations}
                className="w-full"
                wrapperClass="!h-[46px] mt-1"
                onChange={updateField("studentNumber")}
              />
              <BBtn
                type="submit"
                className="min-w-[52px]"
                loading={isLoading[1]}
              >
                ورود
              </BBtn>
            </div>
          </BForm>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerAuthSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
