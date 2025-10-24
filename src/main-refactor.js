'use strict';

//Get data from JSON file
function loadItems() {
  return fetch('./data/data.json')
    .then((response) => response.json())
    .then((data) => data.items);
}

//Create items with given data
function createItems(item) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-type', item.type);
  itemRow.setAttribute('data-color', item.color);

  itemRow.innerHTML = `
    <img 
        class="item__img"
        src="${item.img}"
        alt="${item.color} ${item.type}"
    />
    <span class="item__text">
        ${item.gender}, ${item.size} size
    </span>
  `;

  return itemRow;
}
//Button event for filtering
function onButtonClick(event, elements) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;

  if (!key || !value) return;
  visibleItems(elements, key, value);
}
// Filter types and colours of clothes
function visibleItems(elements, key, value) {
  elements.forEach((element) => {
    if (element.dataset[key] === value) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });
}
// Button event showing all items
function onShowAllItems(elements) {
  elements.forEach((element) => (element.style.display = 'flex'));
}

// Logic
loadItems()
  .then((items) => {
    //Render items on the screen
    const container = document.querySelector('.items');
    const elements = items.map((item) => createItems(item));
    container.append(...elements);

    // Set event listener
    const btns = document.querySelector('.filters');
    const logo = document.querySelector('.shopping__logo');
    btns.addEventListener('click', (event) => {
      onButtonClick(event, elements);
    });
    logo.addEventListener('click', () => {
      onShowAllItems(elements);
    });
  })
  .catch((error) => {
    // Error handling
    console.error('Error loading JSON:', error);
    items.innerHTML = `
    <img src="./img/error_img.png" style="width: 100%"  >
    `;
  });
