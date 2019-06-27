const querystring = require('querystring')

class Pagination {
  constructor(options) {
    this.current = options.current || 0
    this.count = options.count || 0
    this.search = options.search || {}
    this.limit = options.limit || 20
    this.countPages = Math.ceil(options.count / options.limit)
  }

  // Retourne le nombre de pages
  getPages() {
    return Math.ceil(this.count / this.limit)
  }

  // Retourne le début de la pagination
  getStart() {
    let start = 1
    if (this.current > 3) start = this.current - 3
    return start
  }

  // Retourne la fin de la pagination
  getEnd() {
    let end = this.getPages()
    if (this.current < end - 3) end = this.current + 3
    return end
  }

  // Retourne les paramètres de l'URL
  params(others) {
    let params = Object.assign(this.search, others)
    return '?' + querystring.stringify(params)
  }
}

module.exports = Pagination
