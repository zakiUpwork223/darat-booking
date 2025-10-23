export interface RequestUser {
    id: string;
    email: string;
    contactNumber: string;
    role: string;
}

export interface User {
    id?: string;
    profilePic?: string;
    name?: string;
    email?: string;
    contactNumber?: string;
    password?: string;
    medicalHistory?: any[]; // Making medicalHistory optional
    role?: string; // Making role optional
    createdAt?: string;
    updatedAt?: string;
    is_emailVerified?: boolean;
    is_contactNumberVerified?: boolean;
    loyaltyType?: any; // Making loyaltyType optional
    is_Active?: boolean;
    is_Deleted?: boolean;

}
