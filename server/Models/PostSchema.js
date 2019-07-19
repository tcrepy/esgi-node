const mongoose = require('mongoose');
const db = require('../lib/db');

const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({
    title: String,
    description: String,
    link: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    categories: {id: String, title: String, color: String},
    created_at: {type: Date, default: Date.now},
    upvote: {type: Number, default: 0}
});

class Post {
    // -------------------------
    // Permet de faire une recherche avancée
    // sur les annonces
    // -------------------------
    static paramize(params) {
        return Promise.resolve().then(() => {
            let search = {}
            let promises = []
            // On parcours les paramètres de recherche
            // pour construire la requête finale
            Object.keys(params).forEach(key => {
                // On récupère la valeur du champs
                let value = params[key]

                // On ignore les champs vides
                if (!value) return

                switch (key) {
                    case 'description':
                    case 'title':
                        let reg = new RegExp(value, 'ig')
                        search.description = reg
                        break
                }
            })

            // On exécute toutes les requêtes annexes
            // et on retourne l'objet de recherche construit
            return Promise.all(promises).then(() => search)
        })
    }
}

PostSchema.loadClass(Post)

const PostModel = db.model('Post', PostSchema);

module.exports = PostModel;
