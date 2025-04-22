//src/types/addressTypes.ts
export interface Address {
    id?: number;
    name: string;
    mobile: string;
    pinCode: string;
    address: string;
    locality: string;
    city: string;
    state: string;
}

export enum UserRole {
    ROLE_CUSTOMER = 'ROLE_CUSTOMER',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_SELLER = 'ROLE_SELLER',
}

export interface User {
    id?: number;
    password?: string;
    email: string;
    fullName: string;
    mobile?: string;
    role: UserRole;
    addresses?: Address[]; // Optional, since user might not have addresses yet.
}

export interface UserState {
    user: User | null;
    addresses: Address[];  // Can be set as empty or null initially
    loading: boolean;
    error: string | null;
    profileUpdated: boolean;
}
