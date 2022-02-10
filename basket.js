"use strict"

const basketCountEl = document.querySelector('.cart-number');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');

document.querySelector('.cart-icon').addEventListener('mouseover', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.products-list').addEventListener('click', event => {
    if (!event.target.closest('.btn-add')) {
        return
    }
    const feauturedItem = event.target.closest('.products-item');
    const id = +feauturedItem.dataset.id;
    const price = +feauturedItem.dataset.price;
    const name = feauturedItem.dataset.name;

    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {
            id: id,
            name: name,
            price: price,
            count: 0,
        };
    }
    basket[id].count++;
    basketCountEl.textContent = totalCount();
    basketTotalValueEl.textContent = totalPrice().toFixed(2);
    productInBasket(id);

}

function totalCount() {
    const productArr = Object.values(basket);
    let count = 0;
    for (const product of productArr) {
        count += product.count;
    }
    return count;
};

function totalPrice() {
    const productArr = Object.values(basket);
    let count = 0;
    for (const product of productArr) {
        count += product.count * product.price;
    }
    return count;
};

function productInBasket(id) {
    const basketRowEl = basketEl.querySelector(`.basketRow[data-id="${id}"]`);
    if (!basketRowEl) {
        newProductInBasket(id);
        return
    }



    const product = basket[id];
    basketRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl.querySelector('.productTotalRow').textContent = (product.price * product.count).toFixed(2);
};


function newProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}