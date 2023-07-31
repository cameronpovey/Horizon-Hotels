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

var map = ['https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69255.55324579588!2d-2.195067157758541!3d57.15012208068666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48841048ae116a8d%3A0x572fe6cf08419e9e!2sNorwood%20Hall%20Hotel!5e0!3m2!1sen!2suk!4v1650062709177!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36998.31669969227!2d-5.9630332453302755!3d54.579417341231384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486108f9b189b835%3A0x3dbb9e1b46ef4374!2sClayton%20Hotel%20Belfast!5e0!3m2!1sen!2suk!4v1650064917186!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19441.863591579226!2d-1.904795021458884!3d52.47491779782379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc91e11e1055%3A0x2528b0de09af119!2sHoliday%20Inn%20Express%20Birmingham%20-%20Snow%20Hill%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2suk!4v1650123384017!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9944.697752250497!2d-2.6066437085532512!3d51.45495364498002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718e6448caba2d%3A0xe614a705af362af0!2sibis%20Bristol%20Temple%20Meads%20Quay!5e0!3m2!1sen!2suk!4v1650123290352!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39751.49588579179!2d-3.2444774225305!3d51.48626973322461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486e1cc7ce415583%3A0xcc82fee501caeb17!2sMercure%20Cardiff%20Holland%20House%20Hotel%20%26%20Spa!5e0!3m2!1sen!2suk!4v1650123421155!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35751.23618339956!2d-3.282884432957029!3d55.94153285364334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4887c78e4949738f%3A0x75526771363b2f96!2sMotel%20One%20Edinburgh%20Princes!5e0!3m2!1sen!2suk!4v1650123441816!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8956.267957945378!2d-4.263718156131522!3d55.86150413129841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4888469c3ce6b1f3%3A0xbbdada611fdf447!2sMotel%20One!5e0!3m2!1sen!2suk!4v1650123465562!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39730.513380530305!2d-0.13772117232384684!3d51.51033400602329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b33203b0783%3A0x18d75456e054c5bb!2sImperial%20Hotel!5e0!3m2!1sen!2suk!4v1650123486455!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18995.39694356733!2d-2.251745669267506!3d53.478742510413845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb1bfed2f4b1f%3A0xa16eaf80abfa8b93!2sBritannia%20Hotel%20Manchester!5e0!3m2!1sen!2suk!4v1650123516816!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18317.054331973293!2d-1.624025115929212!3d54.979556070540255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e70d9090db81b%3A0xd8dd05e0990fcc6c!2sThe%20Caledonian%20Hotel!5e0!3m2!1sen!2suk!4v1650123533536!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38742.16281410161!2d1.2455969374217681!3d52.6349538284624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d9e3ed34e1bc69%3A0xb32adbf28cf8b8ab!2sHoliday%20Inn%20Norwich%20City!5e0!3m2!1sen!2suk!4v1650123555617!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38455.46777814933!2d-1.2228836097471234!3d52.95801770920527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c22523b4aebf%3A0x174bbf512efc5350!2sHoliday%20Inn%20Nottingham%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2suk!4v1650123582100!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79034.75477776336!2d-1.313666281726462!3d51.7543208047317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c0e24df0443d%3A0x307c3a00670a3268!2sHampton%20by%20Hilton%20Oxford!5e0!3m2!1sen!2suk!4v1650123600154!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10181.31139118461!2d-4.138461459147894!3d50.36044096395675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486c935274f6df1d%3A0xa2182843b52b9d9e!2sCrowne%20Plaza%20Plymouth%2C%20an%20IHG%20Hotel!5e0!3m2!1sen!2suk!4v1650123626283!5m2!1sen!2suk',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19814.959572569784!2d-3.965506428445217!3d51.625591469454214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486e8aca4223ea87%3A0x927675fd7a0f0c1b!2sSwansea%20Marriott%20Hotel!5e0!3m2!1sen!2suk!4v1650123665968!5m2!1sen!2suk'];

function onload(hotel) {
    var hoteltitle = document.getElementById("hoteltitle");
    var hotelback = document.getElementById("hotelback");
    var hotelmap = document.getElementById("hotelmap");

    hotelback.src = "static/css/media/"+images[hotel]+".jpg";
    hotelmap.src = map[hotel]

    //load date info
    var date = new Date();
    var startDate = new Date(document.getElementById("startDate").value);

    var discount = document.getElementById("discount"); 

    var diffDays = parseInt((startDate-date) / (24 * 3600 * 1000));

    //more than 90 cant book!!!!
    if (diffDays >= 80 && diffDays <= 90)       {discount.innerHTML = 20+"%"}
    else if (diffDays >= 60 && diffDays <= 79)  {discount.innerHTML = 10+"%"}
    else if (diffDays >= 45 && diffDays <= 59)  {discount.innerHTML = 5+"%"}
    else {discount.innerHTML = "No discount"}

    var month = parseInt(startDate.getMonth())+1
    var peaks = document.getElementById("peaks");

    if (month >= 4 && month <= 9){
        peaks.innerHTML = "You have selected times within the peak season - this increases the price of the booking";
        peaks.className = 'alert alert-warning w-50';
    }
    else{
        peaks.innerHTML = "You have selected times within the off-peak season - reducing the price of your booking";
        peaks.className = 'alert alert-success w-50';
    }

    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("startDate")[0].setAttribute('min', today);

    var nights = parseInt(document.getElementById("nights").value);
    var value = document.getElementById("startDate").value 

    var date = new Date(value);
    value = date.addDays(nights)

    var day = parseInt(value.getDate());
    if (day < 10){day = '0'+day}
    var month = value.getMonth()+1;
    if (month < 10){month = '0'+month}
    var year = parseInt(value.getFullYear());
    var value = (day+"/"+month+"/"+year)

    document.getElementById("outDate").innerHTML = value;
    cost()
}

function roomcount(){
    standard = parseInt(document.getElementById("standard").value);
    standardtwo = parseInt(document.getElementById("standardtwo").value);
    double = parseInt(document.getElementById("double").value);
    family = parseInt(document.getElementById("family").value);

    var alert = document.getElementById("alert");
    var guestcount = document.getElementById("guestcount");
    var people = parseInt(document.getElementById("people").value);

    sum = standard+standardtwo*2+double*2+family*6

    if (sum < people){
        alert.style.display = 'inline';
        guestcount.innerHTML = "You only have room for "+sum+" guests";
        document.getElementById("nextBut").disabled = true;
    }
    else{
        alert.style.display = 'none';
        document.getElementById("nextBut").disabled = false;
    }
    cost()
}

function addis(value){

if (value == null){
    var value = document.getElementById("startDate").value
}
else {
    var date = new Date();
    var startDate = new Date(value);

    var discount = document.getElementById("discount"); 

    var diffDays = parseInt((startDate-date) / (24 * 3600 * 1000));

    //more than 90 cant book!!!!
    if (diffDays >= 80 && diffDays <= 90)       {discount.innerHTML = 20+"%"}
    else if (diffDays >= 60 && diffDays <= 79)  {discount.innerHTML = 10+"%"}
    else if (diffDays >= 45 && diffDays <= 59)  {discount.innerHTML = 5+"%"}
    else {discount.innerHTML = "No discount"}

    var month = parseInt(startDate.getMonth())+1
    var peaks = document.getElementById("peaks");

    if (month >= 4 && month <= 9){
        peaks.innerHTML = "You have selected times within the peak season - this increases the price of the booking";
        peaks.className = 'alert alert-warning w-50';
    }
    else{
        peaks.innerHTML = "You have selected times within the off-peak season - reducing the price of your booking";
        peaks.className = 'alert alert-success w-50';
    }
    cost();
}

    var nights = parseInt(document.getElementById("nights").value);
    var date = new Date(value);

    value = date.addDays(nights)

    var day = parseInt(value.getDate());
    if (day < 10){day = '0'+day}
    var month = value.getMonth()+1;
    if (month < 10){month = '0'+month}
    var year = parseInt(value.getFullYear());
    var value = (day+"/"+month+"/"+year)

    var invis = (year+"-"+month+"-"+day)
    document.getElementById("invisEnd").setAttribute('value', invis);

    document.getElementById("outDate").innerHTML = value;
    }

    Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
    cost()
}

function cost(){
    //peak/offpeak int
    var value = document.getElementById("startDate").value
    var startDate = new Date(value);

    var month = parseInt(startDate.getMonth())+1
    if (month >= 4 && month <= 9){rate = peak}
    else{rate = offpeak}
    //nights int
    var nights = parseInt(document.getElementById("nights").value);

    //discount int%
    date = new Date()
    var startDate = new Date(document.getElementById("startDate").value);
    var diffDays = parseInt((startDate-date) / (24 * 3600 * 1000));
    if (diffDays >= 80 && diffDays <= 90)       {discount = 20}
    else if (diffDays >= 60 && diffDays <= 79)  {discount = 10}
    else if (diffDays >= 45 && diffDays <= 59)  {discount = 5}
    else {discount = 0}
    discount = discount/100

    //roomsta
    var standard = parseInt(document.getElementById("standard").value);
    //roomstadou
    var standardtwo = parseInt(document.getElementById("standardtwo").value);
    //roomdou
    var double = parseInt(document.getElementById("double").value);
    doublelist = document.getElementById("double")
    //rommfam
    var family = parseInt(document.getElementById("family").value);
    familylist = document.getElementById("family")

    //calculate
    stan = (parseInt(rate)+(rate*(stanrate/100)))*standard
    stantwo = (parseInt(rate)+(rate*(stantworate/100)))*standardtwo
    dou = (parseInt(rate)+(rate*(doublerate/100)))*double
    fam = (parseInt(rate)+(rate*(familyrate/100)))*family

    total = (stan+stantwo+dou+fam)*nights
    totaldis = total-(total*discount)

    standardlist = document.getElementById("standardlist")
    standardtwolist = document.getElementById("standardtwolist")
    doublelist  = document.getElementById("doublelist")
    familylist  = document.getElementById("familylist")

    if (standard>0){standardlist.style.display = ''}
    else if (standard==0){standardlist.style.display = 'none'}

    if (standard>0){
        standardlist.style.display = '';
        document.getElementById("StanList").innerHTML = "+ £"+stan;}
    else if (standardtwo==0){standardlist.style.display = 'none'}

    if (standardtwo>0){
        standardtwolist.style.display = '';
        document.getElementById("sTList").innerHTML = "+ £"+stantwo;}
    else if (standardtwo==0){standardtwolist.style.display = 'none'}

    if (double>0){
        doublelist.style.display = '';
        document.getElementById("DouList").innerHTML = "+ £"+dou;}
    else if (standardtwo==0){standardtwolist.style.display = 'none'}

    if (family>0){
        familylist.style.display = '';
        document.getElementById("FamList").innerHTML = "+ £"+fam;}
    else if (standardtwo==0){familylist.style.display = 'none'}

    disList = document.getElementById("disList")

    document.getElementById("perNight").innerHTML = "£"+(stan+stantwo+dou+fam);
    document.getElementById("subPrice").innerHTML = "£"+total;
    document.getElementById("adDisList").innerHTML = "- £"+parseFloat(total*discount).toFixed(2);
    if (discount==0){disList.className = "text-center table-warning"}
    else{disList.className = "text-center table-success"}
    document.getElementById("total").innerHTML = "£"+parseFloat(totaldis).toFixed(2);
}