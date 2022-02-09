import { addProdInBasket } from "./basket"
import { productData, getProduct } from "./getData"

export const cardsBlock = document.querySelector('.catalog__cards')
export const cardButton = document.querySelectorAll('.card__btn')

let allProduct: any[] = []

export async function renderCatalog() {
  await getProduct()
  clearCatalog()
  addCards(productData)
}

let clearCatalog = () => {
  cardsBlock.innerHTML = ""
}

let filterSelectWidth = document.getElementById("selectWidth") as HTMLSelectElement

filterSelectWidth.addEventListener('change', function () {
  let selectWidth = this.options[this.selectedIndex].value
  if (+selectWidth === 0) {
    clearCatalog()
    addCards(productData)
  } else {
    clearCatalog()
    let filterProduct = filter(selectWidth)
    addCards(filterProduct)
  }
})

let filter = (width: any) => {
  return productData.filter((item: any) => +item.WIDTH === +width)
}

let addCards = (products: any) => {

  for (let value of Object.keys(products)) {
    let productItem = products[value]

    if (!productItem.SKU) {
      let newCard = document.createElement("div")
      newCard.className = "card";
      newCard.id = `${productItem.ID}`;
      newCard.innerHTML =
        `<div class='card__img'>${productItem.PICTURE}</div>
    <p class='card__name'>${productItem.NAME}</p>
    <p class='card__price'>${productItem.PRICE} руб.</p>
    <button class='card__btn btn'>Купить</button>`;
      cardsBlock.append(newCard);
      allProduct.push(productItem)
    }

    if (!!productItem.SKU) {
      let productSkuArray = Object.keys(productItem.SKU);

      for (let sku of productSkuArray) {
        let productSkuItem = productItem.SKU[sku]
        let newCard = document.createElement("div")
        newCard.className = "card";
        newCard.id = `${sku}`;
        newCard.innerHTML =
          `<div class='card__img'>${productItem.PICTURE}</div>
      <p class='card__name'>${productItem.NAME} длинна ${productSkuItem.LENGTH} ширина ${productItem.WIDTH}</p>
      <p class='card__price'>${productSkuItem.PRICE} руб.</p>
      <button class='card__btn btn'>Купить</button>`;
        cardsBlock.append(newCard);
        allProduct.push(productSkuItem)
      }
    }
  }
}

cardsBlock.addEventListener('click', (e) => {
  e.preventDefault()
  let selectCard: HTMLElement = e.target as HTMLElement;

  if (selectCard.classList.contains('card__btn')) {
    let selectCardId = selectCard.closest('.card').id
    let selectProd = allProduct.find(item => item.ID === selectCardId);
    addProdInBasket(selectProd)
  }
})

let settingButtons = document.querySelector('.catalog__settings')

settingButtons.addEventListener('click', (e) => {
  e.preventDefault()
  let selectButton: HTMLElement = e.target as HTMLElement;

  if (selectButton.classList.contains('btn_block')) {
    console.log(1);
    cardsBlock.classList.remove('catalog_list')
    cardsBlock.classList.add('catalog_block')
  }
  if (selectButton.classList.contains('btn_list')) {
    console.log(2);
    cardsBlock.classList.remove('catalog_block')
    cardsBlock.classList.add('catalog_list')
  }
})