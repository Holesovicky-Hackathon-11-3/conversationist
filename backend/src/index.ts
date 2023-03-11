import express, { Application, Request, Response } from "express"
import axios from 'axios'
import * as gpt from "./gpt_api"
import * as whisper from './whisper_api'
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

app.post("/api/gpt", async (req: Request, res: Response) => {
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
    if (req.file.mimetype !== 'audio/webm') {
        res.status(400)
        res.send("Incorrect sound file format - WEBM expected")
        return
    }
    const transcription = await whisper.GetWhisperTranscription(path)
    console.log("Received Whisper transcription: ", transcription)
    res.send({transcription})
})


app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})
