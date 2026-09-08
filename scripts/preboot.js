/* paint the pre-boot frame in the visitor's saved scheme so returning
   dark-mode users don't get a light flash on slow connections */
try {
  if (localStorage.getItem('ts-ed-dark') === '1')
    document.documentElement.classList.add('ts-preboot-dark');
} catch (e) {}
