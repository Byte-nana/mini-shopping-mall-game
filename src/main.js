'use strict';

const items = document.querySelector('.items');
const btns = document.querySelector('.filters');
const logo = document.querySelector('.shopping__logo');

function createItem(data) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-type', data.type);
  itemRow.setAttribute('data-color', data.color);

  itemRow.innerHTML = `
    <img
        class="item__img"
        src="./img/${data.color}_${data.type.charAt(0)}.png"
        alt="${data.color} ${data.type}"
    />
    <span class="item__text">${data.gender}, ${data.size}</span>
  `;
  return itemRow;
}

fetch('./data/data.json')
  .then((response) => response.json())
  .then((data) => {
    data.items.forEach((item) => {
      const list = createItem(item);
      items.appendChild(list);
    });

    const itemRows = document.querySelectorAll('.item__row');

    btns.addEventListener('click', (e) => {
      onFilterType(itemRows, e.target);
    });

    btns.addEventListener('click', (e) => {
      onFilterColor(itemRows, e.target);
    });

    logo.addEventListener('click', () => {
      onShowAll(itemRows);
    });
  })
  .catch((error) => {
    console.error('Error loading JSON:', error);
    items.innerHTML = `
    <img src="./img/error_img.png" style="width: 100%"  >
    `;
  });

function onFilterType(itemRows, target) {
  const filter = target.dataset.type;
  if (!filter) return;

  itemRows.forEach((item) => {
    if (filter === item.dataset.type) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}
//
function onFilterColor(itemRows, target) {
  const filter = target.dataset.color;
  if (!filter) return;

  itemRows.forEach((item) => {
    if (filter === item.dataset.color) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function onShowAll(itemRows) {
  itemRows.forEach((item) => (item.style.display = 'flex'));
}
