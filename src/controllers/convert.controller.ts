import { injectable } from "tsyringe";
import { Request, Response } from "express";

@injectable()
export class ConvertController {
    public convert(req: Request, res: Response): void {
        res.json({ message: "Search convert endpoint" });
    }
}