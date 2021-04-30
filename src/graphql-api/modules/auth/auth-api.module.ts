import { Module } from "@nestjs/common";
import AuthModule from "src/modules/auth/auth.module";
import { AuthResolver } from "./auth.resolver";

@Module({
    imports: [
        AuthModule
    ],
    providers: [AuthResolver]
})
export class AuthApiModule {}