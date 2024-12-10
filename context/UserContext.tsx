"use client";

import { IUser, UserContextType } from "@/@types/types";
import { createContext, useState } from "react";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);

	const updateUser = (user: IUser) => {
		setCurrentUser(user);
		localStorage.setItem("role", user.role);
	};

	const clearUser = () => {
		setCurrentUser(null);
		localStorage.removeItem("role");
	};

	return (
		<UserContext.Provider value={{ currentUser, updateUser, clearUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
