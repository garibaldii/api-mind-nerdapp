export class HttpError extends Error {
    public statusCode: number;
    public info?: Object

    constructor(message: string, statusCode = 400, object?: Object) {
        super(message);
        this.statusCode = statusCode;
        this.name = "HttpError";
        this.info = object
    }
}
