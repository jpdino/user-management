import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

export class UserRoutes {

    private userController: UserController = new UserController();

    public route(app: Application) {
        app.post('/api/createUser', (req: Request, res: Response) => {
            this.userController.createUser(req, res);
        });

        app.get('/api/listUsers', (req: Request, res: Response) => {
            this.userController.listUsers(req, res);
        });

        app.get('/api/getUser/:id', (req: Request, res: Response) => {
            this.userController.getUser(req, res);
        });

        app.put('/api/updateUser/:id', (req: Request, res: Response) => {
            this.userController.updateUser(req, res);
        });

        app.delete('/api/deleteUser/:id', (req: Request, res: Response) => {
            this.userController.deleteUser(req, res);
        });

        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Page not found! Please enter correct URL.' });
        });

    }
}
