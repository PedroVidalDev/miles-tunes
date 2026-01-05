import { injectable } from "tsyringe";
import { Request, Response } from "express";
import fs from "fs";
import { ResponseDTO } from "../dtos/ResponseDTO";

@injectable()
export class IndexController {

    public renderTerms(req: Request, res: Response): void {
        res.render("terms/index", 
            { 
                title: "MilesTune | Termos de Uso",
            }
        );
    }
}