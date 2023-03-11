// Write a ChatGPT API Wrapper

// const API_URL = 'https://api.chatgpt.com/v1/';

// export default class ChatGPT {
//     private apiKey: string;
    
//     constructor(apiKey: string) {
//         this.apiKey = apiKey;
//     }
    
//     async sendMessage(message: string): Promise<string> {
//         const { data } = await fetch(API_URL, {
//         message,
//         apiKey: this.apiKey,
//         });
    
//         return data.message;
//     }
//     }

// // Path: app/src/index.ts

// import ChatGPT from './gpt_api'; 

import { Configuration, OpenAIApi } from "openai";
import config from "./secret-config"

async function foo() {
    const configuration = new Configuration({
        organization: "org-10yq50qLRI3ntaeTQqPsIH7pE",
        apiKey: config.OPENAPI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.listModels();
    console.log(response);
}

export default {foo}
