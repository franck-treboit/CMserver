const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mediaSchema = new Schema ({
    title: String ,
    date_of_publication: Date,
    type: {
        type: String,
        enum: ["video", "text", "image", "audio", "music", "pdf"]},
    author_first_name: String,
    author_last_name: String,
    resource: String,
    preview: String,
    media_text: String,
    media_url: String,
    description: String,
    duration: Number,
    wine_association: String
})

const mediaModel = mongoose.model("Media", mediaSchema);
module.exports = mediaModel ;