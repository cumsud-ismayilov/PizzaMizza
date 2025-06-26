import { data } from "./data.js";

const pizzasElem = document.querySelector("#pizzas");
const totalData = document.querySelector("#totalData");
const searchElem = document.querySelector("#search");
const paginationElem = document.querySelector("#paginations");
const detailModal = document.querySelector("#detailModal");

let start = 0;
let end = 12;
let globalList;

detailModal.addEventListener("click", (e) => {
  if (e.target === detailModal) {
    detailModal.classList.add("hidden");
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
        <h3 class="text-[20px] font-[700]">${item.name}</h3>
        <p class="text-[tomato] text-[15px]">${item.price} AZN</p>
      </div>
    `;
    div
      .querySelector("img")
      .addEventListener("click", () => ShowDetailModal(item.id));
    pizzasElem.appendChild(div);
  });

  totalData.innerHTML = list.length;
  generatePage(list);
}

renderPizza(data);

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
                    <div> ${generatingRate(foundPizza.rate)} </div>
                    <button class="bg-[violet] p-[6px_20px] cursor-pointer"
                     ">Add To Cart</button>

                </div>

            </div>
    `;
}

function generatingRate(rate) {
  let result = "";
  for (let i = 0; i < rate; i++) {
    result += `
       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2153px-Star_icon_stylized.svg.png"
       alt="" class="w-[30px]">
    `;
  }
  return result
}
