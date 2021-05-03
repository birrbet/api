export enum ShopType {
    online = "ONLINE", branch = "BRANCH"
}
export class Location {
    lat: number;
    lon: number;
}

export class Contact {
    type: string;
    value: string;
}
export interface IShop {
    branchName: string;
    isActive: boolean
    admin: string;
    type: ShopType;
    contacts: Contact[];
    location: Location
}