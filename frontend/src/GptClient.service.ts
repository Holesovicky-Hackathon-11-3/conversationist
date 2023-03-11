import { Conversation, Message } from "./api-model";
import { server } from "./config";


export class GptClient {

    async getAssistantReply(conversation: Conversation): Promise<Message> {

        console.log('Sending request to server', conversation);
        const response = await fetch(`${server}/api/gpt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(conversation),
        });

        if (!response.ok) {
            throw new Error('Failed to get assistant reply');
        }

        return await response.json() as Message;
    }

}

