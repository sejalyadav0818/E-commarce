import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Request, Response } from "express";

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async create(req: Request, res: Response) {
    try {
      const { cookie } = req.headers;
      const user = JSON.parse(
        Buffer.from(cookie.split(".")[1], "base64").toString("utf-8")
      );
      const userId = user.id;
      const subtotal = await this.prismaService.cart.findMany({
        where: {
          userId: userId,
        },
      });

      var finaltotal = 0;
      // console.log("subtotal",subtotal);
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
    } catch (err) {
      throw err;
    }
  }

  async findAll(req: Request, res: Response) {
    const orders = await this.prismaService.order.findMany({
      include: {
        user: true,
      },
    });
    const name = orders[0].user.name;
    const email = orders[0].user.email;

    return { orders: orders, name: name };
  }

  async findOrderByUser(req: Request, res: Response) {
    const { cookie } = req.headers;

    const user = JSON.parse(
      Buffer.from(cookie.split(".")[1], "base64").toString("utf-8")
    );

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

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
