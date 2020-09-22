import { Request, Response } from 'express';
import { Success, NotFound, RequestFail, BadRequest, Error    } from '../services/responseService';
import { IUser } from '../interfaces/userInterface';
import UserService from '../services/userService';
import Utilities from '../utils/utilities';

export class UserController {

    private userService: UserService = new UserService();
    private utilities: Utilities = new Utilities();

    public createUser(req: Request, res: Response) {
        if (req.body.name && req.body.email && req.body.birthdate && req.body.age) {
            const user: IUser = {
                name: req.body.name,
                email: req.body.email,
                birthdate: this.utilities.convertDate(req.body.birthdate),
                age: req.body.age
            };
            this.userService.createUser(user, (err: any, userData: IUser) => {
                if (err) {
                    Error(err, res);
                } else {
                    Success('create user successfull', userData, res);
                }
            });
        }
        else {
            BadRequest(res); // if payload information is incomplete
        }
    }

    public listUsers(req: Request, res: Response) {
        this.userService.listUsers( (err: any, users: any) => {
            if (err) {
              Error(err, res);
            } else {
                Success('Found ' + users.length + ' users', users, res);
            }
        });
    }

    public getUser(req: Request, res: Response) {
        if (req.params.id) {
            const userFilter = { _id: req.params.id };

            this.userService.getUserById(userFilter, (err: any, userData: IUser) => {
                if (err || !userData) {
                    Error(err, res);
                } else {
                    if(!userData) {
                        NotFound("User doesn't exist in the database.", userData, res);
                    } else {
                        Success('User found', userData, res);
                    }
                }
            });
        } else {
            BadRequest(res);
        }
    }

    public updateUser(req: Request, res: Response) {
        if (req.params.id && (req.body.name || req.body.email || req.body.birthdate || req.body.age)) {

            const userFilter = { _id: req.params.id };

            this.userService.getUserById(userFilter, (err: any, userData: IUser) => {
                if (err) {
                    Error(err, res);
                } else if (userData) {
                    const user: IUser = {
                        _id: req.params.id,
                        name: req.body.name || userData.name,
                        email: req.body.email || userData.email,
                        birthdate: req.body.birthdate || userData.birthdate,
                        age: req.body.age || userData.age,
                        archived: req.body.archived || userData.archived
                    };
                    this.userService.updateUser(user, (err: any) => {
                        if (err) {
                            Error(err, res);
                        } else {
                            Success('update user successfull', null, res);
                        }
                    });
                } else {
                    RequestFail('invalid user', null, res);
                }
            });
        } else {
            BadRequest(res);
        }
    }

    public deleteUser(req: Request, res: Response) {
        if (req.params.id) {
            this.userService.deleteUser(req.params.id, (err: any, deleted) => {
                if (err) {
                    Error(err, res);
                } else if (deleted.deletedCount !== 0) {
                    Success('User has been deleted', null, res);
                } else {
                    NotFound("User doesn't exist in the database", null, res);
                }
            });
        } else {
            BadRequest(res);
        }
    }
}
