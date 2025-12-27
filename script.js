const hero = document.querySelector('.hero');
const strideTogether = document.querySelector('.stride-together');
const strideTogetherContainer = document.querySelector('.stride-together__container');
const raisedContent = document.querySelector('.raised__content');
const cta = document.querySelector('.cta');
const footer = document.querySelector('.footer');
const footerTitle = document.querySelector('.footer__title');

createObserver(hero);
createObserver(strideTogether, '0px 0px -2% 0px');
createObserver(strideTogetherContainer, '0px', 1);
createObserver(raisedContent, '0px', 1, animateValue);
createObserver(cta, '0px', 0.7);
createObserver(footer, '0px', 0.2);
createObserver(footerTitle, '0px', 0.3);

function createObserver(block, customMargin, customThreshold, customFunction) {
  const options = {
    rootMargin: customMargin || '0px',
    threshold: customThreshold || 0,
  };

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      const target = entry.target;

      if (entry.isIntersecting) {
        target.classList.add(`${target.classList[0]}--visible`);
        observer.unobserve(target);
        customFunction && customFunction();
      } else {
        target.classList.remove(`${target.classList[0]}--visible`);
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(block);
}

// Animated counting for the "30k Raised" heading
function animateValue() {
  const raisedHeading = document.querySelector('.raised__heading');
  let startTimestamp = null;
  const startValue = 0;
  const targetValue = 30000;
  const duration = 2000;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    // Calculate the current number
    const currentNumber = Math.floor(progress * (targetValue - startValue) + startValue);

    // This turns 30000 into "30K" once finished
    if (currentNumber >= 1000) {
      raisedHeading.innerHTML = (currentNumber / 1000).toFixed(0) + 'K Raised';
    }
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}
