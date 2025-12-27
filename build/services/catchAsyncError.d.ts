import { Request, Response, NextFunction } from "express";
declare const errorHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
export default errorHandler;
//# sourceMappingURL=catchAsyncError.d.ts.map