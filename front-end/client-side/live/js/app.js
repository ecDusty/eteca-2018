"use strict";var _createClass=function(){function r(o,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(o,r.key,r)}}return function(o,e,t){return e&&r(o.prototype,e),t&&r(o,t),o}}();function _classCallCheck(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}var Modelgroopy=function(){function o(){_classCallCheck(this,o),this.Name="groopy App"}return _createClass(o,[{key:"get",value:function(o){return fetch(o).then(function(o){return o.json()})}},{key:"postG",value:function(o,e){return fetch(o,{method:"post",body:JSON.stringify(e)}).then(function(o){return o.json()})}},{key:"putG",value:function(o,e){return fetch(o,{method:"put",body:JSON.stringify(e)}).then(function(o){return o.json()})}},{key:"deleteG",value:function(o,e){return fetch(o,{method:"delete",body:JSON.stringify(e)}).then(function(o){return o.json()})}}]),o}();function ClientgroopyViewModel(){var y=this;y.M=new Modelgroopy,y.THENAME=ko.observable("groopy"),y.views=["My groopys","groopys","Check in"],y.activeView=ko.observable(y.views[1]),y.locationShow=ko.observable(!0),y.preferredLocation=ko.observable("Cyberport"),y.MenuItem=function(o,e){this.name=o,this.icon=e,this.alt=this.name+" Icon",y.activeView==this.name?this.active=ko.observable(!0):this.active=ko.observable(!1)},y.mainMenuItems=[new y.MenuItem(y.views[0],'<img src="images/my-groopy-img.png" alt="my groopys icon">'),new y.MenuItem(y.views[1],'<i class="fas fa-list-ul"></i>'),new y.MenuItem(y.views[2],'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>qr-code</title><path d="M19.6,25.37H15v2.21a.49.49,0,0,1,0,.12H12.7V23.08H15V20.77h4.6v-2.3h8.08v2.3H30v4.61H27.7V27.7H26.55V30H24.24v-.08q0-1.07,0-2.13a.25.25,0,0,1,0-.08h1.13v-2.3H24.24v.09q0,1.07,0,2.13a.34.34,0,0,0,0,.1H21.93V30H19.62v-.13c0-1.45,0-2.91,0-4.37a.62.62,0,0,0,0-.13h2.33V23.19s0-.07,0-.11h2.29v-2.3h-2.3V23a.19.19,0,0,0,0,.08H19.62v.12c0,.69,0,1.38,0,2.07A.34.34,0,0,1,19.6,25.37Z" transform="translate(0)"/><path d="M15,9.23h2.3v3.46h5.77s0,.05,0,.07v2.18s0,.05,0,.07h-2.3v2.3H17.31V15H15V17.3H9.24V15H6.92V17.3H2.3V15.12a.37.37,0,0,0,0-.11H4.61V12.7H15V9.34a.45.45,0,0,1,0-.11Z" transform="translate(0)"/><path d="M30,10.38H19.62V0H30ZM27.69,2.31H21.93V8.07h5.76Z" transform="translate(0)"/><path d="M0,30V19.61H.11c3.38,0,6.77,0,10.16,0,.09,0,.12,0,.12.12q0,5.09,0,10.15V30Zm8.07-8.07H2.31v5.76H8.07Z" transform="translate(0)"/><path d="M0,10.37V0H10.38V10.37ZM8.07,2.31H2.31V8.07H8.07Z" transform="translate(0)"/><path d="M15,9.23H12.7V4.61H15V2.39s0-.06,0-.1H17.3V6.92H15V9.23Z" transform="translate(0)"/><path d="M23.07,15h2.31V12.7h2.31V15H30v2.3H23.08V15.11s0-.07,0-.1Z" transform="translate(0)"/><path d="M15,2.29H12.7V0H15V2.19s0,.07,0,.1Z" transform="translate(0)"/><path d="M2.29,15H0V12.7H2.3v2.23a.25.25,0,0,1,0,.08Z" transform="translate(0)"/><path d="M15,20.77H12.7v-2.3H15v2.3Z" transform="translate(0)"/><path d="M15,27.71H17.3V30H15V27.71Z" transform="translate(0)"/><path d="M27.7,27.7H30V30H27.7V27.79a.28.28,0,0,1,0-.09Z" transform="translate(0)"/><path d="M23.08,6.91V3.46h3.46V6.91Z" transform="translate(0)"/><path d="M6.92,26.54H3.47V23.08H6.92Z" transform="translate(0)"/><path d="M6.92,6.92H3.47V3.47H6.92Z" transform="translate(0)"/></svg>')],y.activeSubMenu=ko.observable("today"),y.groopy=[{}],y.subMenuItems=[new y.MenuItem("Today","today"),new y.MenuItem("Tomorrow","tomorrow")],y.subMenuShow=ko.observable(!1),y.activeGroopy=ko.observable("loading"),y.activeGroopyToday=ko.observableArray(),y.activeGroopyTomorrow=ko.observableArray(),y.activeExtraPage=ko.observable("welcomePage"),y.activeExtra=ko.observable(!1),y.backButton=function(){y.activeExtra(!1)},y.groopyPage={show:ko.observable(!1),id:ko.observable(""),name:ko.observable(""),image:ko.observable(""),location:{address1:ko.observable(""),address2:ko.observable(""),city:ko.observable(""),country:ko.observable("")},cuisineType:ko.observable(""),offer:ko.observable(""),timeStart:ko.observable(""),timeEnd:ko.observable(""),peopleArray:ko.observableArray(""),peopleTotal:ko.observable(""),peopleJoining:ko.observable(""),peopleMin:ko.observable(""),needHelp:ko.observable(!1)},y.groopyPage.displayTime=ko.computed(function(){return y.groopyPage.timeStart()+" - "+y.groopyPage.timeEnd()}),y.groopyPageReset=function(){},y.profilePicSet=ko.observable(!1),y.curPosition=ko.observable(),y.accountAdd=ko.observable(!1),y.addAccount=function(){y.M.postG("http://23.98.37.11/api/user/create.php",{name:"Ellie",email:"ecmgit@outlook.com",password:"asdf1234"})},y.accountID=1,y.myGroopys=y.activeGroopyToday,y.menuClick=function(o){if(o.active())y.activeExtra(!1);else{o.name==y.views[1]?y.locationShow(!0):y.locationShow(!1);var e=!0,t=!1,r=void 0;try{for(var a,n=y.mainMenuItems[Symbol.iterator]();!(e=(a=n.next()).done);e=!0){a.value.active(!1)}}catch(o){t=!0,r=o}finally{try{!e&&n.return&&n.return()}finally{if(t)throw r}}o.active(!0),y.activeView(o.name),y.activeExtra(!1)}},y.subMenuClick=function(o){if(!o.active()){var e=!0,t=!1,r=void 0;try{for(var a,n=y.subMenuItems[Symbol.iterator]();!(e=(a=n.next()).done);e=!0){a.value.active(!1)}}catch(o){t=!0,r=o}finally{try{!e&&n.return&&n.return()}finally{if(t)throw r}}o.active(!0),y.activeSubMenu(o.icon)}},y.showGroopy=function(o){y.groopyPage.id(o.id),y.groopyPage.name(o.name),y.groopyPage.image(o.image),y.groopyPage.location.address1(o.location.address1),y.groopyPage.location.address2(o.location.address2),y.groopyPage.location.city(o.location.city),y.groopyPage.location.country(o.location.country),y.groopyPage.cuisineType(o.cuisineType),y.groopyPage.offer(o.offer),y.groopyPage.timeStart(o.timeStart),y.groopyPage.timeEnd(o.timeEnd),y.groopyPage.peopleArray([]);var e=!0,t=!1,r=void 0;try{for(var a,n=o.peopleArray()[Symbol.iterator]();!(e=(a=n.next()).done);e=!0){var i=a.value;y.groopyPage.peopleArray.push(i)}}catch(o){t=!0,r=o}finally{try{!e&&n.return&&n.return()}finally{if(t)throw r}}y.groopyPage.peopleTotal(o.peopleTotal),y.groopyPage.peopleJoining(o.peopleJoining),y.groopyPage.peopleMin(o.peopleMin),y.groopyPage.needHelp(o.needHelp),y.groopyPage.show(!0),y.activeExtraPage("groopyPage"),y.activeExtra(!0)},y.getTodayGroopys=function(o){return y.M.get(o)},y.getTomorrowGroopys=function(){return y.M.get("json/groopys.json")},y.setupGroopys=function(o){var e="activeGroopyToday";y[e]([]);var t=function(o){for(o.image||(o.image="images/groopy-logo.png"),o.peopleArray=ko.observableArray(),s=0;s<o.peopleTotal;s++)l=s<=o.peopleJoining,o.peopleArray.push({filled:l});o.displayTime=ko.computed(function(){return o.timeStart+" - "+o.timeEnd}),o.help=ko.observable(o.needHelp),y[e].push(o)},r=!0,a=!1,n=void 0;try{for(var i,p=o.records[Symbol.iterator]();!(r=(i=p.next()).done);r=!0){var s,l;t(i.value)}}catch(o){a=!0,n=o}finally{try{!r&&p.return&&p.return()}finally{if(a)throw n}}},y.setupGroopysTomorrow=function(o){var e="activeGroopyTomorrow";y[e]([]);var t=function(o){for(o.image||(o.image="images/groopy-logo.png"),o.peopleArray=ko.observableArray(),s=0;s<o.peopleTotal;s++)l=s<=o.peopleJoining,o.peopleArray.push({filled:l});o.displayTime=ko.computed(function(){return o.timeStart+" - "+o.timeEnd}),o.help=ko.observable(o.needHelp),y[e].push(o)},r=!0,a=!1,n=void 0;try{for(var i,p=o.records[Symbol.iterator]();!(r=(i=p.next()).done);r=!0){var s,l;t(i.value)}}catch(o){a=!0,n=o}finally{try{!r&&p.return&&p.return()}finally{if(a)throw n}}},y.setupSingleGroopy=function(o,e){var t=o;t.image||(t.image="images/groopy-logo.png"),t.peopleArray=ko.observableArray();for(var r=0;r<t.peopleTotal;r++){var a=r<=t.peopleJoining;t.peopleArray.push({filled:a})}t.displayTime=ko.computed(function(){return t.timeStart+" - "+t.timeEnd}),t.help=ko.observable(t.needHelp),e.push(t)},y.getMyGroopys=function(o){return y.M.get(o)},y.updateMyGroopys=function(){y.getMyGroopys("http://23.98.37.11/user/groopys.php?id={"+y.accountID+"}").then(function(o){var e=!0,t=!1,r=void 0;try{for(var a,n=o.records[Symbol.iterator]();!(e=(a=n.next()).done);e=!0){var i=a.value;y.getTodaysGroopys("http://23.98.37.11/api//groopy/get.php?id={"+i+"}").then(function(o){y.setupSingleGroopy(o,y.myGroopys)})}}catch(o){t=!0,r=o}finally{try{!e&&n.return&&n.return()}finally{if(t)throw r}}})},y.registerGroopy=function(){y.groopyPageReset,y.M.postG("http://23.98.37.11/api/user/join.php?",{id:y.accountID,g_id:y.groopyPage.id()})},y.initApp=function(){y.getTodayGroopys("http://23.98.37.11/api/groopy/list.php").then(y.setupGroopys).then(function(){y.getTomorrowGroopys().then(y.setupGroopysTomorrow)}).then(function(){y.subMenuShow(!0),y.activeGroopy("GroopyItem"),navigator.geolocation.getCurrentPosition(function(o){y.curPosition(o)})}),y.updateMyGroopys()},y.initApp()}var test=new ClientgroopyViewModel;ko.applyBindings(test);