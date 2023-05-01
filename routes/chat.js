import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { accessChat, addToGroup, createGroupChat, fetchChat, removeFromGroup, renameGroup } from '../controllers/chatController.js'

const router = express.Router()

router.route('/').post(verifyToken, accessChat)
router.get('/', verifyToken, fetchChat)
router.route('/group').post(verifyToken, createGroupChat)
router.route('/rename').put(verifyToken, renameGroup)
router.route('/addToGroup').put(verifyToken, addToGroup)
router.route('/removeFromGroup').put(verifyToken, removeFromGroup)

export default router;