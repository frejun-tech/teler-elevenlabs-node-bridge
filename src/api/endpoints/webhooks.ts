import { Router, Request, Response } from 'express';

export const webhookRouter = Router();

// webhook messages
webhookRouter.post('/receiver', (req: Request, res: Response) => {
    const data = req.body;
    const headers = req.headers;
    console.log("--------Webhook Payload--------");
    console.log(JSON.stringify(data, null, 2));

    console.log("--------Webhook Headers--------");
    console.log(JSON.stringify(headers, null, 2));

    res.send({
        msg: "Received webhooks"
    })
});