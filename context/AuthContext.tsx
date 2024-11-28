"use client";

import { AuthContextType } from "@/@types/types";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [auth, setAuth] = useState<string | null>(null);

	const router = useRouter();

	const updateToken = (t: string) => {
		setAuth(t);
		localStorage.setItem("token", t);
	};

	const deleteToken = () => {
		setAuth(null);
		localStorage.removeItem("token");
		router.push("/login");
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setAuth(token);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ auth, updateToken, deleteToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
