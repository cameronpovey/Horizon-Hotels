/*
    Website Development and Databases
    Horizon Hotels
    Cameron Povey
    21011010
*/
var currency = ["£", "€", "$"];

function email(id){
    document.getElementById("select").style.display = 'none';
    document.getElementById("email").style.display = '';
    document.getElementById("label").innerHTML= "Enter your "+id+" E-mail adress";
}
function change(id){
    forward = document.getElementById("emailsub")
    if (id == 0){total=uktotal}
    else if (id == 1){total=eutotal}
    else if (id == 2){total=ustotal}
    forward.href = "/confirmation/"+id
    document.getElementById("totaldis").innerHTML = "Payment due: "+currency[id]+(total.toFixed(2))
}
mailstruc = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

function check(value){
    if(value.match(mailstruc)){
        document.getElementById("emailsub").className = "btn btn-primary"
        document.getElementById("alert").style.display = 'none';
    }
    else{
        document.getElementById("emailsub").className = "btn btn-primary disabled"
        document.getElementById("alert").style.display = 'inline';
    }
}
function submit(){
    document.getElementById("payform").submit();
}