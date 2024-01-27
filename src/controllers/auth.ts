import { type Request, type Response } from 'express'
import User from '../models/user'

export function register (_req: Request, res: Response): void {
  console.log(User)
  res.status(200).send({ msg: 'OK' })
}
