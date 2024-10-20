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
	organizer: string ;
	customers: string[];
	createdAt: string;
	updatedAt: string;
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
	organizer:  { avatar: string; username: string };
	customers: string[];
	createdAt: string;
	updatedAt: string;
}

export type UserContextType = {
	currentUser: IUser | null;
	updateUser: (u: IUser) => void;
};

export type AuthContextType = {
	token: string | null;
	updateToken: (t: string) => void;
	deleteToken: () => void;
};

export type ApiResponse<T> = {
	message?: string;
	payload: T;
};
