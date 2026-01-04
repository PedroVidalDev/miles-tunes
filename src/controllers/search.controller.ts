import { injectable } from "tsyringe";
import { Request, Response } from "express";

import { SearchService } from "../services/search.service";

@injectable()
export class SearchController {
    constructor(private searchService: SearchService) {}

    public renderHome(req: Request, res: Response): void {
        res.render("search/index", 
            { 
                title: "MilesTune | Converta seus videos em audios",
            }
        );
    }

    public async renderResult(req: Request, res: Response): Promise<void> {
        const ytUrl = req.query.yturl as string;
        if (!ytUrl) {
            res.status(400).json({ error: "Missing 'yturl' query parameter" });
            return;
        }

        const result = await this.searchService.search(ytUrl);

        res.render("search/result", { title: "MilesTune | Converta seus videos em audios", data: result });
    }

    public async search(req: Request, res: Response): Promise<void> {
        const ytUrl = req.query.yturl as string;
        if (!ytUrl) {
            res.status(400).json({ error: "Missing 'yturl' query parameter" });
            return;
        }

        const result = await this.searchService.search(ytUrl);

        res.json(result);
    }
}