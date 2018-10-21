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
            body: JSON.stringify(options)
        }).then(response => response.json())
    }

    putG(url,options) {
        console.log(`Putting object:
                    ${options}`);
        return fetch(url,{
            method: `put`,
            body: JSON.stringify(options)
        }).then(response => response.json())
    }

    deleteG(url,options) {
        console.log(`Deleting object:
                    ${options}`);
        return fetch(url,{
            method: `delete`,
            body: JSON.stringify(options)
        }).then(response => response.json())
    }
}

// KNOCKOUT CODING SECTION
//

function ClientgroopyViewModel() {
    //Pull In Model
    const foo = this;
    foo.M = new Modelgroopy();

    foo.THENAME = ko.observable('groopy');

    // Genearl Data
    //
    foo.views = [
        'My groopys',
        'groopys',
        'Check in'
    ]
    
    foo.activeView = ko.observable(foo.views[1]);

    foo.locationShow = ko.observable(true);

    foo.preferredLocation = ko.observable('Cyberport');
    
    //Main Menu Structure
    foo.MenuItem = function(name,icon) {
        this.name = name;
        this.icon = icon;
        this.alt = `${this.name} Icon`;
        (foo.activeView == this.name) ?  this.active = ko.observable(true) : this.active = ko.observable(false);
    }

    foo.mainMenuItems = [
        new foo.MenuItem(foo.views[0],'<img src="images/my-groopy-img.png" alt="my groopys icon">'),
        new foo.MenuItem(foo.views[1],'<i class="fas fa-list-ul"></i>'),
        new foo.MenuItem(foo.views[2],'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>qr-code</title><path d="M19.6,25.37H15v2.21a.49.49,0,0,1,0,.12H12.7V23.08H15V20.77h4.6v-2.3h8.08v2.3H30v4.61H27.7V27.7H26.55V30H24.24v-.08q0-1.07,0-2.13a.25.25,0,0,1,0-.08h1.13v-2.3H24.24v.09q0,1.07,0,2.13a.34.34,0,0,0,0,.1H21.93V30H19.62v-.13c0-1.45,0-2.91,0-4.37a.62.62,0,0,0,0-.13h2.33V23.19s0-.07,0-.11h2.29v-2.3h-2.3V23a.19.19,0,0,0,0,.08H19.62v.12c0,.69,0,1.38,0,2.07A.34.34,0,0,1,19.6,25.37Z" transform="translate(0)"/><path d="M15,9.23h2.3v3.46h5.77s0,.05,0,.07v2.18s0,.05,0,.07h-2.3v2.3H17.31V15H15V17.3H9.24V15H6.92V17.3H2.3V15.12a.37.37,0,0,0,0-.11H4.61V12.7H15V9.34a.45.45,0,0,1,0-.11Z" transform="translate(0)"/><path d="M30,10.38H19.62V0H30ZM27.69,2.31H21.93V8.07h5.76Z" transform="translate(0)"/><path d="M0,30V19.61H.11c3.38,0,6.77,0,10.16,0,.09,0,.12,0,.12.12q0,5.09,0,10.15V30Zm8.07-8.07H2.31v5.76H8.07Z" transform="translate(0)"/><path d="M0,10.37V0H10.38V10.37ZM8.07,2.31H2.31V8.07H8.07Z" transform="translate(0)"/><path d="M15,9.23H12.7V4.61H15V2.39s0-.06,0-.1H17.3V6.92H15V9.23Z" transform="translate(0)"/><path d="M23.07,15h2.31V12.7h2.31V15H30v2.3H23.08V15.11s0-.07,0-.1Z" transform="translate(0)"/><path d="M15,2.29H12.7V0H15V2.19s0,.07,0,.1Z" transform="translate(0)"/><path d="M2.29,15H0V12.7H2.3v2.23a.25.25,0,0,1,0,.08Z" transform="translate(0)"/><path d="M15,20.77H12.7v-2.3H15v2.3Z" transform="translate(0)"/><path d="M15,27.71H17.3V30H15V27.71Z" transform="translate(0)"/><path d="M27.7,27.7H30V30H27.7V27.79a.28.28,0,0,1,0-.09Z" transform="translate(0)"/><path d="M23.08,6.91V3.46h3.46V6.91Z" transform="translate(0)"/><path d="M6.92,26.54H3.47V23.08H6.92Z" transform="translate(0)"/><path d="M6.92,6.92H3.47V3.47H6.92Z" transform="translate(0)"/></svg>')
    ];

    // Groopy Data
    //
    foo.activeSubMenu = ko.observable('today');

    foo.groopy = [{}]

    foo.subMenuItems = [
        new foo.MenuItem('Today','today'),
        new foo.MenuItem('Tomorrow','tomorrow')
    ];

    foo.subMenuShow = ko.observable(false);
    foo.activeGroopy = ko.observable('loading');

    foo.activeGroopyToday = ko.observableArray();

    foo.activeGroopyTomorrow = ko.observableArray();

    //Extra Pages Data
    //
    foo.activeExtraPage = ko.observable('welcomePage');
    foo.activeExtra = ko.observable(false);

    foo.backButton = function() {
        foo.activeExtra(false);
    }

    //Specific groopy page
    foo.groopyPage = {
        show: ko.observable(false),
        name: ko.observable(''),
        image: ko.observable(''),
        location: {
            address1: ko.observable(''),
            address2: ko.observable(''),
            city: ko.observable(''),
            country: ko.observable('')
        },
        cuisineType: ko.observable(''),
        offer: ko.observable(''),
        timeStart: ko.observable(''),
        timeEnd: ko.observable(''),
        peopleArray: ko.observableArray(''),
        peopleTotal: ko.observable(''),
        peopleJoining: ko.observable(''),
        peopleMin: ko.observable(''),
        needHelp: ko.observable(false)
    }

    foo.groopyPage.displayTime = ko.computed(function() {
        return foo.groopyPage.timeStart()+' - '+foo.groopyPage.timeEnd();
    })

    foo.groopyPageReset = function() {

    }

    //USER DATA
    //
    foo.profilePicSet = ko.observable(false);
    foo.curPosition = ko.observable();
    foo.accountAdd = ko.observable(false);

    //Create sample account for ellie
    foo.addAccount = function () {
        foo.M.postG('http://23.98.37.11/api/user/create.php',
        {
            name: 'Ellie',
            email: 'ecmgit@outlook.com',
            password: 'asdf1234'
        })
    }

    foo.accountID = 1;

    foo.myGroopys = foo.activeGroopyToday

//==================
//
//   FUCNTIONS
//
//====================


    //Menu Functions structure
    //
    foo.menuClick = function(item) {
        if (!item.active()) {
            item.name == foo.views[1] ? foo.locationShow(true) : foo.locationShow(false); 
            for (const mItem of foo.mainMenuItems) { mItem.active(false); }
            item.active(true);
            foo.activeView(item.name);
            foo.activeExtra(false);
        } else {
            foo.activeExtra(false);
        }
    }

    // Sub Menu Functions
    //
    foo.subMenuClick = function(item) {
        if (!item.active()) {
            for (const mItem of foo.subMenuItems) { mItem.active(false); }
            item.active(true);
            foo.activeSubMenu(item.icon);
        }
    }


    //Extra Pages functions
    //
    foo.showGroopy = function(item) {
        foo.groopyPage.name(item.name);
        foo.groopyPage.image(item.image);
        foo.groopyPage.location.address1(item.location.address1);
        foo.groopyPage.location.address2(item.location.address2);
        foo.groopyPage.location.city(item.location.city);
        foo.groopyPage.location.country(item.location.country);
        foo.groopyPage.cuisineType(item.cuisineType);
        foo.groopyPage.offer(item.offer);
        foo.groopyPage.timeStart(item.timeStart);
        foo.groopyPage.timeEnd(item.timeEnd);
        foo.groopyPage.peopleArray([]);
        for(const person of item.peopleArray()) {
            foo.groopyPage.peopleArray.push(person);
        }
        foo.groopyPage.peopleTotal(item.peopleTotal);
        foo.groopyPage.peopleJoining(item.peopleJoining);
        foo.groopyPage.peopleMin(item.peopleMin);
        foo.groopyPage.needHelp(item.needHelp);
        foo.groopyPage.show(true);
        foo.activeExtraPage('groopyPage');
        foo.activeExtra(true);
    }

    // Start the applciation
    //
    foo.getTodayGroopys = function(url) {
        return foo.M.get(url)
    }
    foo.getTomorrowGroopys = function() {
        return foo.M.get('json/groopys.json')
    }
    foo.setupGroopys = function(response) {
        let day = 'activeGroopyToday';
        foo[day]([]);
        for (const gItem of response.records) {
            if(!gItem.image) {
                gItem.image = 'images/groopy-logo.png';
            }

            gItem.peopleArray = ko.observableArray();
            for (var i = 0; i < gItem.peopleTotal; i++) {
                var filled = (i <= gItem.peopleJoining);
                gItem.peopleArray.push({filled})
            }
            gItem.displayTime = ko.computed(function() {
                return `${gItem.timeStart} - ${gItem.timeEnd}`;        
            });
            gItem.help = ko.observable(gItem.needHelp);
            foo[day].push(gItem);
        }
    }
    foo.setupGroopysTomorrow = function(response) {
        let day = 'activeGroopyTomorrow';
        foo[day]([]);
        for (const gItem of response.records) {
            if(!gItem.image) {
                gItem.image = 'images/groopy-logo.png';
            }

            gItem.peopleArray = ko.observableArray();
            for (var i = 0; i < gItem.peopleTotal; i++) {
                var filled = (i <= gItem.peopleJoining);
                gItem.peopleArray.push({filled})
            }
            gItem.displayTime = ko.computed(function() {
                return `${gItem.timeStart} - ${gItem.timeEnd}`;        
            });
            gItem.help = ko.observable(gItem.needHelp);
            foo[day].push(gItem);
        }
    }

    foo.getMyGroopys = function(url) {
        return foo.M.get(url)
    }

    foo.updateMyGroopys = function() {
        foo.getMyGroopys(`/user/groopys.php?id={${foo.accountID}}`)
        .then(function(response) {
            for (const id of response.records) {
                foo.get
            }
        })
    }

    foo.initApp = function() {
        foo.getTodayGroopys('http://23.98.37.11/api/groopy/list.php')
        .then(foo.setupGroopys)
        .then(function() {
            foo.getTomorrowGroopys().then(foo.setupGroopysTomorrow);
        }).then(function() {
            foo.subMenuShow(true);
            foo.activeGroopy('GroopyItem');
            navigator.geolocation.getCurrentPosition(function(pos){ foo.curPosition(pos); });
        });

        foo.updateMyGroopys
    }

    // Call Start the application
    //
    foo.initApp();
}

var test = new ClientgroopyViewModel()

ko.applyBindings(test);