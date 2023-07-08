const container = document.querySelector(".container");
const dim = container.clientWidth;
const createLayoutBtn = document.getElementById("layout-create");
const removeOutBtn = document.getElementById("toggle-outline");
const resetBtn = document.getElementById("reset");
const eraseBtn = document.getElementById("erase");
const drawBtn = document.getElementById("draw");
const randomBtn = document.getElementById("random");

let isHoldingMouse = false;
let isGridEnabled = true;
let isEraseEnabled = false;
let isRandEnabled = false;

let gridStyle = "";

const defaultBtnColor = "#327032";

document.body.onmousedown = () => (isHoldingMouse = true);
document.body.onmouseup = () => (isHoldingMouse = false);

function changeColor(e) {
  if (e.type === "mouseover" && !isHoldingMouse) return;

  let color = "black";
  if (isEraseEnabled) color = "white";
  if (isRandEnabled){
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);

    color = `rgb(${r}, ${g}, ${b})`;
  }

  e.target.style.backgroundColor = color;
}

function createLayout() {
  let size = prompt("Enter num of grids (max. 100): ");

  if (!size) return;
  else size = size > 100 ? 100 : size;

  container.innerHTML = "";
  isGridEnabled = true;
  setLayout(size);
}

function toggleOutline() {
  const grids = document.querySelectorAll(".grid");

  const styleString =
    gridStyle + (isGridEnabled ? "border:none" : "border: 1px solid gray");

  grids.forEach((grid) => {
    const currColor = grid.style.backgroundColor;
    grid.style.cssText = styleString;
    grid.style.backgroundColor = currColor;
  });
  isGridEnabled = !isGridEnabled;
}

function setLayout(size) {
  for (let i = 0; i < size * size; i++) {
    const grid = document.createElement("div");
    gridStyle = `width:${dim / size}px; height: ${
      dim / size
    }px; border:1px solid gray; box-sizing: border-box; background-color:white;`;
    grid.style.cssText = gridStyle;
    grid.classList.add("grid");
    container.appendChild(grid);
    grid.addEventListener("mouseover", changeColor);
    grid.addEventListener("mousedown", changeColor);
  }
}

function reset() {
  const grids = document.querySelectorAll(".grid");
  grids.forEach((grid) => (grid.style.backgroundColor = "white"));
  isGridEnabled = true;
}

setLayout(16);

createLayoutBtn.addEventListener("click", createLayout);
removeOutBtn.addEventListener("click", toggleOutline);
resetBtn.addEventListener("click", reset);

drawBtn.addEventListener("click", (e) => {
  e.target.classList.add("selected");
  randomBtn.classList.remove("selected");
  eraseBtn.classList.remove("selected");
  isEraseEnabled = false;
  isRandEnabled = false;
});

eraseBtn.addEventListener("click", (e) => {
  e.target.classList.add("selected");
  drawBtn.classList.remove("selected");
  randomBtn.classList.remove("selected");
  isEraseEnabled = true;
  isRandEnabled = false;
});

randomBtn.addEventListener("click", (e)=>{
    e.target.classList.add("selected");
    eraseBtn.classList.remove("selected");
    drawBtn.classList.remove("selected");
    isRandEnabled = true;
    isEraseEnabled = false;
})