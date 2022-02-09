var index;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/main.scss":
/*!**************************!*\
  !*** ./styles/main.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./script/basket.ts":
/*!**************************!*\
  !*** ./script/basket.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProdInBasket": () => (/* binding */ addProdInBasket)
/* harmony export */ });
let basketLastRow = document.querySelector('.last_row');
let basketTable = document.querySelector('.basket__table');
let basketResultSum = document.querySelector('.basket__result-sum');
let basket = [];
let addProdInBasket = (selectProd) => {
    if (!basket.find(item => item.ID === selectProd.ID)) {
        selectProd.COUNT = 1;
        basket.push(selectProd);
        renderBasket();
    }
    else {
        let ind = basket.findIndex(item => item.ID === selectProd.ID);
        basket[ind].COUNT++;
        renderBasket();
    }
};
let clearBasket = () => {
    let basketProdRow = document.querySelectorAll('.basket__prod-row');
    if (!!basketProdRow) {
        for (let el of basketProdRow) {
            el.remove();
        }
    }
};
let renderBasket = () => {
    clearBasket();
    basket.forEach(item => {
        let newItemInBasket = document.createElement("tr");
        newItemInBasket.className = "basket__prod-row basket__row";
        newItemInBasket.id = item.ID + 'B';
        newItemInBasket.innerHTML =
            `<td class="basket__prod-name">${item.NAME}</td>
    <td class="basket__prod-count"><input class="basket__prod-input" type="text" value="${item.COUNT}"> </td>
    <td class="basket__prod-price">${+item.PRICE} руб.</td>
    <td class="basket__prod-sum">${+item.PRICE * +item.COUNT} руб.</td>
    <td class="basket__prod-delete">X</td>`;
        basketLastRow.before(newItemInBasket);
    });
    resultSum();
};
let resultSum = () => {
    let sum = basket.reduce((sum, item) => sum + item.PRICE * item.COUNT, 0);
    basketResultSum.innerHTML = sum + " руб.";
};
basketTable.addEventListener('click', (e) => {
    e.preventDefault();
    let selectProd = e.target;
    if (selectProd.closest('.basket__prod-row')) {
        let selectProdId = selectProd.closest('.basket__prod-row').id;
        let selectProdBasketId = selectProdId.slice(0, -1);
        let indexProd = basket.findIndex((item) => item.ID === selectProdBasketId);
        if (selectProd.classList.contains('basket__prod-input')) {
            changeCountProd(selectProd, indexProd);
        }
        if (selectProd.classList.contains('basket__prod-delete')) {
            deleteProd(indexProd);
        }
    }
    setTimeout(() => {
        renderBasket();
    }, 4000);
});
let changeCountProd = (prod, indexProd) => {
    prod.addEventListener('input', (e) => {
        let selectProdBasketInput = e.target;
        if (+selectProdBasketInput.value > 0) {
            basket[indexProd].COUNT = +selectProdBasketInput.value;
            console.log(basket[indexProd].COUNT);
        }
        else {
            basket[indexProd].COUNT = 1;
        }
    });
};
let deleteProd = (indexProd) => {
    basket.splice(indexProd, 1);
    renderBasket();
};


/***/ }),

/***/ "./script/cards.ts":
/*!*************************!*\
  !*** ./script/cards.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cardsBlock": () => (/* binding */ cardsBlock),
/* harmony export */   "cardButton": () => (/* binding */ cardButton),
/* harmony export */   "renderCatalog": () => (/* binding */ renderCatalog)
/* harmony export */ });
/* harmony import */ var _basket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basket */ "./script/basket.ts");
/* harmony import */ var _getData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getData */ "./script/getData.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const cardsBlock = document.querySelector('.catalog__cards');
const cardButton = document.querySelectorAll('.card__btn');
let allProduct = [];
function renderCatalog() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0,_getData__WEBPACK_IMPORTED_MODULE_1__.getProduct)();
        clearCatalog();
        addCards(_getData__WEBPACK_IMPORTED_MODULE_1__.productData);
    });
}
let clearCatalog = () => {
    cardsBlock.innerHTML = "";
};
let filterSelectWidth = document.getElementById("selectWidth");
filterSelectWidth.addEventListener('change', function () {
    let selectWidth = this.options[this.selectedIndex].value;
    if (+selectWidth === 0) {
        clearCatalog();
        addCards(_getData__WEBPACK_IMPORTED_MODULE_1__.productData);
    }
    else {
        clearCatalog();
        let filterProduct = filter(selectWidth);
        addCards(filterProduct);
    }
});
let filter = (width) => {
    return _getData__WEBPACK_IMPORTED_MODULE_1__.productData.filter((item) => +item.WIDTH === +width);
};
let addCards = (products) => {
    for (let value of Object.keys(products)) {
        let productItem = products[value];
        if (!productItem.SKU) {
            let newCard = document.createElement("div");
            newCard.className = "card";
            newCard.id = `${productItem.ID}`;
            newCard.innerHTML =
                `<div class='card__img'>${productItem.PICTURE}</div>
    <p class='card__name'>${productItem.NAME}</p>
    <p class='card__price'>${productItem.PRICE} руб.</p>
    <button class='card__btn btn'>Купить</button>`;
            cardsBlock.append(newCard);
            allProduct.push(productItem);
        }
        if (!!productItem.SKU) {
            let productSkuArray = Object.keys(productItem.SKU);
            for (let sku of productSkuArray) {
                let productSkuItem = productItem.SKU[sku];
                let newCard = document.createElement("div");
                newCard.className = "card";
                newCard.id = `${sku}`;
                newCard.innerHTML =
                    `<div class='card__img'>${productItem.PICTURE}</div>
      <p class='card__name'>${productItem.NAME} длинна ${productSkuItem.LENGTH} ширина ${productItem.WIDTH}</p>
      <p class='card__price'>${productSkuItem.PRICE} руб.</p>
      <button class='card__btn btn'>Купить</button>`;
                cardsBlock.append(newCard);
                allProduct.push(productSkuItem);
            }
        }
    }
};
cardsBlock.addEventListener('click', (e) => {
    e.preventDefault();
    let selectCard = e.target;
    if (selectCard.classList.contains('card__btn')) {
        let selectCardId = selectCard.closest('.card').id;
        let selectProd = allProduct.find(item => item.ID === selectCardId);
        (0,_basket__WEBPACK_IMPORTED_MODULE_0__.addProdInBasket)(selectProd);
    }
});
let settingButtons = document.querySelector('.catalog__settings');
settingButtons.addEventListener('click', (e) => {
    e.preventDefault();
    let selectButton = e.target;
    if (selectButton.classList.contains('btn_block')) {
        console.log(1);
        cardsBlock.classList.remove('catalog_list');
        cardsBlock.classList.add('catalog_block');
    }
    if (selectButton.classList.contains('btn_list')) {
        console.log(2);
        cardsBlock.classList.remove('catalog_block');
        cardsBlock.classList.add('catalog_list');
    }
});


/***/ }),

/***/ "./script/getData.ts":
/*!***************************!*\
  !*** ./script/getData.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productData": () => (/* binding */ productData),
/* harmony export */   "getProduct": () => (/* binding */ getProduct)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let productData;
function getProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield fetch('../data/product.json');
            if (res.ok) {
                productData = (yield res.json());
                return productData;
            }
        }
        catch (err) {
            console.log(err.message);
            return null;
        }
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _script_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script/cards */ "./script/cards.ts");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/main.scss */ "./styles/main.scss");


window.addEventListener("load", () => {
    (0,_script_cards__WEBPACK_IMPORTED_MODULE_0__.renderCatalog)();
});

})();

index = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map