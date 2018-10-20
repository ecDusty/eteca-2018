/* global google, ko, console */

// Custom Code for application build
class Model = {
    constructor = {
        this.Name = `Groopy App`;
    }

    get(url) {
        return fetch(url).then(response => response.json())
    }

}

// KNOCKOUT CODING SECTION
//
class etecaViewModel() {

    initApp() {

    }
}

//Menu Items
//


function etecaViewModel() {
    const self = this;

}
ko.applyBindings(new etecaViewModel());