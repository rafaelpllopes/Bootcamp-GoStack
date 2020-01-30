import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

// Route to Session
routes.post('/sessions', SessionController.store);

// Routes to users
routes
  .route('/users')
  .post(UserController.store)
  .get(UserController.index)
  .put(authMiddleware, UserController.update);

export default routes;
