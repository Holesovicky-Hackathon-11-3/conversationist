import joi from 'joi'; 
import { Role } from '../../services/gpt_api'

export const gptGetMessage = joi.object().keys({
    messages: joi.array().items(joi.object().keys({
        role: joi.string().valid(...Object.values(Role)).required(),
        content: joi.string().required(),
    }))
})