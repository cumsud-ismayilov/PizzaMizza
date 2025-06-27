import { data } from "./data.js";

const pizzasElem = document.querySelector("#pizzas");
const totalData = document.querySelector("#totalData");
const searchElem = document.querySelector("#search");
const paginationElem = document.querySelector("#paginations");
const detailModal = document.querySelector("#detailModal");
const showCard = document.querySelector("#showCard");
const cardModal = document.querySelector("#card-modal");
const cardListItem = document.querySelector("#cartListElem");
const emptyMessage = document.querySelector("#empty-message");
const isBasket = document.querySelector("#isBasket");
const totalPrice = document.querySelector("#totalprice");

let start = 0;
let end = 12;
let globalList;

const localData = JSON.parse(localStorage.getItem("cartList"));
let cartList = [];
if (localData && localData.length) {
  cartList = localData;
}

detailModal.addEventListener("click", (e) => {
  if (e.target === detailModal) {
    detailModal.classList.add("hidden");
  }
});

showCard.addEventListener("click", () => {
  cardModal.classList.remove("hidden");
});

cardModal.addEventListener("click", (e) => {
  if (e.target === cardModal) {
    cardModal.classList.add("hidden");
  }
});

function renderPizza(list = data) {
  globalList = list;
  pizzasElem.innerHTML = "";

  list.slice(start, end).forEach((item) => {
    const div = document.createElement("div");
    div.className = "p-[5px] shadow-sm";
    div.innerHTML = `
      <img class="pizza-img w-full h-[270px] object-cover cursor-pointer"   
           src="${item.img}" 
           alt="pizzasimg"
           onerror="this.onerror=null; this.src='https://static.vecteezy.com/system/resources/previews/007/872/974/non_2x/file-not-found-illustration-with-confused-people-holding-big-magnifier-search-no-result-data-not-found-concept-can-be-used-for-website-landing-page-animation-etc-vector.jpg';">
      <div class="p-[30px]">
       <button class="cursor-pointer" aria-label="Add to cart">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
                     1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243
                     l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625
                     10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0
                     .375.375 0 0 1 .75 0Z" />
          </svg>
        </button>
        <h3 class="text-[20px] font-[700]">${item.name}</h3>
        <p class="text-[tomato] text-[15px]">${item.price} AZN</p>
      </div>
    `;

    div
      .querySelector("img")
      .addEventListener("click", () => ShowDetailModal(item.id));

    div
      .querySelector("button")
      .addEventListener("click", () => addToCart(item.id));

    pizzasElem.appendChild(div);
  });

  totalData.textContent = list.length;
  generatePage(list);
}

renderPizza(data);
cardListRender();

searchElem.addEventListener("input", () => {
  const val = searchElem.value.trim().toLowerCase();
  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(val) ||
      item.dsc.toLowerCase().includes(val)
    );
  });
  start = 0;
  end = 12;
  renderPizza(filteredData);
});

function generatePage(param) {
  const totalPage = Math.ceil(param.length / 12);
  paginationElem.innerHTML = "";

  for (let i = 1; i <= totalPage; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className =
      "bg-[blue] text-[#fff] shadow-lg w-[50px] h-[40px] flex justify-center items-center cursor-pointer";
    btn.dataset.page = i;

    btn.addEventListener("click", () => {
      start = (i - 1) * 12;
      end = i * 12;
      renderPizza(globalList);
    });

    paginationElem.appendChild(btn);
  }
}

function ShowDetailModal(id) {
  detailModal.classList.remove("hidden");
  const foundPizza = data.find((item) => item.id === id);
  detailModal.innerHTML = `
            <div class="max-w-[1000px] md:h-[550px] grid md:grid-cols-2 grid-cols-1 gap-[30px] bg-[#fff] p-[50px]">
                <div class="w-full h-full">
                    <img src="${foundPizza.img}"
                    onerror="this.src='https://static.vecteezy.com/system/resources/previews/007/872/974/non_2x/file-not-found-illustration-with-confused-people-holding-big-magnifier-search-no-result-data-not-found-concept-can-be-used-for-website-landing-page-animation-etc-vector.jpg'"
                        class="w-full object-cover md:h-full  h-[250px]">
                </div>
                <div class="flex flex-col gap-[10px]">
                    <h2 class="font-[900] text-[25px]">${foundPizza.name}</h2>
                    <p>${foundPizza.dsc}</p>
                    <p>Price:${foundPizza.price} AZN</p>
                    <p>Country:${foundPizza.country}</p>
                    <div class="flex gap-[10px] h-[30px]"> ${generatingRate(
                      foundPizza.rate
                    )} </div>
                     <button id="addToCartBtn" class="bg-[violet] p-[6px_20px] cursor-pointer">Add To Cart</button>

                </div>

            </div>
    `;

  const addToCartBtn = document.querySelector("#addToCartBtn");
  addToCartBtn.addEventListener("click", () => {
    addToCart(foundPizza.id);
  });
}

function cardListRender() {
  cardListItem.innerHTML = "";

  if (cartList.length === 0) {
    emptyMessage.classList.remove("hidden");
    isBasket.classList.add("hidden");
    return;
  }

  emptyMessage.classList.add("hidden");
  isBasket.classList.remove("hidden");

  cartList.forEach((pizza) => {
    const li = document.createElement("li");
    li.className = "flex gap-[20px]";

    li.innerHTML = `
      <img src="${pizza.img}"
           onerror="this.src='https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'"
           class="w-[60px] object-cover">
      <div class="w-full">
        <h3 class="font-[600] text-[18px] mb-[7px]">${pizza.name}</h3>
        <div class="flex justify-between items-center">
          <p>${(pizza.price * pizza.count).toFixed(2)} AZN</p>
          <div class="flex gap-[15px] items-center">
            <button class="decrease-btn bg-[blue] w-[25px] h-[25px] text-white flex justify-center items-center cursor-pointer">-</button>
            <span>${pizza.count}</span>
            <button class="increase-btn bg-[blue] w-[25px] h-[25px] text-white flex justify-center items-center cursor-pointer">+</button>
          </div>
        </div>
      </div>
    `;

    li.querySelector(".decrease-btn").addEventListener("click", () => {
      countDecrease(pizza.id);
    });

    li.querySelector(".increase-btn").addEventListener("click", () => {
      countIncrease(pizza.id);
    });

    let total = 0;
    cartList.forEach((pizza) => {
      total += pizza.price * pizza.count;
    });
    totalPrice.textContent = `${total.toFixed(2)} AZN`;

    cardListItem.appendChild(li);
  });
}

function generatingRate(rate) {
  let result = "";
  for (let i = 0; i < rate; i++) {
    result += `
       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2153px-Star_icon_stylized.svg.png"
       alt="" class="w-[30px]">
    `;
  }
  return result;
}

function addToCart(id) {
  const foundPizzaInCartList = cartList.find((pizza) => pizza.id === id);

  if (!foundPizzaInCartList) {
    const foundPizzaInMainData = data.find((pizza) => pizza.id === id);
    cartList.push({
      ...foundPizzaInMainData,
      count: 1,
    });
  } else {
    foundPizzaInCartList.count++;
  }
  localStorage.setItem("cartList", JSON.stringify(cartList));
  cardListRender();
}

function countIncrease(id) {
  const foundPizza = cartList.find((pizza) => pizza.id === id);
  foundPizza.count++;
  localStorage.setItem("cartList", JSON.stringify(cartList));
  cardListRender();
}

function countDecrease(id) {
  const foundPizza = cartList.find((pizza) => pizza.id === id);
  if (foundPizza.count > 1) {
    foundPizza.count--;
  } else {
    cartList = cartList.filter((pizza) => pizza.id !== id);
  }

  localStorage.setItem("cartList", JSON.stringify(cartList));
  cardListRender();
}
