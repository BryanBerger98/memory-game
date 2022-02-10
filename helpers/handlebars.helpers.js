// Ce fichier permet de créer des helpers personnalisés pour Handlebars.
// Cela permet d'utiliser des fonctionnalités spécifiques dans les vues HTML.
// Voir: https://handlebarsjs.com/guide/builtin-helpers.html#sub-expressions 

module.exports = {
    /**
     * Ajoute 1 à l'argument i
     * @param {Number} i 
     * @returns {Number}
     */
    indexPlusOne: (i) => {
        return i+1;
    },
    /**
     * Renvoie true si i est égal à zéro
     * @param {Number} i 
     * @returns {Boolean}
     */
    isFirst: (i) => {
        return +i === 0 ? true : false;
    },
    /**
     * Renvoie true si i est égal à un
     * @param {Number} i 
     * @returns {Boolean}
     */
    isSecond: (i) => {
        return +i === 1 ? true : false;
    },
    /**
     * Renvoie true si i est égal à deux
     * @param {Number} i 
     * @returns {Boolean}
     */
    isThird: (i) => {
        return +i === 2 ? true : false;
    }
}