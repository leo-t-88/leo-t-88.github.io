const switchBtn = document.querySelector('#themecheck')
const defaultTheme = window.matchMedia("(prefers-color-scheme :dark)");
let currentTheme = localStorage.getItem('theme')
switchBtn.addEventListener('change', switchTheme)

if (defaultTheme.matches) {
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        switchBtn.checked = false;
    } else if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        switchBtn.checked = true;
    }

} else {
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        switchBtn.checked = false;
    } else if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        switchBtn.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
        console.log(localStorage.getItem('theme'));
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
        console.log(localStorage.getItem('theme'));
    }
}

function menu(){
    document.getElementById("close").style.display = 'block';
    document.getElementById("bar").style.display = 'none';
}
function menu2(){
    document.getElementById("bar").style.display = 'block';
    document.getElementById("close").style.display = 'none';
}