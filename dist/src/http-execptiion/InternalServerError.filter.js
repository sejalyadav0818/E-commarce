"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let InternalServerErrorExceptionFilter = class InternalServerErrorExceptionFilter {
    catch(exception, host) {
        let { message: errMsg, stack: errStack, name: errName } = exception;
        let ctx = host.switchToHttp();
        let req = ctx.getRequest();
        let res = ctx.getResponse();
        res.statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof common_1.HttpException) {
            res.status(exception.getStatus()).json(exception.getResponse());
            return;
        }
        res.render("page_404.ejs", {
            exception,
            errMsg,
            errStack,
            errName,
            statusCode: res.statusCode,
            req
        });
    }
};
InternalServerErrorExceptionFilter = __decorate([
    (0, common_1.Catch)()
], InternalServerErrorExceptionFilter);
exports.InternalServerErrorExceptionFilter = InternalServerErrorExceptionFilter;
//# sourceMappingURL=InternalServerError.filter.js.map