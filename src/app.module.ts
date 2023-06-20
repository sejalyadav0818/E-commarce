import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { MulterModule } from "@nestjs/platform-express";
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RolesGuard from './common/guards/roles.guard';
import PermissionsGuard from './common/guards/permissions.guard';
import { LoggerMiddleware } from './middlewear/logger.middleware';
import {InternalServerErrorExceptionFilter} from './http-execptiion/InternalServerError.filter';
@Module({
  imports: [JwtModule,
    PrismaModule,
    AuthModule,
    UserModule,
    CategoriesModule,
    MulterModule.register({
      dest: "./files",
    }),
    ProductModule,
    AdminModule,
    CartModule,
    OrdersModule,
    RolesModule,
  ],  controllers: [AppController],
  providers: [AppService,JwtService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },{
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard
    },
    {
        provide: APP_FILTER,
        useClass: InternalServerErrorExceptionFilter
    },
  ],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('Product');
  }
}