export interface IUser {
	id: string;
	email: string;
	username: string;
	avatar: string;
	phoneNumber: string;
	role: string;
	orders: string[];
	events: string[];
	createdAt?: string;
	updatedAt?: string;
}

export interface IEvent {
	id: string;
	name: string;
	images: string[];
	description: string;
	price: number;
	location: string;
	startsAt: string;
	endsAt: string;
	eventType: string;
	organizer: string;
	customers: string[];
	createdAt: string;
	updatedAt: string;
	ticketsSold?: number;
	admitted?: number;
}

export interface IPopulatedEvent {
	id: string;
	name: string;
	images: string[];
	description: string;
	price: number;
	location: string;
	startsAt: string;
	endsAt: string;
	eventType: string;
	organizer: { avatar: string; username: string };
	customers: string[];
	createdAt: string;
	updatedAt: string;
}

export interface IAnalytics {
	attendees: number;
	tickets: number;
	scannedCodes: number;
}

export interface IOrder {
	id: string;
	amount: number;
	qrCode: string;
	status: string;
	customer: string;
	event: Pick<
		IEvent,
		"images" | "location" | "name" | "price" | "startsAt" | "eventType" | "id"
	>;
}

export interface IOrderById {
	id: string;
	amount: number;
	qrCode: string;
	status: string;
	customer: Pick<IUser, "email">;
	event: Pick<IEvent, "location" | "name" | "price" | "startsAt" | "eventType">;
}

export type UserContextType = {
	currentUser: IUser | null;
	updateUser: (u: IUser) => void;
	clearUser: () => void;
};

export type AuthContextType = {
	auth: string | null;
	updateToken: (t: string) => void;
	deleteToken: () => void;
};

export type ApiResponse<T> = {
	message?: string;
	payload: T;
};
