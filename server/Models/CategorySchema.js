const mongoose = require('mongoose');
const db = require('../lib/db');

const CategorySchema = mongoose.Schema({
    title: String,
    description: String,
    color: String,
    created_at: { type: Date, default: Date.now },
});

class Category {

    testIsValid(){

        let motifs = []

        if(!this.title || this.title == "")
          motifs.push('pas de titre')
        if(!this.description || this.description == "")
          motifs.push('pas de description')
        if(!/^[A-F0-9]{6}$/i.exec(this.color))
          motifs.push('couleur pas hexadecimal')

        if(motifs.length > 0) return false
        else return true
    }

}

CategorySchema.loadClass(Category)

const CategoryModel = db.model('Category', CategorySchema);

module.exports = CategoryModel;
