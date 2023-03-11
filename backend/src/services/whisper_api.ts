import keys from "../secret-config"
import axios from "axios";
// import {fileFromPath} from 'formdata-node/file-from-path'
// import {fs} from 'formdata-node/fs'; 

import * as fs from 'fs'



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

export async function GetWhisperTranscription(filePath: string) {
    let formData = new FormData()
    const content = await new Promise<Buffer>((resolve, reject) => fs.readFile(filePath, (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data)
        }
    }));
    formData.append('file', new Blob([content], { type: 'audio/webm' }), 'sound.webm')
    formData.append('model', 'whisper-1')
    formData.append('language', 'en')
    formData.append('prompt', 'Human nature is a concept that denotes the fundamental dispositions and characteristics—including ways of thinking, feeling, and acting—that humans are said to have naturally.')
    try {
        const whisperRes = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + keys.OPENAPI_KEY,
            }
        })
        const transcription =  whisperRes.data.text
        return transcription
    } catch (e) {
        throw new Error('Whisper error')
    }
}
