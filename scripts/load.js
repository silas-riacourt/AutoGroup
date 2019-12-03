/*

Silass_ @ 2019

*/


var interval;
var group;
var year;
var list;
var preferences;

/* Début du script : récupération des données */
chrome.storage.sync.get(["year", "group"], function (results) {

    group = results.group;
    year = results.year;

    //Toutes les 1s on vérifie le chargement
    interval = setInterval(checkLoading, 100);

});

/* 
 *
 * Vérifie si la page est totalement chargée
 * SI oui on lance init() et on arrête la boucle
 * 
 */
function checkLoading() {

    /* On récupère les catégories */
    list = document.getElementsByClassName('x-grid3-body')[0];

    /* Vérif si elles sont chargés ou non */
    if (list == null) {

    } else {
        setTimeout(treeLoad, 700);
        clearInterval(interval);
    }
};
/*
 *
 * Permet de récupérer les catégories affichés à l'écran
 *
 * return : un tableau
 */
function getCategories() {
    let cats = [];
    list = document.getElementsByClassName('x-grid3-body')[0];
    if (list != null) {

        /* Pour toutes les catégories on les mets dans un tableau */
        for (let i = 0; i < list.childElementCount; i++) {

            let name;
            let cat = [];
            let level;
            if (list.childNodes[i] != null) {

                /* nom de la catégorie */
                name = list.childNodes[i].getAttribute("aria-label");

                name = name.replace(/\s/g, '');

                level = list.childNodes[i].getAttribute("aria-level")
                cat = {
                    "id": i,
                    "name": name,
                    "level": level
                };
                /* ajout dans l'array */
                cats.push(cat);
            }

        }
    } else {
        console.log("Erreur : les catéogires n'ont pas chargés");
    }
    return cats;
};
/*
 *
 * Permet de vérifier une catégorie dans la kiste
 *
 */
function treeCheck(i) {

    /* Pour les détails détails */
    var cats = [];

    /* On récupère les catégories */
    cats = getCategories();

    /* récupération de la catégorie a ouvrir selon la préférence */
    id = cats.find(item => item.name.toUpperCase() == preferences[i].toUpperCase());

    /* si on trouve */
    if (id != null) {

        cats = getCategories();
        /* Ouverture de la section ID */
        openSection(id["id"]);
        /* Si c'est une section EDT on l'ouvre */
        if (i == 5) {
            openEdt(id["id"]);
        }
        /* scroll auto pour régler un bug d'enfants invisibles */
        document.getElementsByClassName('x-grid3-scroller')[0].scrollTop = list.childNodes[id["id"]].offsetTop;
    }

    /* Gestion de la boucle récursive */
    if (++i < 6) {
        setTimeout(function () {
            treeCheck(i);
        }, 1000);
    }

};

/*
 *
 * Lancement de la création et vérification de l'arbre
 * 
 */
function treeLoad() {

    /* liste des catégorie initalisés aux catégories affichés */
    list = document.getElementsByClassName('x-grid3-body')[0];

    /* Les préférences de sélection automatique dans l'ordre d'éxécution */
    preferences = ["etudiants", "iutlannion", "dutinfo", "info" + year + "a", group.charAt(0), group];
    var id = -1;

    treeCheck(0);

};

/*
 * Ouvre la section  avec l'id ID
 */
function openSection(id) {

    list.childNodes[id].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[1].click();

};

/*
 *
 * Ouvre l'emploie du temps avec l'id ID
 * 
 */
function openEdt(id) {
    var clickEvent = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    list.childNodes[id].dispatchEvent(clickEvent);
}