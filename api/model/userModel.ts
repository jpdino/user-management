import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Users = new Schema({
    name: { type: String },
    email: { type: String },
    birthdate: { type: String },
    age: { type: Number },
    archived: { type: Boolean, default: false }
}, {strict: false});

export default mongoose.model('Users', Users);
