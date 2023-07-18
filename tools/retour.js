function retour() {
    document.getElementById("logobox").style.backgroundColor = 'rgba(0,0,0,0)';
    setTimeout(part2,200)
}
function part2(){
    document.body.style.overflow = "hidden";
    document.getElementById("logobox").style.height = '100%';
    document.getElementById("logobox").style.width = '100%';
    document.getElementById("logo1").style.height = "175px";
    document.getElementById("start").style.display = "block";
    document.getElementById("start").style.backgroundColor = 'rgba(0,0,0,1)';
    document.getElementById("start").style.height = "100%";
    document.getElementById("start").style.width = '100%';
    setTimeout(part3,600)
}
function part3(){
    document.getElementById("logo1").style.height = "1px";
    setTimeout(function (){document.location = "../../index.html"},500)
}