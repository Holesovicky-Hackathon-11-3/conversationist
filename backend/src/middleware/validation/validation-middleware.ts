import Joi from 'joi'; 
import { Request, Response, NextFunction } from "express"

export const validationMiddleware = (schema: Joi.Schema) => { 
  return (req: Request, res: Response, next: NextFunction) => { 
  const { error } = schema.validate(req.body); 
  const valid = error == null; 
  
  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
 
    console.log("error", message); 
    res.status(422).json({ error: message }) } 
  } 
} 