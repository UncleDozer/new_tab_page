/*{{{
 * Author  : Kristopher Watts <kristopher.a.watts@gmail.com>
 * Website : http://webtastic-development.net
 * Github  : https://github.com/uncledozer
 *
}}}*/
var dev = true;

/*
 * Quick and dirty time function
 * Updates every 250 milleseconds
 * ----------------------{{{
 */

function time() {

    var dt          = document.querySelector( '.cur_date' );
    var da          = document.querySelector( '.cur_day' );
    var ho          = document.querySelector( '.hours' );
    var mi          = document.querySelector( '.minutes' );
    var se          = document.querySelector( '.seconds' );

    var d           = new Date();

    var hours       = d.getHours();
    var minutes     = d.getMinutes();
    var seconds     = d.getSeconds();

    var day         = d.getDay();
    var date        = d.getDate();
    var month       = d.getMonth();
    var year        = d.getFullYear();

    var days        = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    var months      = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    var currentDay     = d.getDate();
    var currentMonth   = months[ month ];
    var currentWeekday = document.createTextNode( days[day] );

    // Leading zeroes for values under 10
    function zeros( target ) {
        var t = target;

        if ( target < 10 )
            t = '0' + t;
        else
            t = t + '';

        return t;
    }

    var currentHour   = zeros( hours );
    var currentMinute = zeros( minutes );
    var currentSecond = zeros( seconds );

    var currentHour   = document.createTextNode( currentHour );
    var currentMinute = document.createTextNode( currentMinute );
    var currentSecond = document.createTextNode( currentSecond );

    var currentDate   = document.createTextNode( currentMonth + ' ' + currentDay + ', ' + year );

    // Clear the Clock
    ho.innerHTML = "";
    mi.innerHTML = "";
    se.innerHTML = "";

    // Repopulate Clock
    ho.appendChild( currentHour );
    mi.appendChild( currentMinute );
    se.appendChild( currentSecond );

    // Clear Date
    dt.innerHTML = "";
    da.innerHTML = "";

    // Repopulate Date
    dt.appendChild( currentDate );
    da.appendChild( currentWeekday );
}

// Call time() to mitigate firefox's long start time so the clock isn't empty if used as a New Tab Page
time();

// Set the interval to check the time every .25 seconds
var interval = window.setInterval( time, 250 );

// }}}


/*
 * LocalStorage for settings
 * TODO: Local Storage for saving custom links, colors, location, etc.
 */

window.NewTab = {};

/*
 * Links
 * {{{
 */

// Stores all links currently displayed on the page
NewTab.currentLinks = [];

// Targeted link objects are created as new html objects
NewTab.targetLinks = function( Targets ) {

    // Define and create Link elements
    function createLink( linkTarget ){
        // Where to insert
        var parentContainer = document.querySelector( '.link--list' );

        // Containing element
        var container = document.createElement( 'li' );
        container.setAttribute( "class", "link--item" );
        // Set ID for easy selection
        container.setAttribute( "id", linkTarget.name );

        // Anchor element with target address
        var newLink = document.createElement( 'a' );
        newLink.href = linkTarget.address;

        // Define innerhtml using target name
        var linkTitle = document.createTextNode(linkTarget.name);
        newLink.appendChild(linkTitle);

        container.appendChild(newLink);
        parentContainer.appendChild(container);
    }

    // Render all cached links
    if ( Targets == NewTab.currentLinks ) {
        for ( var i = 0; i < Targets.length; i++ ) {
            createLink( Targets[ i ] );
        }
    } else if ( Targets.name !== undefined & Targets.address !== undefined ) {
        // Create Link if at least one property is defined
        createLink( Targets );
    }
}

// Link object Constructor
NewTab.Link = function( name, address ) {
    // If the name is undefined, use the address as the name
    if ( name == "" || address == undefined )
        this.name = address;
    else
        this.name = name;

    // and vise versa
    if ( address == "" || address == undefined )
        this.address = name;
    else
        this.address = address;
}

// Renders links from localStorage or loads defaults if localStorage is empty
NewTab.renderLinks = function( setDefaults ) {
    var storedLinks = localStorage[ "links" ];
    if ( storedLinks !== "undefined" ) {
        NewTab.currentLinks = JSON.parse( storedLinks );
        NewTab.targetLinks( NewTab.currentLinks );
    } else {
        NewTab.currentLinks = NewTab.defaultLinks;
        NewTab.targetLinks( NewTab.defaultLinks );
    }
}

// Save currentLinks to localStorage
NewTab.saveLinks = function(  ) {
    localStorage[ "links" ] = JSON.stringify( NewTab.currentLinks );
}

// Set defaultLinks
NewTab.defaultLinks    = [];
NewTab.defaultLinks[0] = new NewTab.Link( "Webtastic-Development", "https://Webtastic-Development.net" );
NewTab.defaultLinks[1] = new NewTab.Link( "Github", "https://Github.com/UncleDozer" );

// Clear targeted links from currentLinks, update localstorage, render new links
NewTab.clearLinks = function( target ) {
    var removalName;

    // Get anchor's name from html
    for ( var i = 0; i > target.length; i++ ) {
        removalName = document.querySelector( target[ i ] ).innerHTML;
    }

    // Remove target from currentLinks, update localstorage, render new links
    for ( var i = 0; i > NewTab.currentLinks; i++ ) {
        if (NewTab.currentLinks[ i ].name == removalName) {
            NewTab.currentLinks.splice(i, 1);
            NewTab.saveLinks();
            NewTab.renderLinks();
        }
    }
}

NewTab.newLinkInput = function( ) {

    var submit = document.createElement( "button" );
    var submitHtml = document.createTextNode( "submit" );
    // submit.setAttribute( "type", "button" );
    submit.setAttribute( "class", "add--link-submit" );
    submit.appendChild( submitHtml );

    // Where to insert
    var parentContainer = document.querySelector( ".link--list" );

    // Containing element
    var container = document.createElement( "li" );
    container.setAttribute( "class", "link--item" );

    // One input for name and address
    var formContainer = document.createElement( "form" );
    var nameLabel = document.createElement( "label" );
    var nameInput = document.createElement( "input" );
    var nameText = document.createTextNode( "Name" );
    nameInput.setAttribute( "class", "add--link-name" );
    nameInput.setAttribute( "name", "link-name" );
    nameLabel.setAttribute( "for", nameInput.getAttribute( "name" ) );
    nameLabel.appendChild( nameText );

    var addressLabel = document.createElement( "label" );
    var addressInput = document.createElement( "input" );
    var addressText = document.createTextNode( "Address" );
    addressInput.setAttribute( "class", "add--link-address" );
    addressInput.setAttribute( "name", "link-name" );
    addressLabel.setAttribute( "for", addressInput.getAttribute( "name" ) );
    addressLabel.appendChild( addressText );

    formContainer.appendChild( nameInput );
    formContainer.appendChild( addressInput );
    formContainer.appendChild( submit );
    container.appendChild( formContainer );
    parentContainer.appendChild(container);
    NewTab.linkListener();
}

NewTab.linkListener = function() {
    newLinkButton = document.querySelector( ".add--link-submit" );
    newLinkButton.addEventListener( "click", function() {

        var nameElement = document.querySelector( ".add--link-name" );
        var addressElement = document.querySelector( ".add--link-address" );

        var inputLink = new NewTab.Link( nameElement.value, addressElement.value );

        NewTab.targetLinks( inputLink );
        NewTab.currentLinks.push( inputLink );
        NewTab.saveLinks();

        this.parentNode.removeChild( "form" );
        this.parentNode.removeChild( document.querySelector( "link--item" ) );
    }, false );
}

var editButton = document.querySelector( ".edit" );
editButton.addEventListener( "click", function() {
    NewTab.newLinkInput();
})


var clearAllLinksButton = document.querySelector( ".clear--all-links" );
clearAllLinksButton.addEventListener( "click", function() {
    // TODO: Replace window.confirm
    // Remove all Links on confirmation
    if ( window.confirm( "This action will remove ALL saved links. Continue?" ) ) {
            NewTab.currentLinks = undefined;
            NewTab.saveLinks();
            NewTab.renderLinks();
    }
} );

NewTab.init = function() {
    NewTab.renderLinks();
}

window.onload = NewTab.init;

/*
 * var defaultColors = [
 *                         Color( "blue"  , "#2DB3F7", ".time, .date" ),
 *                         Color( "red"   , "#F72D4A", ".link--item > a" ),
 *                         Color( "black" , "#1A1A1A", ".body" )
 *                     ];
 *
 * var defaultFonts  = [
 *                         Font( "Office Code Pro", "15rem"  , "bold"  , ".time" ),
 *                         Font( "Office Code Pro", "3.75rem", "bold"  , ".date" ),
 *                         Font( "Office Code Pro", "2.75rem", "bold"  , ".link--item a" ),
 *                         Font( "Office Code Pro", "2.75rem", "normal", ".sublink a" )
 *                     ];
 *
 * function Color( name, color, target ){
 *     this.name   = name;
 *     this.color  = color;
 *     this.target = target;
 * }
 *
 * function Font( name, size, style, target ){
 *     this.name   = name;
 *     this.size   = size;
 *     this.style  = style;
 * }
 */
