export class ResponseDTO {
    status: number;
    message: string;
    data?: any;

    constructor(status: number, message: string, data?: any) {
        this.status = status;
        this.message = message;
        if (data) {
            this.data = data;
        }
    }
}