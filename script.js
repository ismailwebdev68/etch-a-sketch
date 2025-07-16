const canvas = document.getElementById("canvas");
const input_box = document.getElementById("grid_input");
const genrateButton = document.getElementById("gen_but");

let gridSize;
let boxSize;
let borderSize;
let isMouseDown = false;
let isEraser = false;
let isPen = true;

genrateButton.addEventListener("click", () => {
    storeValue();
    if (gridSize >= 10 && gridSize <= 50) {
        document.getElementById("canvas").innerHTML = "";
        generateGrid(gridSize);
    } else {
        alert("Enter Valid Grid Size!");
    }
});

function storeValue() {
    gridSize = parseInt(input_box.value);
    boxSize = 500 / gridSize;
}

function enableEraser() {
    isEraser = true;
    isPen = false;
}



function enablePen() {
    isPen = true;
    isEraser = false;
}

function generateGrid(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let column = document.createElement("div");
        column.setAttribute("id", i);
        canvas.appendChild(column);
    }
    for (let i = 0; i < gridSize; i++) {
        let c = document.getElementById(i);
        for (let j = 0; j < gridSize; j++) {
            let box = document.createElement("div");
            box.setAttribute("class", "box");
            box.setAttribute("style", `width: ${boxSize - 2}px; height: ${boxSize - 2}px;`);
            c.appendChild(box);

            box.addEventListener("mousedown", () => {
                if (isEraser) {
                    box.style.backgroundColor = "white";
                } else if (isPen) {
                    changeColor(box);
                }
            });
            box.addEventListener("mouseover", () => {
                if (isMouseDown) {
                    if (isEraser) {
                        box.style.backgroundColor = "white";
                    } else if (isPen) {
                        changeColor(box);
                    }
                }
            });
        }
    }
}

function clearGrid() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.style.backgroundColor = "white";
    });
}

function changeColor(box) {
    box.style.backgroundColor = "red";
}

document.addEventListener("mousedown", () => {
    isMouseDown = true;
});
document.addEventListener("mouseup", () => {
    isMouseDown = false;
});
