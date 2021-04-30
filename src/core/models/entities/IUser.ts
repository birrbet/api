import { IRole } from "./iRole";

export interface IUser {
    firstName: string;
    lastName: string;
    age: string;
    username: string;
    password?: string;
    role: string | IRole;
    isActive: boolean;
    isLockedOut: boolean;
    isVerified: boolean;
}