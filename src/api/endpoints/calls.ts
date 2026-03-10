import { Router, Request, Response } from 'express';
import { telerClient } from '../../utils/telerClient';
import { config }          from '../../core/config';

export const callRouter = Router();

callRouter.post('/initiate-call', async (req: Request, res: Response) => {
    try {
        const { fromNumber, toNumber, record } = req.body;

        const flowUrl           = `https://${config.serverDomain}/api/v1/calls/flow`;
        const statusCallbackUrl = `https://${config.serverDomain}/api/v1/webhooks/receiver`;

        const call = await telerClient.createCall(
            fromNumber,
            toNumber,
            flowUrl,
            statusCallbackUrl,
            record ?? true
        );

        res.status(200).json({ message: 'Call initiated', call });
    } catch (error) {
        res.status(500).json({ error: 'Failed to initiate call' });
    }
});

callRouter.post('/flow', (_req: Request, res: Response) => {
    res.json({
        action:      'stream',
        ws_url:      `wss://${config.serverDomain}/media-stream`,
        sample_rate: config.elevenLabsSampleRate,
        chunk_size:  500,
        record:      true,
    });
});
