const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        maxlength: [60, '{PATH} alanı {VALUE}, {MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [5, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden büyük olmalıdır.']
    },
    surname: {
        type: String,
        maxlength: [60, '{PATH} alanı {VALUE}, {MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [5, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden büyük olmalıdır.']
    },
    bio: {
        type: String,
        maxlength: [1000, '{PATH} alanı {VALUE}, {MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [60, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden büyük olmalıdır.']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('director', DirectorSchema);