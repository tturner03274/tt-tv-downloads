const copy = document.querySelector('#copy');
copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#code').textContent);
    copy.textContent = 'Copied';
  } catch {
    const selection = getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#code'));
    selection.removeAllRanges();
    selection.addRange(range);
    copy.textContent = 'Code selected';
  }
});
const links = Array.from(document.querySelectorAll('aside nav a'));
function markChapter() {
  let current = links[0];
  for (const link of links) {
    const section = document.querySelector(link.hash);
    if (section && section.getBoundingClientRect().top < innerHeight * .38) current = link;
  }
  for (const link of links) {
    link.classList.toggle('active', link === current);
    if (link === current) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  }
}
addEventListener('scroll', markChapter, {passive:true});
markChapter();
