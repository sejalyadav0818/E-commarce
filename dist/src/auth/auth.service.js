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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const runtime_1 = require("@prisma/client/runtime");
const argon = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_1 = require("crypto");
const nodemailer = require("nodemailer");
const constants_1 = require("../utils/constants");
let AuthService = class AuthService {
    constructor(prisma, jwtService, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "codebackup122@gmail.com",
                pass: "uuceenmlfvmxcnos",
            },
        });
    }
    async forgotPassword(email, req, res) {
        const resetToken = await this.generateSecureToken();
        await this.prisma.user.update({
            where: { email },
            data: { resetToken },
        });
        const mailOptions = {
            from: "codebackup122@gmail.com",
            to: email,
            subject: "Password Reset",
            text: `Your password reset token is: ${resetToken}`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async resetPassword(email, token, newPassword, req, res) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || user.resetToken !== token) {
            throw new Error("Invalid reset token");
        }
        const hashedPassword = await argon.hash(newPassword);
        await this.prisma.user.update({
            where: { email },
            data: { password: hashedPassword, resetToken: null },
        });
    }
    async generateSecureToken() {
        return new Promise((resolve, reject) => {
            (0, crypto_1.randomBytes)(20, (err, buf) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(buf.toString("hex"));
                }
            });
        });
    }
    async signupLocal(dto, req, res) {
        const hash = await argon.hash(dto.password);
        await this.prisma.user
            .create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hash,
                roleId: dto.roleId,
            },
        })
            .catch((error) => {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credentials incorrect");
                }
            }
            throw error;
        });
        res.redirect("/auth/signin");
    }
    async signinLocal(dto, req, res) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        const findPermissions = await this.prisma.role.findUnique({
            where: { id: user.roleId },
            include: {
                permissions: true,
            },
        });
        const permi = findPermissions.permissions;
        const ob = {};
        for (var i = 0; i < permi.length; i++) {
            ob[i] = permi[i].name;
        }
        if (!user)
            throw new common_1.ForbiddenException("Access Denied");
        const passwordMatches = await argon.verify(user.password, dto.password);
        if (!passwordMatches)
            throw new common_1.ForbiddenException("Access Denied");
        const tokens = await this.signToken({
            id: user.id,
            email: user.email,
            roleId: user.roleId,
            permissions: ob,
        });
        res.cookie("jwt_payload", tokens);
        const products = await this.prisma.product.findMany({
            include: { catrgory: true },
        });
        const categories = await this.prisma.category.findMany();
        if (!tokens) {
            throw new common_1.ForbiddenException();
        }
        const decodet = this.jwtService.decode(tokens);
        res.cookie("token", tokens, {});
        if (user.roleId == 2 || user.roleId == 3) {
            res.render("darshboard");
        }
        if (user.roleId == 1) {
            res.render("user_home_page", {
                products: products,
                categories: categories,
            });
        }
        return tokens;
    }
    async signToken(args) {
        const payload = args;
        return this.jwtService.signAsync(payload, { secret: constants_1.jwtSecret });
    }
    async getAllprodcut() {
        return await this.prisma.product.findMany({
            include: { catrgory: true },
        });
    }
    async getAllCategories() {
        return this.prisma.category.findMany();
    }
    async logout(userId, req, res) {
        res.clearCookie("jwt_payload");
        res.clearCookie("token");
        return true;
    }
    async updateRtHash(userId, rt, res) {
        const hash = await argon.hash(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });
    }
    async getUserFromToken(req, res) {
        const { token } = req.cookies;
        const user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString("utf-8"));
        const uid = user.id;
        return uid;
    }
};
__decorate([
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "forgotPassword", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map