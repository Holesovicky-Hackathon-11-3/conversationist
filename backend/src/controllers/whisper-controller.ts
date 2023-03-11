import { compose } from 'compose-middleware'
import multer from 'multer'
import { Request, Response } from "express"
import * as whisper from "../services/whisper_api"


const upload = multer({ dest: 'uploads/' });

export const getWhisperTranscription = compose([
    upload.single('test'),
    async (req: Request, res: Response) => {
        const path = req.file.path
        if (req.file.mimetype !== 'audio/webm') {
            res.status(400)
            res.send("Incorrect sound file format - WEBM expected")
            return
        }
        const transcription = await whisper.GetWhisperTranscription(path)
        console.log("Received Whisper transcription: ", transcription)
        res.send({transcription})
    }
])