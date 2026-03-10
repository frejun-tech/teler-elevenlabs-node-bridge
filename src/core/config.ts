import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port:                   Number(process.env.PORT) || 8888,
    nodeEnv:                process.env.NODE_ENV || 'development',
    serverDomain:           process.env.SERVER_DOMAIN || '',
    telerKey:               process.env.TELER_API_KEY || '',
    elevenLabsWsUrl:        process.env.ELEVENLABS_WS_URL || '',
    elevenLabsSampleRate:   process.env.ELEVENLABS_SAMPLE_RATE || '16k',
} as const;