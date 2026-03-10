import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { StreamConnector } from '/Users/RupakBoral/code/teler-sdk-node/dist/lib/stream';
import { StreamType }      from '/Users/RupakBoral/code/teler-sdk-node/dist/types';
import { callStreamHandler, remoteStreamHandler } from './streamHandlers';
import { config } from '../core/config';

export const wss = new WebSocketServer({ noServer: true });

const connector = new StreamConnector(
    config.elevenLabsWsUrl,
    StreamType.BIDIRECTIONAL,
    callStreamHandler,
    remoteStreamHandler()
);

wss.on('connection', async (callWs: WebSocket) => {
    console.log('Teler connected to WebSocket');
    await connector.bridgeStream(callWs as any);
});

export const handleUpgrade = (request: IncomingMessage, socket: Socket, head: Buffer) => {
    if (request.url === '/media-stream') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
};