import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import { AtStrategy, RtStrategy } from "../auth/strategies";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { CategoriesModule } from "src/categories/categories.module";
import { CategoriesService } from "src/categories/categories.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule,],
      useFactory: async () => ({
        secret: "buybuihbikhkhk",
        signOptions: { expiresIn: "15m" },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(), // Add this line to import the ConfigModule
    PrismaModule,
    CategoriesModule
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, AtStrategy, RtStrategy, UserService,CategoriesService],
})
export class UserModule {}
