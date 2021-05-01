export interface IPermission {
  name: string; // display name
  normalizedName: string; // to upper case
}

export interface IRole {
  name: string; // display name
  normalizedName: string; // to upper case
  permissions: string[] | IPermission[];
}
