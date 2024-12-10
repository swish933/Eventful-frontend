export const isAuthenticated = (): boolean => {
	return localStorage.getItem("token") ? true : false;
};

export const checkRole = (): string | null => {
	return localStorage.getItem("role");
};
