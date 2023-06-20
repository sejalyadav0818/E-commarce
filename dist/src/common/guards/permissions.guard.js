"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
let PermissionsGuard = class PermissionsGuard {
    constructor(reflector, jwtService, prismaService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.prismaService = prismaService;
    }
    canActivate(context) {
        const requireRoles = this.reflector.getAllAndOverride("permissions", [context.getHandler(), context.getClass()]);
        if (!requireRoles) {
            return true;
        }
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        const { token } = request.cookies;
        if (!token) {
            response.render("error");
        }
        const user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString("utf-8"));
        const permissions = user.permissions;
        const permissionArr = Object.values(permissions);
        let value = [];
        for (var i = 0; i < permissions.length; i++) {
            value.push(permissions[i]);
        }
        return requireRoles.some((permission) => permissionArr.includes(permission));
    }
};
PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], PermissionsGuard);
exports.default = PermissionsGuard;
//# sourceMappingURL=permissions.guard.js.map