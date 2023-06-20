import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.originalUrl);
    const path = req.originalUrl;
     const { token } = req.cookies;

    const user = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );
    const uid = user.id;
     console.log(uid);
     console.log(token);
     
      
    if(path=='/Product/user_product' &&  uid==null)
    {
      res.redirect("/auth/signin");
    }
   
    console.log("Request...");
    next();
  }
}
    