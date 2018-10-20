/* global google, ko, console */

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
                    ${Options}`);
        return fetch(url,{
            method: `post`,
            body: JSONstringify(options)
        }).then(response => response.json())
    }

    putG(url,options) {
        console.log(`Putting object:
                    ${Options}`);
        return fetch(url,{
            method: `post`,
            body: JSONstringify(options)
        }).then(response => response.json())
    }

    deleteG(url,options) {
        console.log(`Deleting object:
                    ${Options}`);
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
        this.M = new Modelgroopy();

        //Main Menu Structure
        this.activeMenu = ko.observable('');
        this.MenuItem = function(name,imageURL,CSSclass) {
            this.name = name;
            this.url = imageURL;
            this.alt = `${this.name} Icon`;
            this.CSSclass = ko.observable(CSSclass);
            this.active = ko.observable(false);
        }
        this.mainMenuItems = [
            new self.MenuItem('groopys'),
            new self.MenuItem('My groopys'),
            new self.MenuItem('Profile')
        ]

    }


    //Menu Functions structure
    //
    menuClick(item) {
        if (item.active()) 
            item.active(false);
        else {
            for (const mItem of self.mainMenuItems) {
                mItem.active(false);
            }
            item.active(true);
        }
    }

    testClass() {
        console.log('Testing ES6 Class structure')
    }
}
ko.applyBindings(new ClientViewModel());