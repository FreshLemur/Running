const hero = document.querySelector('.hero');

createObserver();
function createObserver() {
  const options = {
    root: null,
    rootMargin: '0px',
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(hero);
}

function handleIntersect(entries) {
  console.log(entries);

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      hero.classList.add('hero--visible');
    } else {
      hero.classList.remove('hero--visible');
    }
  });
}
