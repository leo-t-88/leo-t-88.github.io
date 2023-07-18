document.getElementById("logo1").classList.remove("logo1");
document.getElementById("logo1").style.display = "none";
document.getElementById("logobox").classList.add("logobox");
var load = 0

window.onload = function(){load = 1; document.getElementById("meter").style.display = "none";setTimeout(start, 300)}
function start() {
    document.getElementById("logo1").style.display = "block";
    document.getElementById("logo1").classList.add("lanim");
    setTimeout(part2,650)
}
function part2(){
    document.getElementById("logo1").style.height = '40px';
    document.getElementById("logobox").style.height = '40px';
    document.getElementById("logobox").style.width = '26.6px';
    document.getElementById("start").style.backgroundColor = 'rgba(0,0,0,0)';
    setTimeout(part3,600)
}
function part3(){
    document.body.style.overflow = "visible";
    document.getElementById("logo1").classList.add("logo1")
    document.getElementById("start").style.display = 'none';
    document.getElementById("linkh").href = "./";
    document.body.style.backgroundColor = "var(--bg-color)";
}

setTimeout(function (){
    if(load === 0){
        document.getElementById("meter").style.display = "block";
    }
}, 1000)