const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    name: {
        first_name: String,
        last_name: String,
    },

    login: String,
    hashed_password: String,
    last_logged_in: Date,
    created: Date,
    wine_association: [String]
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel ;