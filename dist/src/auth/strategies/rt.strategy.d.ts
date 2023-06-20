import { Request } from 'express';
import { JwtPayload, JwtPayloadWithRt } from '../types';
declare const RtStrategy_base: new (...args: any[]) => any;
export declare class RtStrategy extends RtStrategy_base {
    constructor();
    validate(req: Request, payload: JwtPayload): JwtPayloadWithRt;
}
export {};
