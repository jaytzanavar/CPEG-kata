export interface User {
    id: string;
    name: string;
    lastName: string;
    password: string;
    email: string;
    bookedRoom: Array<String>;
}