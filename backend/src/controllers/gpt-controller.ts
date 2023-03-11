import { Request, Response } from "express"
import * as gpt from "../services/gpt_api"


export async function getNextMessage(req: Request, res: Response) {
    const messages = req.body.messages
    let result: gpt.GPTResponseMessage
    try {
        result = await gpt.GetGPTResponse(messages);
    } catch (error) {
        res.status(400)
        res.send("Error: " + error.message)

        console.log(error.message)
        return
    }
    res.send(result)
    console.log(result)
}