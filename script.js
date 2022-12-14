var dt = new Date();
var presentYear = dt.getFullYear();
var presentMonth = dt.getMonth();

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

var weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

showCalender(presentMonth, presentYear);


function showCalender(month, year, date) {
    let imonth = parseInt(month);
    let iyear = parseInt(year)
    let firstDay = new Date(iyear, imonth, 1).getDay();
    var endDate = daysInMonth(iyear, imonth);
    var prevDate = daysInMonth(iyear, imonth - 1);
    var today = new Date().getDate();

    document.getElementById("month").innerHTML = months[parseInt(month)];
    
    if(date === undefined) {
        document.getElementById("date_str").innerHTML = `${weeks[new Date().getDay()]}` + " " + `${today}` + " " + `${iyear}`;
    }
    else {
        var m;
        var y;
        if(imonth == 0 || imonth == 1) {
            m = 11 + imonth;
            y = iyear - 1;
        } else {
            m = imonth - 1;
            y = iyear;
        }
        y = String(y);
        var first = y.charAt(0) + y.charAt(1);
        var last = y.charAt(y.length -2) + y.charAt(y.length - 1);
        var day = parseInt(parseInt(date) + (parseInt((13 * m) - 1) / 5)) ;
        var day1 = parseInt(last) + parseInt(parseInt(last) / 4) + parseInt(parseInt(first) / 4)  - (2 * parseInt(first));
        var day3 = day + day1;
        day3 = parseInt(day3) % 7;
        if(day3 < 0) {
            day3 = day3 + 7;
        }
        document.getElementById("date_str").innerHTML = `${weeks[day3]}` + " " + `${date}` + " " + `${iyear}`;
    }

    //---option for months---
    var option = "";
    option += `<option value='null' selected>Select Month</option>`;
    for(let i = 0; i < 12; i++) {
            option += `<option value=${i}>${months[i]}</option>`;
    }
    document.getElementsByClassName("prev")[0].innerHTML = option;

    //---option for years---
    var opt = "";
    opt += `<option value='null' selected>Select Year</option>`;
    for(let i = 1990; i <= 2030; i++) {
        opt += `<option value=${i}>${i}</option>`;
    }
    document.getElementsByClassName("next")[0].innerHTML = opt;
    

    //---show calender---
    var cells = "";
    for(let x = firstDay; x > 0; x--) {
        cells += `<div class='prev_date'>${(prevDate - x + 1)}</div>`; 
    }

    for(let i = 1; i <= endDate; i++) {
        cells+= `<div class='notDay' id='cell${i}'>${i}</div>`;
    }
    document.getElementsByClassName("days")[0].innerHTML = cells; 
}


//-----days in Months-----
function daysInMonth(iyear, imonth) {
    return 32 - new Date(iyear, imonth, 32).getDate();
}

const curMonth = document.querySelector(".prev");
const curYear = document.querySelector(".next");
const curDate = document.querySelector(".input");
const text = document.querySelector(".para")
const btn = document.querySelector(".btn");

btn.addEventListener('click', setValues);

//---toggle classes for specific date and select specific month  and year---
function toggleClasses(date, month, year) {
    
    for(let i = 0; i < 12; i++) {
        if(i == month) {
            curMonth.getElementsByTagName('option')[(i+1)].selected = 'selected';
        }
    }

    for (var i = 0; i < curYear.options.length; ++i) {
        if (curYear.options[i].text === year)
            curYear.options[i].selected = true;
    }

    var endDate = daysInMonth(year, month);
    for(let i = 1; i <= endDate; i++ ) {
        if(date == i) {
            document.querySelector(`#cell${i}`).classList.add("today");
            document.querySelector(`#cell${i}`).classList.remove("notDay");
        } 
        else {
            document.querySelector(`#cell${i}`).classList.remove("today");
            document.querySelector(`#cell${i}`).classList.add("notDay");
        }
    }
}

//---validating calender---
function setValues() {
    
    var month = curMonth.value; 
    var year = curYear.value;
    var date = curDate.value;
    if(curMonth.value === "null") {
        text.innerHTML = "Please Select Month.";
        return;
    }
    else if(curYear.value === "null") {
        text.innerHTML = "Please Select Year.";
        return;
    }
    else if(date < 0 || date > 31 || date === '') {
        text.innerHTML = "Please Enter Valid Date.";
        return;
    } else {
        text.innerHTML = "";
    }

    showCalender(month, year, date);
    toggleClasses(date, month, year);
    curDate.value = "";
} 