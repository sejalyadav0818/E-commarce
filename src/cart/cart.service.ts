import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Request, Response } from "express";

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
  
  create(createCartDto: CreateCartDto, req: Request, res: Response) {
    return this.prismaService.cart.create({ data: createCartDto });
  }
  async addItemtoCart(
    productId: number,
    quantity: number,
    total: number,
    req: Request,
    res: Response
  ) {
    try {
      const { cookie } = req.headers;
      const user = JSON.parse(
        Buffer.from(cookie.split(".")[1], "base64").toString("utf-8")
      );

      const userId = user.id;
      const cartItem = await this.prismaService.cart.findFirst({
        where: { productId: +productId, userId: +userId },
      });

      if (!cartItem) {
        const carts = await this.prismaService.cart.create({
          data: {
            productId: +productId,
            userId: +userId,
            quantity: +quantity,
            total: +total,
          },
        });

        res.redirect("/cart/cart_page");
      } else {
        const upatecart = await this.prismaService.cart.update({
          where: { id: cartItem.id },
          data: {
            productId: +productId,
            userId: +userId,
            quantity: +(cartItem.quantity + quantity),
            total: +(cartItem.total + total),
          },
        });
      }
    } catch (err) {
      throw err;
    }
  }

  async getAllCart(req: Request, res: Response) {
    //  console.log(req.headers);
    const { cookie } = req.headers;
    //console.log(cookie);

    const user = JSON.parse(
      Buffer.from(cookie.split(".")[1], "base64").toString("utf-8")
    );

    //console.log(user.sub, user.email);

    const userId = user.sub;

    const carts = await this.prismaService.cart.findMany({
      where: { userId: userId },
      include: {
        user: true,
        product: true,
      },
    });
    //console.log("get all cart");
    //console.log("carts",carts);

    // console.log("carts",carts[1].product.image_url);

    return { carts };
  }

  async clearCart(req: Request, res: Response) {
    const { token } = req.cookies;
    const user = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );
    //console.log(user.id);
    const userId = user.id;
    await this.prismaService.cart.deleteMany({
      where: {
        userId: userId,
      },
    });
  }

  async remove(id: number, req: Request, res: Response) {
    await this.prismaService.cart.delete({ where: { id: +id } });
    // res.redirect('/cart/cart_page');
    // return `This action removes a #${id} cart`;
  }

  async getProductByCart(req: Request, res: Response) {
    const { token } = req.cookies;
    const user = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );
    //console.log(user.id);
    const userId = user.id;
    //console.log("dfjskhg",await this.prismaService.cart.findMany({where:{userId: userId}}))

    const pbycart = await this.prismaService.cart.findMany({
      where: { userId: userId },
    });

    res.send(pbycart);
  }
}
