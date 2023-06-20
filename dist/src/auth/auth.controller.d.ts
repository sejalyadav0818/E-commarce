import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(): {
        msg: string;
    };
    signupLocal(dto: AuthDto, req: any, res: any): Promise<void>;
    getuserLogin(): {
        msg: string;
    };
    signinLocal(dto: AuthDto, req: any, res: any): Promise<string>;
    password(): {
        msg: string;
    };
    resetPassword(email: string, token: string, newPassword: string, req: any, res: any): Promise<void>;
    forget(): {
        msg: string;
    };
    forgotPassword(email: string, req: any, res: any): Promise<void>;
    panell(): {
        msg: string;
    };
    verification(): {
        msg: string;
    };
    logout(userId: number, req: any, res: any): Promise<boolean>;
}
