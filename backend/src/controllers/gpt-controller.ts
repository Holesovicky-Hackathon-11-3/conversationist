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

        console.log(error)
        return
    }
    res.send(result)
    console.log(result)
}

export async function getLanguageCheck(req: Request, res: Response) {
    const message = req.body.message
    if (!message) {
        res.status(400)
        res.send("Error: no message provided")
        return
    }

    let result: gpt.TextCorrection
    try {
        result = await gpt.GetGPTEdit(message);
    } catch (error) {
        res.status(400)
        res.send("Error: " + error.message)

        console.log(error)
        return
    }
    res.send(result)
    console.log(result)
}