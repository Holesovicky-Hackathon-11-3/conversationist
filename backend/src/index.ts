import express, { Application, Request, Response } from "express"
import * as gpt from "./gpt_api"

// gpt.SetupLogs()
const app: Application = express()
const port: number = 3001

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

app.get("/api/whisper", async (req: Request, res: Response) => {
    try {
    } catch (error) {
        res.status(400)
        res.send("Error: " + error.message)

        console.log(error.message)
        return
    }
    res.send(result)
    console.log(result)
})


app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})
