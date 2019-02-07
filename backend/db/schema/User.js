const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        required: true,
        default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
