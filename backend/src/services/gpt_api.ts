import keys from "../secret-config"
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

type TextCorrection = {
    contains_mistakes: boolean
    suggestions: string[] | null
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
        const response_message = response.data.choices[0].message
        // const parsed = JSON.parse(response.data)
        return response_message as GPTResponseMessage
    } catch (error) {
        if (error.response) {
            throw new Error("OpenAI API Error (code " + error.response.status + "): " + JSON.stringify(error.response.data))
        } else {
            throw error
        }
    }
}

async function GetGPTEdit(message_content: string): Promise<TextCorrection> {
    message_content = message_content.trim().replace("\n", " ").replace("\"", "\'")
    const prompt =
        "You are a native English speaker teacher with excellent language skills.\n" +
        "Are there any spelling or grammatical mistakes in the following sentence?\n\n" +
        "\"" + message_content + "\"\n\n" +
        "Answer with YES or NO and then list all the mistakes."
    let response_content = (await GetGPTResponse([
        new Message(Role.User, prompt)
    ])).content

    response_content = response_content.trim()
    console.log(response_content)
    let negative_response = {
        contains_mistakes: false,
        suggestions: null
    } as TextCorrection
    if (!response_content.startsWith("YES") && !response_content.startsWith("Yes")) {
        return negative_response;
    }

    let suggestions: string[] = []
    for (let line of response_content.split("\n")) {
        line = line.trim()
        if (line.length == 0) {
            continue
        }
        const firstChar = line[0]
        if (firstChar == "-" || (firstChar >= "0" && firstChar <= "9")) {
            suggestions.push(line.substring(2).trim())
        }
    }

    if (suggestions.length == 0) {
        return negative_response
    }

    return {
        contains_mistakes: true,
        suggestions: suggestions
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
export { GetGPTResponse, GetGPTEdit, SetupLogs, Message, TextCorrection, Role, GPTResponseMessage }