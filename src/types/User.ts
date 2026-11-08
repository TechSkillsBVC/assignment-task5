// A user's account details, as sent back by the API when they log in.
export interface User {
    name: {
        first: string;
        last: string;
    };
    email: string;
    id: string;
    mobile: string;
}
