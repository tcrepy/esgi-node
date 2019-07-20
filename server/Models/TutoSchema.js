const mongoose = require('mongoose');
const db = require('../lib/db');

const Schema = mongoose.Schema

const TutoSchema = mongoose.Schema({
    title: String,
    price: Number,
    videos: [{ type: mongoose.Schema.Types.Mixed, default: {} }],
    teacher: { type: mongoose.Schema.Types.Mixed, default: {} },
    category: {
        title: String,
        color: String
    },
    created_at: {type: Date, default: Date.now},
    rates: [{
        stars: Number,
        user: String,
        comment: String,
    }]
});

class Tuto {

    addRate(rate){
        if(rate.stars <= 2 && !rate.comment) return false
        else {
            this.rates.push(rate)
            return this.save()
        }
    }

    testIsValid(){

        let motifs = []

        if(!this.title || this.title == "")
          motifs.push('pas de title')
        if(!this.price)
          motifs.push('pas de prix')
        if(!this.videos || !this.videos.length || !Array.isArray(this.videos))
          motifs.push('pas de video')
        if(!this.teacher)
          motifs.push('pas de prof')
        if(this.teacher && !this.teacher.pseudo)
          motifs.push('prof de pseudo')
        if(!this.category)
          motifs.push('pas de category')
        if(this.category && !/^[A-F0-9]{6}$/i.exec(this.category.color))
          motifs.push('couleur pas hexadecimal')
        if(!this.rates && this.price > 0)
          motifs.push('le prix ne peut pas être supérieur à 0 si aucun avis')
        this.rates.forEach(rate => {
            if(rate.stars <= 2 && !rate.comment
                || rate.stars <= 2 && rate == "")
                motifs.push(`${rate.pseudo} n'a pas écrit de commentaire`)
            if(rate.stars > 5)
                motifs.push("Le nombre d'étoiles ne peut pas être supérieur à 5")
            if(rate.stars < 0)
                motifs.push("Le nombre d'étoiles ne peut pas être négatif")
        });

        if(motifs.length > 0) return false
        else return true
    }
}

TutoSchema.loadClass(Tuto)

const TutoModel = db.model('Tuto', TutoSchema);

module.exports = TutoModel;
