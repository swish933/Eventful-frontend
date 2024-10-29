"use client";

import { useContext, useLayoutEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { AuthContext } from "@/context/AuthContext";
import {
  ApiResponse,
  AuthContextType,
  IUser,
  UserContextType,
} from "@/@types/types";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";

export default function Layout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser, updateUser } = useContext(
    UserContext,
  ) as UserContextType;

  const { token } = useContext(AuthContext) as AuthContextType;

  useLayoutEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  useLayoutEffect(() => {
    async function fetchUser() {
      let response = await axiosInstance.get(`/api/v1/users`);

      let userDetails: ApiResponse<IUser> = response.data;

      updateUser(userDetails.payload);
    }

    fetchUser();
  }, []);

  return <>{currentUser?.role === "organizer" ? admin : user}</>;
}
