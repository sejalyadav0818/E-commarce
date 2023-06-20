import { IsNumber } from "class-validator";

export class CreateCartDto {

    userId: number;

    productId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    total: number;
}
