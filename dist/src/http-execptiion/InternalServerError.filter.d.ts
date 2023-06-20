import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
export declare class InternalServerErrorExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): void;
}
