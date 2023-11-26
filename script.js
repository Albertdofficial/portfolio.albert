
// Constructor function
const Typewirter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 0);
  this.type();
  this.isDeleting = false;
};

// Type method
Typewirter.prototype.type = function () {
  // Get index of current word
  const currentIndex = this.wordIndex % this.words.length;

  // Get full text of current word
  const fullTxt = this.words[currentIndex];

  // Check if in deleting state
  if (this.isDeleting) {
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into the element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete, increase typeSpeed
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;

    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    // Set delete to false
    this.isDeleting = false;

    // Move to next word
    this.wordIndex++;

    // Pause before start typing
    typeSpeed = 200;
  }

  //run a setTimeout
  setTimeout(() => this.type(), typeSpeed);
};

// Init on Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  // Init TypeWriter
  new Typewirter(txtElement, words, wait);
}

///////////////////////////////////////////
// SLİDER
const imgs = document.getElementById('imgs');
// const leftBtn = document.getElementById('left');
// const rightBtn = document.getElementById('right');



const img = document.querySelectorAll('#imgs img');

let idx = 0;

let interval = setInterval(run, 5000);

function run() {
  idx++;

  changeImage();
}

function changeImage() {
  if (idx > img.length - 1) {
    // if we at the end
    idx = 0; // go back to the beginning
  } else if (idx === 0) {
    // if we are at the beginning
    idx = img.length - 1; //set idx to the end
  }

  imgs.style.transform = `translateX(${-idx * 400}px)`;
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 5000);
}

// rightBtn.addEventListener('click', () => {
//   idx++;
//   changeImage();
//   resetInterval();
// });

// leftBtn.addEventListener('click', () => {
//   idx--;
//   changeImage();
//   resetInterval();
// });
