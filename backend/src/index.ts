import express, { Application, Request, Response } from "express"
import gpt from "./gpt_api"

const app: Application = express()
const port: number = 3001
app.get("/", (req: Request, res: Response) => {
 res.send("Hello toto")
 gpt.foo();
})
app.listen(port, function () {
 console.log(`App is listening on port ${port} !`)
})
