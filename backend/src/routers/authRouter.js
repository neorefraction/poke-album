import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.get('/login', async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const token = await authController.login(identifier, password)
        res.status(200).json({token})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const token = await authController.signup(username, email, password)
        res.status(200).json({token})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
});

export default router;