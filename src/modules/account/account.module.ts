import { Module } from "@nestjs/common";
import { AccountDbModule } from "src/infrastructure/database/modules/account-db.module";
import { AccountService } from "./account.service";

@Module({
    imports: [
        AccountDbModule
    ],
    providers: [AccountService]
})
export class AccountModule {}