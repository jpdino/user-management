import { Response } from 'express';

export function Success(message: string, data: any, res: Response) {
    res.status(200).json({
        status: 'SUCCESS',
        message: message,
        data: data
    });
}

export function NotFound(message: string, data: any, res: Response) {
    res.status(200).json({
        status: 'NOT FOUND',
        message: message,
        data: data
    });
}

export function RequestFail(message: string, data: any, res: Response) {
    res.status(200).json({
        status: 'ERROR',
        message: message,
        data: data
    });
}

export function BadRequest(res: Response) {
    res.status(400).json({
        status: 'ERROR',
        message: 'Please check request payload/ headers',
        data: null
    });
}

export function Error(err: any, res: Response) {
    res.status(500).json({
        status: 'SERVER ERROR',
        message: 'Internal server error.',
        data: err
    });
}
