// COLOR SWATCHES
function createColorSwatch(color, isAddNew = false) {
  const swatch = document.createElement('div');
  swatch.className = 'color-swatch';

  if (isAddNew) {
    swatch.innerHTML = `
      <div class="color-swatch-inner" style="background:repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 2px, transparent 2px, transparent 8px)">
        <input
          type="color"
          value="#ffffff"
          style="opacity:0;width:100%;height:100%;cursor:pointer;"
        />
      </div>
      <div class="color-swatch-info">
        <span class="color-hex">+ add</span>
        <input class="color-name-input" type="text" placeholder="name" />
      </div>
    `;

    const picker = swatch.querySelector('input[type="color"]');
    picker.addEventListener('change', function () {
      const inner = swatch.querySelector('.color-swatch-inner');
      const hex = swatch.querySelector('.color-hex');
      inner.style.background = this.value;
      hex.textContent = this.value;
    });

    return swatch;
  }

  swatch.innerHTML = `
    <div class="color-swatch-inner" style="background:${color}"></div>
    <div class="color-swatch-info">
      <span class="color-hex">${color}</span>
      <input class="color-name-input" type="text" placeholder="name this colour" />
    </div>
  `;

  const picker = document.createElement('input');
  picker.type = 'color';
  picker.value = color;
  picker.style.cssText =
    'position:absolute;opacity:0;width:100%;height:70%;top:0;left:0;cursor:pointer;';

  picker.addEventListener('input', function () {
    swatch.querySelector('.color-swatch-inner').style.background = this.value;
    swatch.querySelector('.color-hex').textContent = this.value;
  });

  swatch.appendChild(picker);
  return swatch;
}

function populateColorGrid(containerId, colors) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  colors.forEach((color) => {
    grid.appendChild(createColorSwatch(color));
  });

  grid.appendChild(createColorSwatch('#ffffff', true));
}

populateColorGrid('primaryColors', [
  '#F7F2E9',
  '#D4A5A0',
  '#9DAF98',
  '#92ADC1',
  '#4A3728'
]);

populateColorGrid('secondaryColors', [
  '#C9BFB0',
  '#E8DDD0',
  '#F4D281',
  '#C5ABD2',
  '#D4E4EE'
]);

// REFERENCE SLOTS
const referenceLabels = [
  'Typographic reference',
  'Colour / texture',
  'Layout / structure',
  'Image / photograph',
  'Motion / time',
  'Wildcard — anything'
];

function createReferenceSlot(label) {
  const slot = document.createElement('div');
  slot.className = 'ref-slot';
  slot.innerHTML = `
    <div class="ref-slot-icon">⊕</div>
    <div class="ref-slot-label">${label}</div>
  `;

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';

  fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      slot.innerHTML = `
        <img src="${e.target.result}" alt="${label}">
        <div class="ref-slot-caption">${label}</div>
      `;
      slot.appendChild(fileInput);
    };
    reader.readAsDataURL(file);
  });

  slot.appendChild(fileInput);
  slot.addEventListener('click', () => fileInput.click());

  return slot;
}

function populateReferenceGrid() {
  const grid = document.getElementById('refGrid');
  if (!grid) return;

  referenceLabels.forEach((label) => {
    grid.appendChild(createReferenceSlot(label));
  });
}

populateReferenceGrid();

// TONE SELECTOR
const toneDescriptions = {
  Clinical: 'Precise, unambiguous, structured — no excess.',
  Refined: 'Careful restraint. Nothing wasted.',
  Warm: 'Approachable, human, inviting.',
  Playful: 'Energetic, unexpected, a little delightful.',
  Botanical: 'Grounded, organic, soft, and nature-led.',
  Dreamy: 'Airy, romantic, imaginative, and slightly magical.',
  Cozy: 'Comforting, familiar, gentle, and lived-in.'
};

function updateToneLabel(label) {
  const toneLabel = document.getElementById('toneLabel');
  if (!toneLabel) return;

  toneLabel.textContent = `${label} — ${toneDescriptions[label] || ''}`;
}

function setupToneSelector() {
  const toneCells = document.querySelectorAll('.tone-cell');

  toneCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      toneCells.forEach((item) => item.classList.remove('selected'));
      cell.classList.add('selected');

      const label = cell.getAttribute('data-label');
      updateToneLabel(label);
    });
  });
}

setupToneSelector();