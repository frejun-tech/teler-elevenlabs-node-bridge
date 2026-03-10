import { TelerClient as Teler } from "/Users/RupakBoral/code/teler-sdk-node/dist/client";
import { config } from '../core/config';

export class TelerClient {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async createCall(
        fromNumber: string,
        toNumber: string,
        flowUrl: string,
        statusCallbackUrl: string,
        record: boolean = true
    ) {
        const client = new Teler(this.apiKey);

        try {
            const call = await client.calls.create({
                from_number: fromNumber,
                to_number: toNumber,
                flow_url: flowUrl,
                status_callback_url: statusCallbackUrl,
                record,
            });

            console.log(`Call created successfully: ${JSON.stringify(call)}`);
            return call;
        } catch (error) {
            console.error(`Failed to create call: ${error}`);
            throw error;
        }
    }
}

export const telerClient = new TelerClient(config.telerKey);