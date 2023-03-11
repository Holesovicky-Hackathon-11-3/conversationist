import keys from "./secret-config"
import axios from "axios";

// async function foo() {
//     const configuration = new Configuration({
//         organization: "org-10yq50qLRI3ntaeTQqPsIH7pE",
//         apiKey: config.OPENAPI_KEY,
//     });
//     const openai = new OpenAIApi(configuration);
//     try {
//         const response = await openai.listModels();
//         console.log(response);
//     } catch (error) {
//         if (error.response) {
//             console.log(error.response.status);
//             console.log(error.response.data);
//         } else {
//             console.log(error.message);
//         }
//     }
// }

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

async function GetGPTResponse() {
    let config = {
        url: "https://api.openai.com/v1/chat/completions",
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + keys.OPENAPI_KEY,
        },
        data: {
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": "Say this is a test!" }],
            "temperature": 0.7
        },
    }
    // create HTTP request using axios
    try {
        const response = await axios(config)
        return response
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

export default { GetGPTResponse, SetupLogs }
