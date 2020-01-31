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
  .put(authMiddleware, UserController.update)
  .get(authMiddleware, UserController.index);

routes.route('/users/:id').delete(authMiddleware, UserController.delete);

export default routes;
