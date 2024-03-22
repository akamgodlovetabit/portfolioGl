"use strict";
/**
 * Easy selector helper function
 */

var select = function select(el) {
  var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  try {
    el = el.trim();

    if (all) {
      return Array.from(document.querySelectorAll(el));
    } else {
      return document.querySelector(el);
    }
  } catch (error) {
    console.error("Error in select function:", error);
    return null;
  }
};
/**
 * Easy event listener function
 */


var on = function on(type, el, listener) {
  var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  try {
    var selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach(function (e) {
          return e.addEventListener(type, listener);
        });
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  } catch (error) {
    console.error("Error in on function:", error);
  }
};

var sections = document.querySelectorAll('section');
var navLinks = document.querySelectorAll('header nav .header__nav__item a');

window.onscroll = function () {
  sections.forEach(function (sec) {
    var top = window.scrollY;
    var offset = sec.offsetTop - 150;
    var height = sec.offsetHeight;
    var id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
      });
      document.querySelector("header nav .header__nav__item a[href=\"#".concat(id, "\"]")).classList.add('active');
    }
  }); // Sticky navbar

  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  if (window.scrollY <= 100) {
    header.classList.remove('sticky');
  }
};

var bottom = document.querySelector(".bottom");
var overlay = document.querySelector(".overlay");
var count = 110;
var size = 50;

for (var i = 0; i <= count; i += 1) {
  var dot = document.createElement("div");
  dot.classList.add("dot");
  bottom.appendChild(dot);
}

var dots = Array.from(document.querySelectorAll(".dot"));

var updateText = function updateText(text) {
  Array.from(document.querySelectorAll(".text")).forEach(function (e) {
    return e.innerHTML = text;
  });
};

var reset = function reset() {
  dots.forEach(function (dot, i) {
    var x = i / count * (190 + size) - size / 2;
    var y = Math.random(1) * 52 - size / 2;
    dot.style.width = "".concat(size, "px");
    dot.style.height = "".concat(size, "px");
    dot.style.left = "".concat(x, "px");
    dot.style.top = "".concat(y, "px");
    dot.style.opacity = 1;
    dot.style.transform = "scale(1)";
  });
};

reset();
overlay.addEventListener("click", function () {
  anime({
    easing: "linear",
    targets: document.querySelectorAll(".dot"),
    opacity: [{
      value: 0,
      duration: 600,
      delay: anime.stagger(10)
    }],
    translateX: {
      value: function value() {
        return anime.random(-30, 30);
      },
      duration: 400,
      delay: anime.stagger(10)
    },
    translateY: {
      value: function value() {
        return anime.random(-30, 30);
      },
      duration: 400,
      delay: anime.stagger(10)
    },
    scale: {
      value: function value() {
        return 0;
      },
      duration: 400,
      delay: anime.stagger(10)
    }
  });
  anime({
    easing: "linear",
    delay: 4000,
    complete: function complete() {
      updateText("Submitted");
      setTimeout(function () {
        updateText("Submit");
        reset();
      }, 3000);
    }
  });
}); // let skilsContent = select('.skills-content');
//   if (skilsContent) {
//     new Waypoint({
//       element: skilsContent,
//       offset: '80%',
//       handler: function(direction) {
//         let progress = select('.progress .progress-bar', true);
//         progress.forEach((el) => {
//           el.style.width = el.getAttribute('aria-valuenow') + '%'
//         });
//       }
//     })
//   }
// document.addEventListener('DOMContentLoaded', function() {
//   let skillsContent = document.querySelector('.skills-content');
//   if (skillsContent) {
//       new Waypoint({
//           element: skillsContent,
//           offset: '80%',
//           handler: function(direction) {
//               let progressBars = document.querySelectorAll('.progress .progress-bar');
//               progressBars.forEach((bar) => {
//                   bar.style.width = bar.getAttribute('aria-valuenow') + '%';
//               });
//           }
//       });
//   }
// });

document.addEventListener('DOMContentLoaded', function () {
  var progressBarValues = {
    'HTML': 80,
    'CSS': 70,
    'JavaScript': 60
  };
  var progressBars = document.querySelectorAll('.progress .progress-bar');
  progressBars.forEach(function (bar) {
    var skillName = bar.parentElement.querySelector('.skill').textContent.trim();
    var width = progressBarValues[skillName] + '%';
    bar.style.width = width;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var backToTopButton = document.getElementById('backToTopButton');

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  backToTopButton.addEventListener('click', scrollToTop);

  function toggleBackToTopButtonVisibility() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  }

  window.addEventListener('scroll', toggleBackToTopButtonVisibility);
}); // toggle btn

document.addEventListener('DOMContentLoaded', function () {
  var menuIcon = document.querySelector('#menu-icon');
  var menuContainer = document.querySelector('.navbar');
  var isOpen = false; // Function to toggle the menu

  function toggleMenu() {
    menuContainer.classList.toggle("show");
    isOpen = !isOpen;
  } // Function to close the menu


  function closeMenu() {
    if (isOpen) {
      menuContainer.classList.remove("show");
      isOpen = false;
    }
  } // Toggle menu when menu icon is clicked


  menuIcon.addEventListener('click', toggleMenu); // Close menu when clicking outside of it

  document.addEventListener('click', function (event) {
    var isClickInsideMenu = menuContainer.contains(event.target);
    var isClickOnMenuIcon = menuIcon.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuIcon) {
      closeMenu();
    }
  }); // Close menu when pressing the Escape key

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
});