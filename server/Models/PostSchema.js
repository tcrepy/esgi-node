const mongoose = require('mongoose');
const db = require('../lib/db');

const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({
    title: String,
    description: String,
    link: String,
    user: {
        _id: String,
        pseudo: String
    },
    categories: {
        _id: String,
        title: String,
        color: String
    },
    created_at: {type: Date, default: Date.now},
    upvote: {type: Number, default: 0}
});

class Post {

    testIsValid() {

        let motifs = []

        if (!this.title || this.title == "")
            motifs.push('pas de titre')
        if (!this.description || this.description == "")
            motifs.push('pas de description')
        if (!this.link || this.link == "")
            motifs.push("pas de lien vers l'article")
        if (!this.categories)
            motifs.push('pas de category')
        if (this.categories && !/^[A-F0-9]{6}$/i.exec(this.categories.color))
            motifs.push('couleur pas hexadecimal')
        if (!this.user)
            motifs.push('pas duser')
        if (this.user && !this.user.pseudo)
            motifs.push('user de pseudo')
        if (!this.upvote)
            motifs.push('pas de vote')
        if (this.upvote < 0)
            motifs.push("pas de vote négatif")

        if (motifs.length > 0) return false
        else return true
    }

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
                if (Object.keys(params).length === 0) {
                    return {
                        "match_all": {}
                    };
                } else {
                    search = {
                        "bool": {}
                    };
                }
                Object.keys(params).forEach(key => {
                    // On récupère la valeur du champs
                    let value = params[key]

                    // On ignore les champs vides
                    if (!value) return

                    switch (key) {
                        case 'search':
                            search.bool.must = [{
                                "multi_match": {
                                    "query": value,
                                    "fields": [
                                        "description",
                                        "title"
                                    ],
                                    "operator": "AND"
                                }
                            }];
                            break;
                        case 'description':
                        case 'title':
                            search.description = value;
                            break;
                        case 'category':
                            search.bool.filter = {
                                "bool": {
                                    "must": [
                                        {
                                            "terms": {
                                                "categories._id": [
                                                    value
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                            ;
                            break;
                        case
                        'pseudo'
                        :
                            search["user.pseudo"] = value;
                            break;
                        case
                        'user'
                        :
                            search["user._id"] = value;
                            break;
                    }
                });

                // On exécute toutes les requêtes annexes
                // et on retourne l'objet de recherche construit
                return Promise.all(promises).then(() => search)
            }
        )
    }
}

PostSchema.loadClass(Post)

const PostModel = db.model('Post', PostSchema);

module.exports = PostModel;
