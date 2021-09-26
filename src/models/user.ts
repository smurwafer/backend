import mongoose from 'mongoose';

interface UserAttr {
    userName: string;
    name: string;
    email: string;
    imageUrl: string;
    age: string;
    password: string;
    online: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttr): UserDoc;
}

interface UserDoc extends mongoose.Document {
    userName: string;
    name: string;
    email: string;
    imageUrl: string;
    age: string;
    password: string;
    online: boolean;
}

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
        required: false,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true,
});

userSchema.statics.build = (attrs: UserAttr) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserDoc };