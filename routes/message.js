import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { fetchAllMsg, sendMessage } from '../controllers/messageController.js'

const router = express.Router()

router.route('/').post(verifyToken, sendMessage)
router.route('/:chatId').get(verifyToken, fetchAllMsg)

export default router