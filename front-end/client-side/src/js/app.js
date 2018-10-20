/* global google, ko, console JSONstringify */

// Custom Code for application build
class Modelgroopy {
    constructor() {
        this.Name = `groopy App`;
    }

    get(url) {
        return fetch(url).then(response => response.json());
    }

    postG(url,options) {
        console.log(`Posting object:
                    ${options}`);
        return fetch(url,{
            method: `post`,
            body: JSONstringify(options)
        }).then(response => response.json())
    }

    putG(url,options) {
        console.log(`Putting object:
                    ${options}`);
        return fetch(url,{
            method: `post`,
            body: JSONstringify(options)
        }).then(response => response.json())
    }

    deleteG(url,options) {
        console.log(`Deleting object:
                    ${options}`);
        return fetch(url,{
            method: `post`,
            body: JSONstringify(options)
        }).then(response => response.json())
    }
}

// KNOCKOUT CODING SECTION
//

//Menu Items
//


class ClientgroopyViewModel {
    constructor() {
        //Pull In Model
        const self = this;
        this.M = new Modelgroopy();

        // Genearl Data
        //
        this.views = [
            'groopys',
            'My groopys',
            'Profile'
        ]
        //Main Menu Structure
        this.activeMenu = ko.observable('groopys');
        this.MenuItem = function(name,imageURL,CSSclass) {
            this.name = name;
            this.url = imageURL;
            this.alt = `${this.name} Icon`;
            this.CSSclass = ko.observable(CSSclass);
            (self.activeMenu() == this.name) ? this.active = ko.observable(true) : this.active = ko.observable(false);
        }

        this.mainMenuItems = [
            new this.MenuItem(self.views[0]),
            new this.MenuItem(self.views[1]),
            new this.MenuItem(self.views[2])
        ];

        // Call Start the application
        //
        this.initApp();
    }


    //Menu Functions structure
    //
    menuClick(item) {
        if (item.active()) 
            item.active(false);
        else {
            for (const mItem of this.mainMenuItems) {
                mItem.active(false);
            }
            item.active(true);
            this.activeMenu(item.name);
        }
    }

    // Start the applciation
    //

    initApp() {

    }
}
ko.applyBindings(new ClientgroopyViewModel());