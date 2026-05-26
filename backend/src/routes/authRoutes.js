import express from 'express';

const router = express.Router();

router.post('/login', async (req, res) => {
  return res.json({
    success: true,
    token: "mock-token",
    user: {
      id: 1,
      name: "Yash",
      email: req.body.email,
      role: "admin"
    }
  });
});

router.post('/register', async (req, res) => {
  return res.json({
    success: true,
    message: "User registered successfully",
    user: {
      id: 1,
      name: req.body.name,
      email: req.body.email,
      role: "member"
    }
  });
});

export default router;
