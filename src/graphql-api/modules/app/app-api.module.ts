import { Module } from "@nestjs/common";
import { AppResolver } from "./app.resolver";

@Module({
    providers: [AppResolver]
})
export class AppApiModule { }