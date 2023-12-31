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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUser() {
        return await this.prisma.user.findMany({
            include: { role: true },
            where: {
                roleId: { not: 3 },
            },
        });
    }
    async hashPassword(password) {
        return await argon.hash(password);
    }
    async createUser(dto) {
        const { name, email, password, roleId } = dto;
        const findUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (findUser) {
            throw new common_1.BadRequestException("Email already exists");
        }
        const hashedPassword = await this.hashPassword(dto.password);
        await this.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                roleId: roleId,
            },
        });
    }
    async deleteUserById(id) {
        await this.prisma.user.delete({
            where: {
                id: +id,
            },
        });
    }
    async editUserById(id, dto, req) {
        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name,
                email: dto.email,
            },
        });
        const updatedUser = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return updatedUser;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map