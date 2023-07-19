const switchBtn = document.querySelector('#themecheck')
const defaultTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme :dark)");
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
    document.getElementById("stmartmenu").classList.add("menumobileon");
}
function menu2(){
    document.getElementById("bar").style.display = 'block';
    document.getElementById("close").style.display = 'none';
    document.getElementById("stmartmenu").classList.remove("menumobileon");
}

// Age
var birthDate = "2006-07-07";
var today = new Date();
var birthDate = new Date(birthDate);
var age = today.getFullYear() - birthDate.getFullYear();
var monthDiff = today.getMonth() - birthDate.getMonth();
var dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
        monthDiff += 12;
      }

if (dayDiff < 0) {
    monthDiff--;
    var daysInLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    dayDiff += daysInLastMonth;
  }
document.getElementById("age").innerHTML = " " + age + " ans";

document.getElementById("copyright").innerHTML = "Tout droit réservé - ©Léo.t88 2022 - " + today.getFullYear();

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
  
      if (elementTop < windowHeight) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);

  $(document).ready(function(){
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
          
        });
      }
    });
  });

// Transition part
jQuery(function(){
  $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 1950 ){
          $('.part2').css('opacity','1');
          $('.part4').css('background-color','var(--menu-color)');
          }else if ($(this).scrollTop() > 1600 ){
              $('.part2').css('opacity','1');
              $('.part4').css('background-color','var(--bg-color)');
          }else if ($(this).scrollTop() > 200 ) { 
              $('.part2').css('opacity','1');
              $('.part4').css('background-color','var(--bg-color)');
          } else { 
            $('.part2').css('opacity','0');
          }
      });
  });
});
jQuery(function(){
  $(function () {
      $(window).scroll(function () {
          if ($(this).scrollTop() > 500 ) { 
              $('#scrollUp').css('display','block');
          } else { 
              $('#scrollUp').css('display','none');
          }
      });
  });
});