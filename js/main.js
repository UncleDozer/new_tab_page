/*{{{
 * Author  : Kristopher Watts <kristopher.a.watts@gmail.com>
 * Website : http://webtastic-development.net
 * Github  : https://github.com/uncledozer
 *
}}}*/

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
 * Default links: https://Webtastic-Development.com,
 *                https://Github.com/UncleDozer
 * TODO: Local Storage for saving custom links, colors, location, etc.
 */

// Get Properties or set Defaults
var defaultLinks  = [
                        Link( "Webtastic-Development", "https://Webtastic-Development.net" ),
                        Link( "Github", "https://Github.com/UncleDozer" )
                    ];

var defaultColors = [
                        Color( "blue"  , "#2DB3F7", ".time, .date" ),
                        Color( "red"   , "#F72D4A", ".link--item > a" ),
                        Color( "black" , "#1A1A1A", ".body" )
                    ];

var defaultFonts  = [
                        Font( "Office Code Pro", "15rem"  , "bold"  , ".time" ),
                        Font( "Office Code Pro", "3.75rem", "bold"  , ".date" ),
                        Font( "Office Code Pro", "2.75rem", "bold"  , ".link--item a" ),
                        Font( "Office Code Pro", "2.75rem", "normal", ".sublink a" )
                    ];

function setProps( prop, set, defaults ) {

    // var localItem = 

    if ( localStorage.getItem( prop ) == null )
        set = defaults;
    else
        set = localItem;

    return set;
}

var links = [];


// function setDefaults() {
    // var colors = setProps( "colors", colors, defaultColors );
    // var links  = setProps( "links", links, defaultLinks );
    // var fonts  = setProps( "fonts", fonts, defaultFonts );
// }

function getTextVal( target ){
    return target.value();
}

function Link( name, address, sublink, parentLink ) {
    if ( name == "" )
        this.name = address;
    else
        this.name = name;

    if ( address == "" )
        this.address = name;
    else
        this.address = address;

    this.sublink = sublink;
    if (sublink)
        this.parentLink = parentLink;
}

function createLink( linkTarget ){
    var parentContainer = document.querySelector( '.link--list' )

    var container = document.createElement( 'li' );
    container.setAttribute("class", "link--item");

    var newLink = document.createElement( 'a' );
    newLink.href = linkTarget.address;

    var linkTitle = document.createTextNode(linkTarget.name);
    newLink.appendChild(linkTitle);

    container.appendChild(newLink);

    parentContainer.appendChild(container);

}

function Color( name, color, target ){
    this.name   = name;
    this.color  = color;
    this.target = target;
}

function Font( name, size, style, target ){
    this.name   = name;
    this.size  = size;
    this.style  = style;
}

// Get Settings from inputs
var newLinkButton = document.querySelector( '.add--link-submit' );

newLinkButton.addEventListener( "click", addLink, false );

function addLink(  ) {
    var nameElement = document.querySelector( '[name="title-1"]' );
    var addressElement = document.querySelector( '.add--link-address' );
    var linkName = nameElement.value;
    var linkAddress = addressElement.value;

    var newlink = new Link( linkName, linkAddress );
    createLink( newlink );

    links.push( newlink );
    saveLinkTest();
}

function saveLinkTest() {
    localStorage.setItem( "Links", JSON.stringify(links) );
    console.log( localStorage.getItem( "Links" ) );
}

var retrieved = localStorage.getItem( "Links" );
console.log( JSON.parse( localStorage.getItem( retrieved ) ) );
