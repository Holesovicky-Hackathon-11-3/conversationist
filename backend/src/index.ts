import express, { Application, Request, Response } from "express"
import cors from 'cors'
import * as controllers from './controllers'

const app: Application = express()
const port: number = 3001

// TODO: remove this
app.use(cors())

app.use(express.json());

app.post("/api/gpt", controllers.getNextMessage)

app.post("/api/whisper", controllers.getWhisperTranscription)


app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})
