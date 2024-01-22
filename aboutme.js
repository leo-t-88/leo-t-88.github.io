var statut = 1
random()
function random(){
    var color1 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    if (color1 === 1){
        color1 = "rgb(158, 208, 255)";
    } else if (color1 === 2){
        color1 = "rgb(246, 155, 255)";
    } else if (color1 === 3){
        color1 = "rgb(161, 255, 138)";
    } else if (color1 === 4){
        color1 = "rgb(216,107,255)";
    } else if (color1 === 5){
        color1 = "rgb(255,139,151)";
    }
        document.querySelector(".header").style.backgroundImage = "linear-gradient(145deg," + color1 + "0%, rgb(255, 216, 163) 100%)";
        document.querySelector(".logoheader").style.backgroundImage = "linear-gradient(145deg," + color1 + "0%, rgb(255, 216, 163) 100%)";
    }
fullminscreen()
function fullminscreen(){
    if (statut == 0){
        document.querySelector(".windowsme").style.width = "100%";
        document.querySelector(".windowsme").style.height = (document.documentElement.scrollHeight - 100) + "px";
        document.querySelector(".windowsme").style.top = "100px";
        document.querySelector(".windowsme").style.borderRadius = "0px";
        document.querySelector(".wintent").style.height = (document.documentElement.scrollHeight - 130) + "px";
        document.getElementById("minmax").src = "https://leo-t-88.github.io/webos/img/maximize.png"
        statut = 1;
    } else {
        document.querySelector(".windowsme").style.width = "90%";
        document.querySelector(".windowsme").style.height = (document.documentElement.scrollHeight - 200) + "px";
        document.querySelector(".windowsme").style.top = "150px";
        document.querySelector(".windowsme").style.borderRadius = "10px";
        document.querySelector(".wintent").style.height = (document.documentElement.scrollHeight - 230) + "px";
        document.getElementById("minmax").src = "https://leo-t-88.github.io/webos/img/maxmin.png"
        statut = 0;
    }
}