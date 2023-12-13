import a from './utils/objectClass.js';
import modifySeatNums from './utils/editSeats.js';

const Rows = document.querySelector(".rows");
const Cols = document.querySelector(".columns");
const btn = document.querySelector(".btn");
const bName = document.querySelector(".block-name");
const seatEditing = document.querySelector(".activate-seat-editing-btn button");
const clearSeatsBtn = document.querySelector(".clear-seats button");


var canvas = new fabric.Canvas("canvas", {
  top: 50,
  left: 50,
  height: 500,
  width: 500,
});

let seatSize = 20;
let seatNums = [];
let grpArr = [];
let group;
let groupAdded = true;
let clearSeats = [];

btn.addEventListener("click", () => {
  const rows = Rows.value;
  const cols = Cols.value;
  const blockName = bName.value;

  canvas.clear();
  seatNums = [];
  grpArr = [];

  const blockHeading = new fabric.Text(`${blockName}`, {
    left: 1.5 * seatSize,
    top: 0,
    fontSize: 25,
    fill: "white",
    selectable: false,
  });

  canvas.add(blockHeading);
  grpArr.push(blockHeading);

  for (let i = 0; i < rows; i++) {
    const letter = String.fromCharCode(65 + i);
    const rowName = new fabric.Text(`${letter}`, {
      left: 0,
      top: i * seatSize * 2 + seatSize / 2.5 + 25,
      fontSize: 25,
      fill: "white",
      selectable: false,
    });

    canvas.add(rowName);
    grpArr.push(rowName);

    for (let j = 0; j < cols; j++) {
      const left = j * seatSize * 2 + seatSize;
      const top = i * seatSize * 2 + 25;

      const seat = new fabric.Circle({
        left: left,
        top: top,
        radius: seatSize,
        fill: "blue",
        selectable: false,
        hasControls: false,
        hasBorders: false,
        seatNumber: i * cols + j + 1,
        class: "seat",
      });

      const seatNum = new fabric.Text(`${j + 1}`, {
        left: seat.left + seat.radius / 1.6,
        top: seat.top + seat.radius / 2,
        fontSize: 15,
        selectable: false,
        seatNumber: i * cols + j + 1,
        fill: "white",
      });

      seat.on("mousedown", function () {
        toggleSeatSelection(seat, seatNum);
        modifySeatNums(seatNum.seatNumber, cols, seatNums);
      });

      seat.on("click", function () {
        toggleSeatSelection(seat, seatNum);
        modifySeatNums(seatNum.seatNumber, cols, seatNums);
      });

      seatNum.on("mousedown", function () {
        toggleSeatSelection(seat, seatNum);
        modifySeatNums(seatNum.seatNumber, cols, seatNums);
      });

      canvas.add(seat);
      canvas.add(seatNum);
      seatNums.push(seatNum);
      grpArr.push(seat);
      grpArr.push(seatNum);
    }
  }

  group = new fabric.Group(grpArr);
  canvas.add(group);
  groupAdded = true;

  canvas.renderAll();
});

seatEditing.addEventListener("click", () => {
  if (groupAdded) {
    canvas.remove(group);
    seatEditing.style.backgroundColor = 'lightGreen';
    groupAdded = false;
  } else {
    canvas.add(group);
    seatEditing.style.backgroundColor = 'white';
    groupAdded = true;
  }
  canvas.renderAll();
});

clearSeatsBtn.addEventListener("click", () => {
  while (clearSeats.length > 0) {
    const seat = clearSeats.pop();
    const index = grpArr.indexOf(seat);
    if(index !== -1){
      grpArr.splice(index, 1);
    }
    canvas.remove(seat);
  }
  canvas.renderAll();
});

function toggleSeatSelection(seat, seatNum) {
  const currentFill = seat.get("fill");
  seat.set("fill", currentFill === "blue" ? "grey" : "blue");

  if (currentFill === "grey") {
    const index = clearSeats.indexOf(seat);
    const seatNumIndex = clearSeats.indexOf(seatNum);
    if (index !== -1) {
      clearSeats.splice(index, 1);
    }
    if (seatNumIndex !== -1) {
      clearSeats.splice(seatNumIndex , 1);
    }

  } else {
    clearSeats.push(seat);
    clearSeats.push(seatNum);
  }

  canvas.renderAll();
}

