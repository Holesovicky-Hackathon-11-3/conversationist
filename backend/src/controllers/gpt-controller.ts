import { Request, Response } from "express"
import { compose } from 'compose-middleware'
import * as gpt from "../services/gpt_api"
import { validationMiddleware } from '../middleware/validation/validation-middleware'
import * as schemas from '../middleware/validation/schemas'


export const getNextMessage = compose([
    validationMiddleware(schemas.gptGetMessage),
    async (req: Request, res: Response) => {
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
    },
])