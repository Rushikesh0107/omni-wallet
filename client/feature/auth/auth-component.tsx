"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./sign-in/sign-in-form";
import SignUpForm from "./sign-up/sign-up-form";
import { useState } from "react";

const AuthComponent = () => {
  const [tab, setTab] = useState("sign-up");

  return (
    <div className="w-full max-w-md shadow-xl p-10 rounded-4xl bg-white">
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="flex flex-col items-center gap-6"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        </TabsList>

        <TabsContent value="sign-up" className="w-full">
          <SignUpForm />
        </TabsContent>
        <TabsContent value="sign-in" className="w-full">
          <SignInForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthComponent;
