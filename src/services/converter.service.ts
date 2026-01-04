import { injectable } from "tsyringe";

@injectable()
export class ConverterService {
    public convert(data: any): any {
        return data;
    }
}