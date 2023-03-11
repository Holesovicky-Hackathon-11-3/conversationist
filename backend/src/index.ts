import express, { Application, Request, Response } from "express"
import gpt from "./gpt_api"

// gpt.SetupLogs()
const app: Application = express()
const port: number = 3001
app.get("/", async (req: Request, res: Response) => {
    let result = await gpt.GetGPTResponse();
    res.send(result)
    console.log(result)
})
app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})
