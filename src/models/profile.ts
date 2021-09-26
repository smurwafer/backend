import mongoose from 'mongoose';

interface ProfileAttr {
    user: string;
    themeUrl: string;
    bio: string;
    dob: string;
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
    build(attrs: ProfileAttr): ProfileDoc;
}

interface ProfileDoc extends mongoose.Document {
    user: string;
    themeUrl: string;
    bio: string;
    dob: string;
}

const profileSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    themeUrl: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    dob: {
        type: Date,
        required: false,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});

profileSchema.statics.build = (attrs: ProfileAttr) => {
    return new Profile(attrs);
}

const Profile = mongoose.model<ProfileDoc, ProfileModel>('Profile', profileSchema);

export { Profile };