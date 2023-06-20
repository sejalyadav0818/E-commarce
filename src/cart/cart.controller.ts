import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Render, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Public } from 'src/common/decorators';
import { Roles } from 'src/auth/entities/roles.decorator';
import { Role } from 'src/auth/entities/role.enum';
import { Permissions } from 'src/auth/entities/permissions.decorator';
import { Permission } from 'src/auth/entities/permissions.enum';
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}


  @Public()
  // @Roles(Role.USER)
  @Post('cart')
  async addToCart(@Body('productId') productId: number,@Body('quantity') quantity: number,@Body('total') total: number,@Req() req, @Res() res){
    return await this.cartService.addItemtoCart(productId,quantity,total,req,res);
  }

  @Public()
  @Post()
  create(@Body() createCartDto: CreateCartDto,@Req() req, @Res() res) {
    return this.cartService.create(createCartDto, req, res);
  }

  @Public()
  // @Permissions(Permission.VIEW_CART)
  @Get('/cart_page')
  @Render('cart')
  getCartPage(@Req() req, @Res() res){
    return this.cartService.getAllCart(req, res );
  }

  @Public()
  // @Roles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: number,@Req() req, @Res() res) {
    console.log("here ");
    
    return this.cartService.remove(id,req,res);
  }
}
