import { injectable } from "tsyringe";
import { Request, Response } from "express";

import { SearchService } from "../services/search.service";

@injectable()
export class SearchController {
    constructor(private searchService: SearchService) {}
    public home(req: Request, res: Response): void {
        res.render("search/index", { title: "MilesTune | Converta seus videos em audios" });
    }

    public search(req: Request, res: Response): void {
        const result = this.searchService.convert(req.body);

        res.json({ message: "Search endpoint", data: result });
    }
}