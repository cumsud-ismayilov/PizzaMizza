import { data } from "./data.js";

const pizzasElem = document.querySelector("#pizzas")



const localData = JSON.parse(localStorage.getItem("cartList"));
let cartList = [];
if (localData && localData.length) {
  cartList = localData;
}

cartListRender()


function removeFromCart(id) {
    cartList = cartList.filter(pizza => pizza.id !== id);
    localStorage.setItem("cartList", JSON.stringify(cartList))
    cartListRender()
}


function cartListRender() {
  pizzasElem.innerHTML = "";

  cartList.forEach(pizza => {
    const div = document.createElement("div");
    div.className = "p-[5px] shadow-sm";

    div.innerHTML = `
      <img src="${pizza.img}"
           alt=""
           onerror="this.src='https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'"
           class="w-full h-[270px] object-cover">
      <div class="p-[30px]">
        <button class="remove-btn cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
          </svg>
        </button>
        <h3 class="text-[20px] font-[700]">${pizza.name}</h3>
        <p class="text-[tomato] text-[15px]">Price: ${pizza.price} AZN</p>
      </div>
    `;

   
    div.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(pizza.id);
    });

    pizzasElem.appendChild(div);
  });
}