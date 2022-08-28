export class myError extends Error {
    status?: number;
    message: string;
    stack?: string;
}

export const createError = (status: number, message: string) => {
    const err: myError = new Error();
    err.status = status;
    err.message = message;
    return err;
};