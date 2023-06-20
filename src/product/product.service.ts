import { Injectable, Req, Res, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response } from "express";

@Injectable()
export class ProductService {
  constructor(private readonly prismaSerivce: PrismaService) {}
  

  async getAllprodcut() {
    return await this.prismaSerivce.product.findMany({
      include: { catrgory: true },
    });
  }
  async getAllCategories() {
    return this.prismaSerivce.category.findMany();
  }

  async getAllprodcutandCategorty() {
    return await this.prismaSerivce.product.findMany({
      include: { catrgory: true },
    });
  }
  // async getAllTextwithFilter(searchDto: SearchDto) {
  //   let tasks = await this.getAllprodcutandCategorty();
  //   const { search } = searchDto;
  //   console.log(tasks);
  //   console.log(tasks[0].product_name);
  //   console.log(search);

  //   if (search) {
  //     tasks = (await tasks).filter((task) =>
  //       task.product_name.includes(search) ||  task.product_description.includes(search) ||  task.catrgory[0].category_name.includes(search)
  //     );
  //   }

  //   console.log(tasks);

  //   return tasks;
  // }


  //category dropdowm

  // async catgoryDropdwon() {
  //   return await this.prismaSerivce.product.findMany({
  //     where: { id: +id },
  //     data :{
            
  //     },
  //     include: { catrgory: true },
  //   });
  // }

  async createUser(
    dto: CreateProductDto,
    req: Request,
    category_id: number,
    file
  ) {
    const product = await this.prismaSerivce.product.create({
      data: {
        product_name: dto.product_name,
        product_description: dto.product_description,
        product_price: dto.product_price,
        product_image: file.path,
        catrgory: {
          connect: { id: +category_id },
        },
      },
      include: {
        catrgory: true,
      },
    });
    return product;
  }
  // update many to many
  async updatedata(
    categoryId: number,
    product_name: string,
    product_description: string,
    product_price: string,
    product_image: string,
    id: number,
    req: Request,
    res: Response
  ) {
    try {
      return await this.prismaSerivce.product.update({
        where: { id: +id },
        data: {
          product_name: product_name,
          // product_description: product_description,
          // product_price: product_price,
          // product_image: product_image,
          catrgory: {
            connect: { id: +categoryId },
          },
        },
        include: { catrgory: true },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async editUserById(
    id: number,
    product_name: string,
    product_description: string,
    product_price: string,
    categoryId: number,
    req: Request
  ) {
    await this.prismaSerivce.product.update({
      where: {
        id: id,
      },
      data: {
        product_name: product_name,
        product_description: product_description,
        product_price: product_price,
        catrgory: {
          connect: {
            id: +categoryId,
          },
        },
      },
      include: { catrgory: true },
    });
  }
  async deleteproductById(id: number) {
    await this.prismaSerivce.product.delete({
      where: {
        id: +id,
      },
    });
  }
  async usersAllProducts(req: Request, res: Response) {
    try {
      const products = await this.prismaSerivce.product.findMany({
        include: {
          catrgory: true,
        },
      });
      console.log(products);
      console.log("pwithc", products[0].catrgory[0].category_name);
      return { products };
    } catch (err) {
      throw err;
    }
  }
  async findProductById(id: number, req: Request, res: Response) {
    try {
      const product = await this.prismaSerivce.product.findUnique({
        where: {
          id,
        },
        include: {
          catrgory: true,
        },
      });

      // console.log("pro", product);

      return { product };
    } catch (err) {
      throw err;
    }
  }
  async findAllProducts() {
    try {
      const query = {
        include: { catrgory: true },
      };
      return await this.prismaSerivce.product.findMany(query);
    } catch (err) {
      throw err;
    }
  }
   async productByCategory(category_name: string, res: Response, req: Request) {
    try {
      const products = await this.prismaSerivce.product.findMany({
        where: {
          catrgory: {
            some: {
              category_name: {
                contains: category_name,
              },
            },
          },
          // categories:[{
          //   where:{id: categoryId}
          // }]
        },
        include: {
          catrgory: true,
        },
      });

      res.render("user_home_page", { products });
      // res.redirect('/products/user_product')
      // return {products}
    } catch (err) {
      throw err;
    }
  }
   async findProduct(id: number) {
    try {
      return await this.prismaSerivce.product.findUnique({
        where: { id },
        include: {
          catrgory: true,
        },
      });

      // console.log('pro', product);

      // return { product };
    } catch (err) {
      throw err;
    }
  }

  async search(req, res) {
    try {
      const page = req.page || 1;
      const perPage = 2;

      const skip = page > 0 ? perPage * (page - 1) : 0;
      const search = await this.prismaSerivce.product.findMany({
        skip: skip,
        take: perPage,
        include: {
          catrgory: true,
        },
        where: {
          OR: [
            {
              product_name: {
                startsWith: req.data,
              },
            },

            {
              product_description: {
                startsWith: req.data,
              },
            },
            {
              product_price: {
                startsWith: req.data,
              },
            },
          ],
        },
      });
      console.log('searched d', search);
      return search;
    } catch (error) {
      throw error;
    }
  }
}

