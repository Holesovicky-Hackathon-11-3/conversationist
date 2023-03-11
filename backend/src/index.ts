import express, { Application, Request, Response } from "express"
import axios from 'axios'
import * as gpt from "./gpt_api"
import cors from 'cors'
import multer from 'multer'
import * as fs from 'fs'

import keys from "./secret-config"

const app: Application = express()
const port: number = 3001

// TODO: remove this
app.use(cors())

const upload = multer({ dest: 'uploads/' });
// app.use(upload.array());

app.get("/api/gpt", async (req: Request, res: Response) => {
    let result: gpt.GPTResponseMessage
    try {
        result = await gpt.GetGPTResponse(
            [new gpt.Message(gpt.Role.System, "Say this is a test!")]
        );
    } catch (error) {
        res.status(400)
        res.send("Error: " + error.message)

        console.log(error.message)
        return
    }
    res.send(result)
    console.log(result)
})

app.post("/api/whisper", upload.single('test'), async (req: Request, res: Response) => {
    const path = req.file.path
    // TODO: check req.file.mimetype
    let formData = new FormData()
    const content = await new Promise<Buffer>((resolve, reject) => fs.readFile(path, (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data)
        }
    }));
    console.log('file type', req.file.mimetype)
    formData.append('file', new Blob([content], { type: req.file.mimetype }), 'sound.webm')
    formData.append('model', 'whisper-1')
    const whisperRes = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + keys.OPENAPI_KEY,
        }
    })
    console.log(whisperRes.data)
})


app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})
