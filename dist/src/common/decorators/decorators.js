"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrent = void 0;
const common_1 = require("@nestjs/common");
exports.GetCurrent = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookie;
});
//# sourceMappingURL=decorators.js.map