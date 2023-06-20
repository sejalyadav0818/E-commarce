import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Render, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public } from "../common/decorators/public.decorator";

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Public()
  @Post()
  create(@Req() req, @Res() res) {
    return this.ordersService.create(req,res)
  }
  
  @Public()
  @Get('/orderpage')
  // @Render('order_page')
  findAll(@Req() req, @Res() res) {
    return this.ordersService.findAll(req,res);
    
  }

  @Public()
  @Get('/orderpage')
  // @Render('dashboard')
  findAllOrders(@Req() req, @Res() res) {
    return this.ordersService.findAll(req,res);
    
  }

  @Public()
  @Get('/orderbyuser')

  @Render('order_page')
  findOrdersByUser(@Req() req, @Res() res) {
    return this.ordersService.findOrderByUser(req,res);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
