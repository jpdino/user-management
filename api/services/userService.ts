import { IUser } from '../interfaces/userInterface';
import Users from '../model/userModel';

export default class UserService {
    
    public createUser(user: IUser, callback: any) {
        const _user = new Users(user);
        _user.save(callback);
    }

    public listUsers(callback: any) {
        Users.find({"archived":false}, callback);
    }

    public getUserById(query: any, callback: any) {
        Users.findOne(query, callback);
    }

    public updateUser(user_params: IUser, callback: any) {
        const query = { _id: user_params._id };
        Users.findOneAndUpdate(query, user_params, callback);
    }
    
    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        Users.deleteOne(query, callback);
    }

}
