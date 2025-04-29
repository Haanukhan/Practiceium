import LoginClient from "./_components/login-client";

const LoginPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
      <div className="relative z-10 w-full max-w-lg mx-auto">
        <LoginClient />
      </div>
    </div>
  );
};
export default LoginPage;
