document.body.style.overflow = "hidden";
document.getElementById("logo1").classList.remove("logo1");
document.getElementById("logo1").style.display = "none";
document.getElementById("logo2").style.display = "none";
document.getElementById("logobox").classList.add("logobox");

window.onload = function start() {
    document.getElementById("logo1").style.display = "block";
    document.getElementById("logo1").classList.add("lanim");
    setTimeout(part2,650)
    function part2(){
        document.getElementById("logo1").style.height = '40px';
        document.getElementById("logobox").style.height = '8%';
        document.getElementById("logobox").style.width = '4%';
        document.getElementById("start").style.backgroundColor = 'rgba(0,0,0,0)';
        setTimeout(part3,600)
    }
}
function part3(){
    document.body.style.overflow = "visible";
    document.getElementById("logo1").classList.add("logo1")
    document.getElementById("start").style.display = 'none';
    document.getElementById("logo2").style.display = "block";
    document.getElementById("logo1").style.display = "none";
    document.getElementById("logobox").style.display = "none";
}