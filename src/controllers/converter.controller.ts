import { injectable } from "tsyringe";
import { Request, Response } from "express";

import { ConverterService } from "../services/converter.service";

@injectable()
export class ConverterController {
    constructor(private converterService: ConverterService) {}

    public home(req: Request, res: Response): void {
        res.render("converter/index", { title: "MilesTune | Converta seus videos em audios" });
    }

    public convert(req: Request, res: Response): void {
        const result = this.converterService.convert(req.body);

        res.json(result);
    }
}