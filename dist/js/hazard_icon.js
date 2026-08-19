// hazard-icon.js
let hazardIconMap = null;

document.body.insertAdjacentHTML('afterbegin', `
  <svg style="display:none">
    <symbol id="hazard-triangle" viewBox="0 0 22 20">
      <path d="M11 1.5 L20.5 18.5 L1.5 18.5 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </symbol>
  </svg>
`);


async function loadHazardIconMap() {
  if (hazardIconMap) return hazardIconMap;
  const res = await fetch('js/data/hazard_icon_mapping.json');
  const list = await res.json();
  hazardIconMap = Object.fromEntries(list.map(item => [item.event_cd, item]));
  return hazardIconMap;
}

async function fillHazardIcon(el) {
  const eventCd = el.dataset.eventCd;
  const map = await loadHazardIconMap();
  const info = map[eventCd] || {};
  const iconFile = info.iconFile || 'DEFAULT.png';
  const level = info.level || 'info';

  el.classList.add(`hazard-icon--${level}`);
  el.insertAdjacentHTML('beforeend',
    `<img class="hazard-icon__glyph" src="images/hazard_icon/${iconFile}" alt="${info.event || eventCd}">
    <svg class="hazard-icon__triangle" viewBox="0 0 22 20">
      <use href="#hazard-triangle"/>
    </svg>`
  );
}

document.querySelectorAll('.hazard-icon[data-event-cd]').forEach(fillHazardIcon);