/*
    Website Development and Databases
    Horizon Hotels
    Cameron Povey
    21011010
*/
bookingID = []
hotelID = []
orderDate = []
startDate = []
endDate = []
people = []
curr = []
cost = []
standard = []
standou = []
double = []
family = []
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

function onload(bookingID,hotelID){
    for (i=0; i < bookingID.length; i++){
        document.getElementById("location"+i).style.backgroundImage = "url(static/css/media/"+images[hotelID[i]]+".jpg)"
        document.getElementById("postcard"+i).innerHTML = "Send us a post card from "+refer[hotelID[i]]
        document.getElementById("postbook"+i).innerHTML = "Booking number: #"+bookingID[i]
    }
}

function bookingmodal(select,bookingID,hotelID,orderDate,startDate,endDate,people,curr,cost,standard,standou,double,family){
    window.select = select
    document.getElementById("modalh").innerHTML = "Your "+refer[hotelID[select]]+" booking"
    document.getElementById("modalp").innerHTML = "Booking Number: #"+bookingID[select]
    document.getElementById("modalheader").style.backgroundImage = "url(static/css/media/"+images[hotelID[select]]+".jpg)"
    document.getElementById("orderDate").innerHTML = orderDate[select]
    document.getElementById("startDate").innerHTML = startDate[select]
    document.getElementById("endDate").innerHTML = endDate[select]
    document.getElementById("people").innerHTML = people[select]
    document.getElementById("cost").innerHTML = cost[select]+" "+curr[select]
    document.getElementById("standard").innerHTML = standard[select]
    document.getElementById("standou").innerHTML = standou[select]
    document.getElementById("double").innerHTML = double[select]
    document.getElementById("family").innerHTML = family[select]
}
function cancel(bookingID,hotelID,orderDate,startDate,endDate,people,curr,cost,standard,standou,double,family){
    document.getElementById("confirm").href="/cancel/"+bookingID[select]
    
    start = startDate[select].split("-").reverse().join("-");
    start = new Date(start)

    today = new Date()
    
    document.getElementById("details").style.display = "none";
    document.getElementById("cancelmod").style.display = "";
    document.getElementById("canbook").style.display = "none";
    
    var diffDays = parseInt((start-today) / (24 * 3600 * 1000));

    document.getElementById("adv").innerHTML = "You're cancelling "+diffDays+" days in advance"

    if (diffDays >= 60){
        document.getElementById("info").className = "alert alert-success"
        document.getElementById("para").innerHTML = "Cancelling "+diffDays+" days in advance will return you with a full refund of "+cost[select]+" "+curr[select]
    }
    else if (diffDays > 30 && diffDays < 60){
        document.getElementById("info").className = "alert alert-warning"
        document.getElementById("para").innerHTML = "Cancelling "+diffDays+" days in advance will return you with a 50% refund of "+cost[select]/2+" "+curr[select]
    }
    else {
        document.getElementById("info").className = "alert alert-danger"
        document.getElementById("para").innerHTML = "Cancelling "+diffDays+" days in advance will return you with no refund of 0 "+curr[select]
    }
}
function reset(){
    document.getElementById("details").style.display = "";
    document.getElementById("cancelmod").style.display = "none";
    document.getElementById("canbook").style.display = "";
}