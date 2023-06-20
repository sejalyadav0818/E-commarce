// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
// } from "@nestjs/common";
// import { Request, Response } from "express";

// @Catch(HttpException)
// export class HttpExecptiionFilter<T> implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//    const ctx = host.switchToHttp();
//    const response = ctx.getResponse<Response>();
//    const request = ctx.getRequest<Request>();
//    const status = exception.getStatus();

//    response.render('page_404');
//   }
// }
//InternalServerError.filter.ts
import {
    InternalServerErrorException,
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    HttpException
} from "@nestjs/common";
// catch all error
@Catch()
export  class InternalServerErrorExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
      
        let { message: errMsg, stack: errStack, name: errName } = exception;
        // let errRes = exception.getResponse();
        // let errCode = exception.getStatus();
        let ctx = host.switchToHttp();
        let req = ctx.getRequest();
        let res = ctx.getResponse();
       
        res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        // HttpException Error
        if (exception instanceof HttpException) {
            // set httpException res to res
            res.status(exception.getStatus()).json(exception.getResponse());
            return;
        }
        // other error to rewirte InternalServerErrorException response
        res.render("page_404.ejs", {
            exception,
            errMsg,
            errStack,
            errName,
            statusCode: res.statusCode,
          
            req
        });
    }
}
