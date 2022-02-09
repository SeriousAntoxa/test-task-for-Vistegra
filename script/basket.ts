let basketLastRow = document.querySelector('.last_row')
let basketTable = document.querySelector('.basket__table')
let basketResultSum = document.querySelector('.basket__result-sum')

let basket: any[] = []

export let addProdInBasket = (selectProd: any) => {
  if (!basket.find(item => item.ID === selectProd.ID)) {
    selectProd.COUNT = 1
    basket.push(selectProd)
    renderBasket()
  } else {
    let ind = basket.findIndex(item => item.ID === selectProd.ID)
    basket[ind].COUNT++
    renderBasket()
  }
}

let clearBasket = () => {
  let basketProdRow = document.querySelectorAll('.basket__prod-row')

  if (!!basketProdRow) {
    for (let el of basketProdRow) {
      el.remove()
    }
  }
}

let renderBasket = () => {
  clearBasket()

  basket.forEach(item => {
    let newItemInBasket = document.createElement("tr")
    newItemInBasket.className = "basket__prod-row basket__row"
    newItemInBasket.id = item.ID + 'B'
    newItemInBasket.innerHTML =
      `<td class="basket__prod-name">${item.NAME}</td>
    <td class="basket__prod-count"><input class="basket__prod-input" type="text" value="${item.COUNT}"> </td>
    <td class="basket__prod-price">${+item.PRICE} руб.</td>
    <td class="basket__prod-sum">${+item.PRICE * +item.COUNT} руб.</td>
    <td class="basket__prod-delete">X</td>`
    basketLastRow.before(newItemInBasket)
  })
  resultSum()
}

let resultSum = () => {
  let sum = basket.reduce((sum, item) => sum + item.PRICE * item.COUNT ,0)
  basketResultSum.innerHTML = sum + " руб."
}


basketTable.addEventListener('click', (e) => {
  e.preventDefault()
  let selectProd: HTMLElement = e.target as HTMLElement;
  if (selectProd.closest('.basket__prod-row')) {
    let selectProdId = selectProd.closest('.basket__prod-row').id
    let selectProdBasketId = selectProdId.slice(0, -1)
    let indexProd = basket.findIndex((item) => item.ID === selectProdBasketId)

    if (selectProd.classList.contains('basket__prod-input')) {
      changeCountProd(selectProd, indexProd)
    }

    if (selectProd.classList.contains('basket__prod-delete')) {
      deleteProd(indexProd)
    }
  }
  setTimeout(() => {
    renderBasket()
  }, 4000)
})

let changeCountProd = (prod: any, indexProd: number) => {

  prod.addEventListener('input', (e: { target: any }) => {
    let selectProdBasketInput = e.target
    if (+selectProdBasketInput.value > 0) {
      basket[indexProd].COUNT = +selectProdBasketInput.value
      console.log(basket[indexProd].COUNT);
      
    } else {
      basket[indexProd].COUNT = 1
    }
  })

}

let deleteProd = (indexProd: number) => {
  basket.splice(indexProd, 1)
  renderBasket()
}
