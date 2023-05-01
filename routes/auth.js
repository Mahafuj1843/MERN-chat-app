import express from 'express';
import { register, login, logout, updateProfile,changePassword, forgotPassword, resetPassword, profileDetails } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile/details',verifyToken, profileDetails);
router.put('/updateProfile', verifyToken, updateProfile);
router.put('/change/password', verifyToken, changePassword);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);

export default router