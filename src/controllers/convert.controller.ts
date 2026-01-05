import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { ConvertService } from "../services/convert.service";
import fs from "fs";
import { ResponseDTO } from "../dtos/ResponseDTO";

@injectable()
export class ConvertController {

    constructor(private convertService: ConvertService) {}

    public async convert(req: Request, res: Response): Promise<void> {
        const ytUrl = req.query.yturl as string;

        if (!ytUrl) {
            res.status(400).json(new ResponseDTO(400, "Missing 'url' query parameter."));
            return;
        }

        const result = await this.convertService.convert(ytUrl);

        if (!result.success || !result.path) {
            res.status(500).json(new ResponseDTO(500, result.message));
            return;
        }

        res.download(result.path, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                if (!res.headersSent) {
                    res.status(500).send("Could not download file.");
                }
            }

            try {
                if (fs.existsSync(result.path!)) {
                    fs.unlinkSync(result.path!);
                }
            } catch (cleanupErr) {
                console.error("Error deleting temp file:", cleanupErr);
            }
        });     
    }
}