import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as express from "express";
import { cwd } from "process";
import * as cookieParser from "cookie-parser";
import { InternalServerErrorExceptionFilter } from "./http-execptiion/InternalServerError.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new InternalServerErrorExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.setViewEngine("ejs");
  app.enableCors();
  const cwd = process.cwd();
  app.useStaticAssets(cwd + "");
  app.use(cookieParser());
  app.use(express.static("public"));
  await app.listen(7000);
}
bootstrap();
