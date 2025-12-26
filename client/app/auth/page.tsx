import React from "react";
import AuthComponent from "@/feature/auth/auth-component";

const page = (): React.ReactNode => {
  return (
    <div className="flex w-full h-screen">
      {/* Left: Video */}
      <div className="flex-1 hidden md:flex flex-col items-center justify-center gap-5 p-10">
        <h1 className="text-4xl font-semibold text-center">OmniWallet</h1>
        <video
          className="w-full max-w-md border-2 border-indigo-400/50 rounded-4xl shadow-xl"
          src="/wallet.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Right: Auth */}
      <div className="flex-1 flex flex-col gap-5 items-center justify-center p-5 md:p-0">
        <h1 className="text-4xl font-semibold text-center md:hidden">
          OmniWallet
        </h1>
        <AuthComponent />
      </div>
    </div>
  );
};

export default page;
