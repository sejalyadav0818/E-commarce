import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(productId: number, quantity: number, total: number, req: any, res: any): Promise<void>;
    create(createCartDto: CreateCartDto, req: any, res: any): import(".prisma/client").Prisma.Prisma__CartClient<import(".prisma/client").Cart, never>;
    getCartPage(req: any, res: any): Promise<{
        carts: (import(".prisma/client").Cart & {
            product: import(".prisma/client").Product;
            user: import(".prisma/client").User;
        })[];
    }>;
    remove(id: number, req: any, res: any): Promise<void>;
}
