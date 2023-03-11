// import keys from "./secret-config"
// import axios from "axios";
// import {fileFromPath} from 'formdata-node/file-from-path'
// import {fs} from 'formdata-node/fs'; 


// async function GetWhisperTranscription() {
//     const form = new FormData();
//     form.append("file", fs.createReadStream("test.wav"));
//     let config = {
//         url: "https://api.openai.com/v1/chat/completions",
//         method: "post",
//         headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: "Bearer " + keys.OPENAPI_KEY,
//         },
//         data: {
//             model: "gpt-3.5-turbo",
//             messages,
//             temperature: 0.7
//         },
//     }
//     try {
//         const response = await axios(config)
//         const parsed = JSON.parse(response.data)
//         return parsed.choices[0].message as GPTResponseMessage
//     } catch (error) {
//         if (error.response) {
//             throw new Error("OpenAI API Error (code " + error.response.status + "): " + JSON.stringify(error.response.data))
//         } else {
//             throw error
//         }
//     }
// }
