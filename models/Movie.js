const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectID,
    title: {
        type: String,
        required: [true, '{PATH} alanı zorunludur.'],
        maxlength: [15, '{PATH} alanı {VALUE}, {MAXLENGTH} karakterden küçük olmalıdır.'],//2. parametre girersek bizim mesajı yoksa default hata mesajını döner
        minlength: [3, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden büyük olmalıdır.']
    },
    category: {
        type: String,
        maxlength: [30, '{PATH} alanı {VALUE}, {MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [1, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden büyük olmalıdır.']
    },
    country: {
        type: String,
        maxlength: [30, '{PATH} alanı {VALUE}, {MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength: [1, '{PATH} alanı {VALUE}, {MINLENGTH} karakterden büyük olmalıdır.']
    },
    year: {
        type: Number,
        maxlength: [2040, '{PATH} alanı {VALUE}, {MAXLENGTH} yılından küçük olmalıdır.'],
        minlength: [1900, '{PATH} alanı {VALUE}, {MINLENGTH} yılından büyük olmalıdır.']
    },
    imdb_score: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('movie', MovieSchema);