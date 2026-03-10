import http from 'http';
import { createApp } from './app';
import { config } from './core/config';
import { handleUpgrade } from './utils/wsServer';
import { getServerDomain } from './utils/ngrokUtils';

const bootstrap = async () => {
    const app    = createApp();
    const server = http.createServer(app);

    const domain = await getServerDomain();
    process.env.SERVER_DOMAIN = domain;

    server.on('upgrade', handleUpgrade);

    process.on('SIGTERM', () => server.close(() => process.exit(0)));
    process.on('SIGINT',  () => server.close(() => process.exit(0)));

    server.listen(config.port, '0.0.0.0', () => {
        console.log(`[${config.nodeEnv}] Server running on port ${config.port}`);
        console.log(`[domain] ${domain || 'unknown'}`);
    });
};

bootstrap();