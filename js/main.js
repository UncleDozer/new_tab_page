/*{{{
 * Author  : Kristopher Watts <kristopher.a.watts@gmail.com>
 * Website : http://webtastic-development.net
 * Github  : https://github.com/uncledozer
 *
}}}*/

/*
 * Openweathermap.org : Not yet implemented
 */

// var opw_key = "b81aa5afc75936a3f6d29f911930ad55"
// var city_id = "5301067"
// var Weather_Url = api.openweathermap.org/data/2.5/forecast/city?id=idhere&APPID=



/*
 * Quick and dirty time function
 * Updates every 250 milleseconds
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

// TODO: Local Storage for saving custom links, colors, location, etc.

/*
 * Default links: https://Webtastic-Development.com,
 *                https://Github.com/UncleDozer
 */

// Get Properties or set Defaults
function getProps(){

    var defaultLinks = [
                            Link( "Webtastic-Development", "https://webtastic-development.net" ),
                            Link( "Github", "https://github.com/uncledozer" ),
                       ];

    var links;
    var colors;
    var fonts;

    function getProps( get, set, defaults ) {

        var localItem = localStorage.getItem( get );

        if ( localItem == null )
            set = defaults;
        else
            set = localItem;
    }

    getProps( "colors", colors /*, defaultColors */ );
    getProps( "links", links, defaultLinks );
    getProps( "fonts", fonts /*, defaultFonts */ );
}

function setProps() {

    function Link( name, address ) {
        this.name    = name;
        this.address = address;
    }

    function Color( foreground, background, target ){
        this.foreground = foreground;
        this.background = background;
        this.target     = target;
    }

    function Font( name, weight, style ){
        this.name   = name;
        this.weight = weight;
        this.style  = style;
    }
}
