import { Prop } from "@nestjs/mongoose";
// services
// url

export class Package {
    @Prop({type: String, required: String})
    name: string;

    configs: string;

    permissions: string;
}