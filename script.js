"use strict";

/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
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
const on = (type, el, listener, all = false) => {
  try {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  } catch (error) {
    console.error("Error in on function:", error);
  }
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav .header__nav__item a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      document.querySelector(`header nav .header__nav__item a[href="#${id}"]`).classList.add('active');
    }
  });

  // Sticky navbar
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);
  if (window.scrollY <= 100) {
    header.classList.remove('sticky');
  }
};


const bottom = document.querySelector(".bottom");
const overlay = document.querySelector(".overlay");
const count = 110;
const size = 50;
for (let i = 0; i <= count; i += 1) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  bottom.appendChild(dot);
}
const dots = Array.from(document.querySelectorAll(".dot"));

const updateText = (text) => {
  Array.from(document.querySelectorAll(".text")).forEach(
    (e) => (e.innerHTML = text)
  );
};

const reset = () => {
  dots.forEach((dot, i) => {
    const x = (i / count) * (190 + size) - size / 2;
    const y = Math.random(1) * 52 - size / 2;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.opacity = 1;
    dot.style.transform = "scale(1)";
  });
};
reset();

overlay.addEventListener("click", () => {
  anime({
    easing: "linear",
    targets: document.querySelectorAll(".dot"),
    opacity: [{ value: 0, duration: 600, delay: anime.stagger(10) }],
    translateX: {
      value: function () {
        return anime.random(-30, 30);
      },
      duration: 400,
      delay: anime.stagger(10)
    },
    translateY: {
      value: function () {
        return anime.random(-30, 30);
      },
      duration: 400,
      delay: anime.stagger(10)
    },
    scale: {
      value: function () {
        return 0;
      },
      duration: 400,
      delay: anime.stagger(10)
    }
  });
  anime({
    easing: "linear",
    delay: 4000,
    complete: () => {
      updateText("Submitted");
      setTimeout(() => {
        updateText("Submit");
        reset();
      }, 3000);
    }
  });
});

// let skilsContent = select('.skills-content');
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

document.addEventListener('DOMContentLoaded', function() {
  let progressBarValues = {
      'HTML': 80,
      'CSS': 70,
      'JavaScript': 60,
      
  };

  let progressBars = document.querySelectorAll('.progress .progress-bar');

  progressBars.forEach((bar) => {
      let skillName = bar.parentElement.querySelector('.skill').textContent.trim();
      let width = progressBarValues[skillName] + '%';
      bar.style.width = width;
  });
});


  document.addEventListener("DOMContentLoaded", function() {
    const backToTopButton = document.getElementById('backToTopButton');
  
    
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
  });
  


// toggle btn

document.addEventListener('DOMContentLoaded', function() {
  let menuIcon = document.querySelector('#menu-icon');
  let menuContainer = document.querySelector('.navbar');
  let isOpen = false;

  // Function to toggle the menu
  function toggleMenu() {
      menuContainer.classList.toggle("show");
      isOpen = !isOpen;
  }

  // Function to close the menu
  function closeMenu() {
      if (isOpen) {
          menuContainer.classList.remove("show");
          isOpen = false;
      }
  }

  // Toggle menu when menu icon is clicked
  menuIcon.addEventListener('click', toggleMenu);

  // Close menu when clicking outside of it
  document.addEventListener('click', function(event) {
      const isClickInsideMenu = menuContainer.contains(event.target);
      const isClickOnMenuIcon = menuIcon.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnMenuIcon) {
          closeMenu();
      }
  });

  // Close menu when pressing the Escape key
  document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
          closeMenu();
      }
  });
});

