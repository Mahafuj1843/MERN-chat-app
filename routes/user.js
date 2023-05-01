import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { allUser } from '../controllers/userController.js'

const router = express.Router()

router.get('/', verifyToken, allUser)

export default router