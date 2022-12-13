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

    // document.getElementById("month").innerHTML = months[parseInt(month)];
    
    // if(date === undefined) {
    //     document.getElementById("date_str").innerHTML = weeks[new Date().getDay()];
    // }
    // else {
    //     var m;
    //     if(parseInt(month) == 0 || parseInt(month) == 1) {
    //         m = 11 + parseInt(month);
    //     } else {
    //         m = parseInt(month) - 1;
    //     }
    //     console.log(m);
    //     var first = year.charAt(0) + year.charAt(1);
    //     var last = year.charAt(year.length -1) + year.charAt(year.length - 2);

    //     var day = parseInt(date) + (((13 * m) - 1) / 5) + parseInt(last) + (parseInt(last) / 4) + (parseInt(first) / 4) - (2 * parseInt(first));
    //     console.log(parseInt(day));
    //     day = parseInt(day) % 7;
    //     document.getElementById("date_str").innerHTML = weeks[day];
    // }

    //---option for months---
    var option = "";
    option += `<option value='null' selected>Select Month</option>`;
    for(let i = 0; i < 12; i++) {
        if(i == imonth) {
            option += `<option value=${i}>${months[i]}</option>`;
        }
        else {
            option += `<option value=${i}>${months[i]}</option>`;
        }
        
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
        if(i == today) {
            cells+= `<div class='today' id='cell${i}'>${i}</div>`;
        }
        else {
            cells+= `<div class='notDay' id='cell${i}'>${i}</div>`;
        }
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

//---toggle classes for specific date---
function toggleClasses(date, month, year) {
    
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