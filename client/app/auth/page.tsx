import React from "react";
import AuthComponent from "@/feature/auth/auth-component";

const page = (): React.ReactNode => {
  return (
    <div className="flex w-full h-screen bg-indigo-100">
      {/* Left: Video */}
      <div className="flex-1 flex flex-col gap-5 items-center justify-center p-10 md:block hidden">
        <h1 className="text-4xl font-semibold text-center">OmniWallet</h1>
        <video
          className="w-full max-w-lg border-2 border-indigo-400/50 rounded-4xl shadow-xl"
          src="/wallet.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Right: Auth */}
      <div className="flex-1 flex items-center justify-center p-5 md:p-0">
        <AuthComponent />
      </div>
    </div>
  );
};

export default page;
