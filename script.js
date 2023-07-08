const container = document.querySelector(".container");
const dim = container.clientWidth;
const createLayoutBtn = document.getElementById("layout-create");
const removeOutBtn = document.getElementById("toggle-outline");
let isHoldingMouse = false;
let isGridEnabled = true;

let gridStyle = "";

document.body.onmousedown = () => (isHoldingMouse = true);
document.body.onmouseup = () => (isHoldingMouse = false);

function changeColor(e) {
  if (e.type === "mouseover" && !isHoldingMouse) return;
  e.target.style.backgroundColor = "black";
}

function createLayout() {
  let size = prompt("Enter num of grids (max. 100): ");
  size = size > 100 ? 100 : size;
  container.innerHTML = "";
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
    }px; border:1px solid gray; box-sizing: border-box;`;
    grid.style.cssText = gridStyle;
    grid.classList.add("grid");
    container.appendChild(grid);
    grid.addEventListener("mouseover", changeColor);
    grid.addEventListener("mousedown", changeColor);
  }
}

setLayout(16);

createLayoutBtn.addEventListener("click", createLayout);
removeOutBtn.addEventListener("click", toggleOutline);
