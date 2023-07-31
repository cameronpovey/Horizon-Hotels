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

function onload(id){
    //var img = document.getElementById("location")
    document.getElementById("location").style.backgroundImage = "url(static/css/media/"+images[id]+".jpg)"
    document.getElementById("postcard").innerHTML = "Send us a post card from "+refer[id]+"!"
    document.getElementById("loclist").innerHTML = refer[id]

    if (standard > 0){document.getElementById("stanList").style.display = '';}
    if (standou > 0){document.getElementById("stdoList").style.display = '';}
    if (double > 0){document.getElementById("douList").style.display = '';}
    if (family > 0){document.getElementById("famList").style.display = '';}
}