const defaultTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme :dark)");
let currentTheme = localStorage.getItem('theme')
if (defaultTheme.matches) {
    if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    } else if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    }
}else{
    if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    } else if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    }
}

navigator.getBattery().then((batt) =>{
    updateBattery = () =>{
        let level = Math.floor(batt.level * 100)

        document.getElementById("batterycurent").innerHTML = level + "%";
        if(level <= 10 & batt.charging === false){
            document.getElementById("nob").style.display = "block";
            document.getElementById("qb").style.display = "none";
            document.getElementById("minb").style.display = "none";
            document.getElementById("fullb").style.display = "none";
            document.getElementById("charb").style.display = "none";
        }
        else if(level <= 30 & level > 10 & batt.charging === false){
            document.getElementById("qb").style.display = "block";
            document.getElementById("nob").style.display = "none";
            document.getElementById("minb").style.display = "none";
            document.getElementById("fullb").style.display = "none";
            document.getElementById("charb").style.display = "none";
        }
        else if(level <= 65 & level > 30 & batt.charging === false){
            document.getElementById("minb").style.display = "block";
            document.getElementById("nob").style.display = "none";
            document.getElementById("qb").style.display = "none";
            document.getElementById("fullb").style.display = "none";
            document.getElementById("charb").style.display = "none";
        }
        else if(level <= 100 & level > 65 & batt.charging === false){
            document.getElementById("fullb").style.display = "block";
            document.getElementById("nob").style.display = "none";
            document.getElementById("minb").style.display = "none";
            document.getElementById("qb").style.display = "none";
            document.getElementById("charb").style.display = "none";
        }
        else if(batt.charging){
            document.getElementById("charb").style.display = "block";
            document.getElementById("nob").style.display = "none";
            document.getElementById("minb").style.display = "none";
            document.getElementById("fullb").style.display = "none";
            document.getElementById("qb").style.display = "none";
            console.log(batt.charging)
        }
    }
    updateBattery()

    /* 5. Battery status events */
    batt.addEventListener('chargingchange', () => {updateBattery()})
    batt.addEventListener('levelchange', () => {updateBattery()})
})

var affichageHeure = function(){
    var today, aheures, minutes, deuxChiffres;

    today = new Date();
    deuxChiffres = function(element){
        if(element < 10){
            return element = "0" + element;
        } else {
            return element;
        }
    }
    heures = deuxChiffres(today.getHours());
    minutes = deuxChiffres(today.getMinutes());
    document.getElementById("datecurrent").innerHTML = heures + ":" + minutes;
    setTimeout(affichageHeure, 5000);
}
    affichageHeure();

    if (navigator.onLine) {
    document.getElementById("wifiyes").style.display = "block";
    document.getElementById("wifino").style.display = "none";
    } else {
    document.getElementById("wifino").style.display = "block";
    document.getElementById("wifiyes").style.display = "none";
    }
    window.addEventListener('offline', () => {
    document.getElementById("wifino").style.display = "block";
    document.getElementById("wifiyes").style.display = "none";
    });

    window.addEventListener('online', () => {
    document.getElementById("wifiyes").style.display = "block";
    document.getElementById("wifino").style.display = "none";
});