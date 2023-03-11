import keys from "./secret-config"
import axios from "axios";

class Message {
    role: Role;
    content: string;

    constructor(role: Role, content: string) {
        this.role = role;
        this.content = content;
    }
}

enum Role {
    User = "user",
    System = "system",
    Assistant = "assistant"
}

async function GetGPTResponse(messages: Message[]) {
    let config = {
        url: "https://api.openai.com/v1/chat/completions",
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + keys.OPENAPI_KEY,
        },
        data: {
            model: "gpt-3.5-turbo",
            // messages: [{ "role": "user", "content": "Say this is a test!" }],
            messages,
            temperature: 0.7
        },
    }
    // create HTTP request using axios
    try {
        const response = await axios(config)
        return response.data
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

function SetupLogs() {
    axios.interceptors.request.use(request => {
        console.log('Starting Request', JSON.stringify(request, null, 2))
        return request
    })

    axios.interceptors.response.use(response => {
        console.log('Response:', JSON.stringify(response, null, 2))
        return response
    })
}

export default { GetGPTResponse, SetupLogs, Message, Role }
