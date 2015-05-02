// var opw_key = "b81aa5afc75936a3f6d29f911930ad55"
// var city_id = "5301067"
// var Weather_Url = api.openweathermap.org/data/2.5/forecast/city?id=idhere&APPID=

function time(){
    var dt          = document.querySelector('.cur_date');
    var da          = document.querySelector('.cur_day');
    var ho          = document.querySelector('.hours');
    var mi          = document.querySelector('.minutes');
    var se          = document.querySelector('.seconds');

    var d           = new Date();

    var hours       = d.getHours();
    var minutes     = d.getMinutes();
    var seconds     = d.getSeconds();

    var day         = d.getDay();
    var date        = d.getDate();
    var month       = d.getMonth();
    var year        = d.getFullYear();

    var days        = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months      = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var cur_day     = d.getDate();
    var cur_month   = months[month];
    var cur_weekday = document.createTextNode(days[day]);


    function zeros(target){
        var t = target;
        if (target < 10){
            t = '0' + t;
        }else {
            t = t + '';
        }
        return t;
    }

    var cur_ho     = zeros(hours);
    var cur_min    = zeros(minutes);
    var cur_sec    = zeros(seconds);


    var cur_hour   = document.createTextNode(cur_ho);
    var cur_minute = document.createTextNode(cur_min);
    var cur_second = document.createTextNode(cur_sec);

    var cur_date   = document.createTextNode(cur_month + ' ' + cur_day + ', ' + year);


    // Clear the Clock
    ho.innerHTML = "";
    mi.innerHTML = "";
    se.innerHTML = "";

    // Repopulate Clock
    ho.appendChild(cur_hour);
    mi.appendChild(cur_minute);
    se.appendChild(cur_second);

    // Clear Date
    dt.innerHTML = "";
    da.innerHTML = "";

    // Repopulate Date
    dt.appendChild(cur_date);
    da.appendChild(cur_weekday);

}

var interval = window.setInterval(time,250);
