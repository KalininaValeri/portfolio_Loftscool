'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PicSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Укажите описание картинок']
    },
    picture: {
        type: String
    }
});

mongoose.model('pic', PicSchema);