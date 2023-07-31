/*
    Website Development and Databases
    Horizon Hotels
    Cameron Povey
    21011010
*/
function bookchange(id){
    document.getElementById("findbook").href="/admin/getbook/"+id
}
function userchange(id){
    document.getElementById("finduser").href="/admin/getuser/"+id
}
function onload(){
    if (bookid != null){
        document.getElementById("revbook").href="/admin/removebook/"+bookid
        document.getElementById("clearbook").href="/admin/clear/0"
    }
    if (userid != null){
        document.getElementById("revuser").href="/admin/removeuser/"+userid
        document.getElementById("clearuser").href="/admin/clear/0"
    }
}