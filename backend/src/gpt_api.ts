import keys from "./secret-config"
import axios from "axios";

class Message {
    role: Role
    content: string

    constructor(role: Role, content: string) {
        this.role = role
        this.content = content
    }
}

enum Role {
    User = "user",
    System = "system",
    Assistant = "assistant"
}

type GPTResponseMessage = {
    role: Role
    content: string
}


async function GetGPTResponse(messages: Message[]): Promise<GPTResponseMessage> {
    let config = {
        url: "https://api.openai.com/v1/chat/completions",
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + keys.OPENAPI_KEY,
        },
        data: {
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.7
        },
    }
    try {
        const response = await axios(config)
        const parsed = JSON.parse(response.data)
        return parsed.choices[0].message as GPTResponseMessage
    } catch (error) {
        if (error.response) {
            throw new Error("OpenAI API Error (code " + error.response.status + "): " + JSON.stringify(error.response.data))
        } else {
            throw error
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

// export default { GetGPTResponse, SetupLogs, Message, Role, GPTResponseMessage }
export { GetGPTResponse, SetupLogs, Message, Role, GPTResponseMessage }