import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/verify', async (req, res) => {
    try {
        // Check header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Extract token after "Bearer "
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Invalid token format" });
        }

        // Verify token
        const payload = jwt.verify(token, "codeforindia");

        return res.json({ userDetails: payload });
    } catch (error) {
        console.error("JWT Verify Error:", error.message);
        return res.status(401).json({ error: "Session Expired, please login" });
    }
});

export default router;
