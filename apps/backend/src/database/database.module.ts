import { databaseProvider } from "./database.provide";
import { Module } from "@nestjs/common";

@Module({
	providers: [databaseProvider],
	exports: [databaseProvider]
})
export class DatabaseModule {}
