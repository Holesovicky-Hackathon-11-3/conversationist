"use strict";
// Write a ChatGPT API Wrapper
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const openai_1 = require("openai");
const secret_config_1 = __importDefault(require("./secret-config"));
async function foo() {
    const configuration = new openai_1.Configuration({
        organization: "org-10yq50qLRI3ntaeTQqPsIH7pE",
        apiKey: secret_config_1.default.OPENAPI_KEY,
    });
    const openai = new openai_1.OpenAIApi(configuration);
    const response = await openai.listEngines();
    console.log(response);
}
exports.default = { foo };
//# sourceMappingURL=gpt_api.js.map