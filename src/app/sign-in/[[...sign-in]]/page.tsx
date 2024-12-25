import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div className="bg-blend-normal w-screen h-screen bg-indigo-800 opacity-5 fixed -z-10"></div>
      <div className="grid place-content-center mt-14">
        <SignIn />
      </div>
    </>
  );
}
