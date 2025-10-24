'use strict';

const items = document.querySelector('.items');

function createItem(data) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
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
  })
  .catch((error) => {
    console.error('Error loading JSON:', error);
    items.innerHTML = `
    <img src="./img/error_img.png" style="width: 100%"  >
    `;
  });
