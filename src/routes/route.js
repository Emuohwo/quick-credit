import express from 'express';
import User from '../controllers/UserController';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome to Quick Credit');
});

router.post('/api/v1/users', User.signUpUser);
router.get('/api/v1/users', User.getAllUsers);
router.get('/api/v1/users/:id', User.getOneUser);
router.put('/api/v1/users/:id', User.updateUser);
router.patch('/api/v1/users/:id/status', User.updateUser);
router.delete('/api/v1/users/:id', User.deleteUser);

export default router;
