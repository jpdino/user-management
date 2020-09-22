import * as express from "express";
import * as mongoose from 'mongoose';
//import { MongooseNode } from 'mongoose';
import * as bodyParser from "body-parser";
import env from "./environment";

import { UserRoutes } from "./routes/userRoutes";
import {IUser} from "./interfaces/userInterface";
import {Error, Success} from "./services/responseService";

import UserService from './services/userService';
import Utilities from './utils/utilities';

class App {
   public app: express.Application;
   public mongoUrl: string = 'mongodb://' + env.getHost() + env.getDBName();

   private userRoutes: UserRoutes = new UserRoutes();

   private userService: UserService = new UserService();
   private utilities: Utilities = new Utilities();

   constructor() {
      this.app = express();
      this.startConfig();
      this.setupMongo();
      this.userRoutes.route(this.app);
   }

   private startConfig(): void {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private setupMongo(): void {
      const mongoOpts = {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      };

      const Admin = mongoose.mongo.Admin;
      const uService = this.userService;
      const utils = this.utilities;

      // var nativeConnection = mongoose.createConnection(this.mongoUrl);
      // nativeConnection.on('open', function() {
      //    // connection established
      //    new Admin(nativeConnection.db).listDatabases(function(err, results) {
      //       if(results){
      //          let dbExist = false;
      //          const databases = results.databases;
      //          for(let x=0;x<databases.length;x++){
      //             if(databases[x].name === env.getDBName()){
      //                dbExist = true;
      //             }
      //          }
      //
      //          if(!dbExist) {
      //             // insert default/primary data
      //             const user: IUser = {
      //                name: 'Administrator',
      //                email: 'administrator@example.com',
      //                birthdate: utils.convertDate("12/22/1984"),
      //                age: 36
      //             };
      //
      //             uService.createUser(user, (err: any, userData: IUser) => {
      //                if (err) {
      //                   console.log('Check database connection.');
      //                } else {
      //                   console.log('Primary user created!');
      //                }
      //             });
      //          }
      //       }
      //    });
      // });

      mongoose.connect(this.mongoUrl, mongoOpts)
          .then((MongooseNode) => {
             const nativeConnection = MongooseNode.connections[0];
             let dbname = '';
             new Admin(nativeConnection.db).listDatabases(function(err, results) {
                if(results){
                   let dbExist = false;
                   const databases = results.databases;
                   console.log('databases',databases);
                   for(let x=0;x<databases.length;x++){
                      if(databases[x].name === env.getDBName()){
                         dbExist = true;
                         dbname = databases[x].name;
                      }
                   }

                   console.log('dbExist', dbname, env.getDBName(), dbExist);

                   if(!dbExist) {
                      // insert default/primary data
                      const user: IUser = {
                         name: 'Administrator',
                         email: 'administrator@example.com',
                         birthdate: utils.convertDate("12/22/1984"),
                         age: 36
                      };

                      uService.createUser(user, (err: any, userData: IUser) => {
                         if (err) {
                            console.log('Check database connection.');
                         } else {
                            console.log('Primary user created!');
                         }
                      });
                   }
                }
             });
          });


   }

}
export default new App().app;
