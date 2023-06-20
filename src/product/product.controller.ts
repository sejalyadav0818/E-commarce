import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
  Request,
  Response,
  Query,
} from "@nestjs/common";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { diskStorage } from "multer";
import { CreateProductDto } from "./dto/create-product.dto";
import { SearchDto } from "./dto/serch-dto";
import { Roles } from 'src/auth/entities/roles.decorator';
import { Role } from 'src/auth/entities/role.enum';
import { Permissions } from 'src/auth/entities/permissions.decorator';
import { Permission } from 'src/auth/entities/permissions.enum';
import { ProductService } from "../product/product.service";
import { GetCurrentUserId, Public } from "src/common/decorators";
import { Express } from "express";
import { CategoriesService } from "../categories/categories.service";
import { CreateCategoryDto } from "../categories/dto/create-category.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { get, request } from "http";
import { extname } from "path";
import { Cart } from "@prisma/client";
import { log } from "console";
@Controller("Product")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoriesService: CategoriesService
  ) {}

  @Public()
  // @Roles(Role.ADMIN,Role.USER)
  @Get("/user_product")
  @Render("user_home_page")
  userProductPage(@Req() req, @Res() res) {
    return this.productService.usersAllProducts(req, res);
  }

  @Public()
  // @Roles(Role.ADMIN)
  @Get("/cart/:id")
  @Render("product_Details")
  showProductInCart(@Param("id") id: number, @Req() req, @Res() res) {
    return this.productService.findProductById(Number(id), req, res);
  }

  @Public()
  // @Roles(Role.ADMIN)
  // @Permissions(Permission.MANAGE_PRODUCT)
  @Get("/product_details")
  @Render("product_Details")
  productDetailPage(@Req() req, @Res() res) {}

  @Public()
  @Get("/try")
  @Render("addtocart")
  @Get()
  Data() {
    return { msg: "product Create" };}
  productData() {
    return this.productService.findAllProducts();
  }
  
  // @Roles(Role.ADMIN)
  @Get("/product_by_cat/:category_name")
  @Render("user_home_page")
  async productByCategory(
    @Param("category_name") category_name: string,
    @Res() res,
    @Req() req
  ) {
    const products = await this.productService.productByCategory(
      category_name,
      res,
      req
    );
    return { products: products };
  }

  @Public()
  @Get("product/edit/:id")
  // @Render('product_Details')
  findProduct(@Param("id") id: number) {
    return this.productService.findProduct(id);
  }

  @Public()
  @Get("product/:id")
  @Render("product_Details")
  async findClickedProduct(@Param("id") id: number, @Req() req, @Res() res) {
    return await this.productService.findProductById(Number(id), req, res);
  }

  @Public()
  @Post("/products")
  @UseInterceptors(
    FileInterceptor("product_image", {
      storage: diskStorage({
        destination: "./public",
        filename(req, file, callback) {
          callback(null, `${file.originalname}`);
        },
      }),
    })
  )
  async insertUser(
    @Body() dto: CreateProductDto,
    @Response() res,
    @Request() req,
    @UploadedFile() file: any
  ) {
    const { categoryId } = req.body;
    const category_id = categoryId[0];
    await this.productService.createUser(dto, res, category_id, file);
    return res.redirect("/product/all"); 
  }

  @Public()
  @Post("/categoryDropdown")
  async catgoryDropdwon(@Response() res, @Request() req) {
    const { categoryId } = req.body;
    const category_id = categoryId[0];
  }

  @Public()
  @Get("/all")
  // @Roles(Role.ADMIN)
  @Render("product")
  async adminPanel() {
    try {
      const products = await this.productService.getAllprodcut();
      const categories = await this.categoriesService.getAllCategories();
      return { products: products, categories: categories };
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Delete("/delete/:id")
  async deleteproduct_category(@Param("id") id: number) {
    await this.productService.deleteproductById(+id);
    return { message: "product& category deleted successfully" };
  }

  @Public()
  @Patch("/edit/:id")
  async editUser(
    @Param("id") id: number,
    @Body("product_name") product_name: string,
    @Body("product_description") product_description: string,
    @Body("product_price") product_price: string,
    @Body("categoryId") categoryId: number,
    @Request()
    req
  ) {
    const updatedUser = await this.productService.editUserById(
      Number(id),
      product_name,
      product_description,
      product_price,
      categoryId,
      req
    );
    return { updatedUser: updatedUser };
  }

  @Public()
  @Post("search-product")
  async Search(@Req() req, @Res() res) {
    const data = await this.productService.search(req.query, res);
    res.send(data);
  }
}
