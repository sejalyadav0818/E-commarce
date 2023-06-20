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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(req, res) {
        try {
            const { cookie } = req.headers;
            const user = JSON.parse(Buffer.from(cookie.split(".")[1], "base64").toString("utf-8"));
            const userId = user.id;
            const subtotal = await this.prismaService.cart.findMany({
                where: {
                    userId: userId,
                },
            });
            var finaltotal = 0;
            for (var i = 0; i < subtotal.length; i++) {
                var finaltotal = finaltotal + subtotal[i].total;
            }
            const order = await this.prismaService.order.create({
                data: {
                    total: finaltotal,
                    userId: userId,
                },
            });
            res.send(order);
        }
        catch (err) {
            throw err;
        }
    }
    async findAll(req, res) {
        const orders = await this.prismaService.order.findMany({
            include: {
                user: true,
            },
        });
        const name = orders[0].user.name;
        const email = orders[0].user.email;
        return { orders: orders, name: name };
    }
    async findOrderByUser(req, res) {
        const { cookie } = req.headers;
        const user = JSON.parse(Buffer.from(cookie.split(".")[1], "base64").toString("utf-8"));
        const userId = user.sub;
        const orders = await this.prismaService.order.findMany({
            where: {
                userId: userId,
            },
            include: {
                orderItems: true,
            },
        });
        return { orders };
    }
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map