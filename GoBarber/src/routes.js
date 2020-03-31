import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

// Route to Session
routes.post('/sessions', SessionController.store);

// Routes to users
routes
  .route('/users')
  .post(UserController.store)
  .put(authMiddleware, UserController.update)
  .get(authMiddleware, UserController.index);

routes.use(authMiddleware);

routes.get('/providers', ProviderController.index);

routes.route('/users/:id').delete(UserController.delete);

// Route to upload files
routes.post('/files', upload.single('file'), FileController.store);

// Route to Appointments
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

// Route to list events
routes.get('/notifications', NotificationController.index);

// Route to Shedule
routes.get('/schedule', ScheduleController.index);

export default routes;
