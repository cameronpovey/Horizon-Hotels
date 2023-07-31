/*
    Website Development and Databases
    Horizon Hotels
    Cameron Povey
    21011010
*/
var images = ['aberdeen',
'belfast',
'birmingham',
'bristol',
'cardiff',
'edinburgh',
'glasgow',
'london',
'manchester',
'newcastle',
'norwich',
'nottingham',
'oxford',
'plymouth',
'swansea'];
var refer = ['Aberdeen',
'Belfast',
'Birmingham',
'Bristol',
'Cardiff',
'Edinburgh',
'Glasgow',
'London',
'Manchester',
'Newcastle',
'Norwich',
'Nottingham',
'Oxford',
'Plymouth',
'Swansea'];
var descriptions = [
    'Located in North East Scotland, Aberdeen is a thriving coastal town with a range of activities, sites and places to vist.',
    'This Nothern Ireland city, boasts a rich culture and is full of great views and activies to partake in.',
    'Birmingham, the west midlands county, known as the second city of the United Kingdom is a must see place for everyone.',
    'Bristol is located on the west coast of england and is home to a city full of rich culture and educational institutes.',
    'As the largest city in wales, Cardiff offers a wide range of attractions for you and your family.',
    'Edinburgh, the capital city of Scotland, is a cultural hub for tourists and has many sites you must see.',
    'The ever growing city of Belfast is a Scottish city offering a range of activities.',
    'London, the capital of england is an absolute must see and offers anything you could ever want to do.',
    'Manchester is a great city for architechture and has various sporting teams who are a joy to watch.',
    'Newcastle upon Tyne is a major economic hub and is full of tourist opportunities',
    'Norwich, based in Norfolk, England is a quaint city and offers range of activites and opportunities',
    'Nottingham is a major town for various sports and is a hub for historical wonders.',
    'Oxford holds the oldest university in engkand and hold a very early class form of architecture',
    'Plymouth is located on the south coast of devon and has a rich history to its name.',
    'Swansea is home to a wide range of attractions for all ages and offers many activities.'
];
var links = [
    'https://www.visitabdn.com',
    'https://visitbelfast.com',
    'https://visitbirmingham.com',
    'https://visitbristol.co.uk',
    'http://www.visitcardiff.com',
    'https://edinburgh.org',
    'https://www.visitglasgow.net',
    'https://visitlondon.com',
    'https://www.visitmanchester.com',
    'http://www.visitnewcastle.com',
    'https://www.visitnorwich.co.uk',
    'https://www.visit-nottinghamshire.co.uk',
    'https://www.visitoxford.org',
    'https://www.visitplymouth.co.uk',
    'https://www.visitswanseabay.com'
];
//11



function changeback(id) {
    var img = document.getElementById("form");
    var sel = document.getElementById("book");
    
    //change images
    img.style.backgroundImage = "url(static/css/media/"+images[id]+".jpg)";

    //text on box
    sel.innerHTML = refer[id]+" is awaiting";

    //move postion to show bottom of image
    img.style.backgroundPosition="bottom";
}

function modaltitle(id) {
    var title = document.getElementById("modalh");
    var cap = document.getElementById("modaldesc");
    var img = document.getElementById("modalimg");
    var but = document.getElementById("modalbutton");

    //change modal image
    img.src = "static/css/media/"+images[id]+".jpg";

    //change modal title
    title.innerHTML = refer[id];

    //change modal caption
    cap.innerHTML = descriptions[id];

    but.setAttribute('href', links[id])

    //change button text
    but.innerHTML = "Find out what "+refer[id]+" has to offer";
}

/*
var date = new Date();
var currentDate = (date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear());
document.getElementsByName("dateSelSta").setAttribute('min', currentDate);
document.getElementsByName("dateSelEnd").setAttribute('min', parseInt(currentDate)+1);*/



function onload() {
    var date = new Date();
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("startDate")[0].setAttribute('min', today);
    //today = (date.addDays(90));
    //document.write(today)
    //document.getElementsByName("startDate")[0].setAttribute('max', today)
    document.getElementsByName("startDate")[0].setAttribute('value', today);

    today = (date.addDays(1));
    
    var day = parseInt(today.getDate());
    if (day < 10){day = '0'+day}
    var month = today.getMonth()+1;
    if (month < 10){month = '0'+month}
    var year = parseInt(today.getFullYear());
    var today = (day+"/"+month+"/"+year)
    document.getElementById("outDate").innerHTML = today;
}


function datestart(value) {

    if (value == null){
        var value = document.getElementById("dateSelSta").value
    }

    var nights = parseInt(document.getElementById("nightSel").value);
    var date = new Date(value);
    value = date.addDays(nights)

    var day = parseInt(value.getDate());
    if (day < 10){day = '0'+day}
    var month = value.getMonth()+1;
    if (month < 10){month = '0'+month}
    var year = parseInt(value.getFullYear());
    var value = (day+"/"+month+"/"+year)

    document.getElementById("outDate").innerHTML = value;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}