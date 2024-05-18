<<<<<<< HEAD
"use client";
=======
"use  client";
>>>>>>> 92cd3db57e92c1e16b0ba05658e9e35bcdbb63da
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
