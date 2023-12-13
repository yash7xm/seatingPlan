const Rows = document.querySelector(".rows");
const Cols = document.querySelector(".columns");
const btn = document.querySelector(".btn");
const bName = document.querySelector(".block-name");
const seatEditing = document.querySelector(".activate-seat-editing-btn button");

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
        fill: 'white',
      });

      seat.on("mousedown", function () {
        toggleSeatSelection(seat);
        modifySeatNums(seatNum.seatNumber, cols);
      });

      seat.on("click", function () {
        toggleSeatSelection(seat);
        modifySeatNums(seatNum.seatNumber, cols);
      });

      seatNum.on("mousedown", function () {
        toggleSeatSelection(seat);
        modifySeatNums(seatNum.seatNumber, cols);
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
    groupAdded = false;
  } else {
    canvas.add(group);
    groupAdded = true;
  }
  canvas.renderAll();
});

function toggleSeatSelection(seat) {
  seat.set("fill", seat.get("fill") === "blue" ? "grey" : "blue");
  canvas.renderAll();
}

function modifySeatNums(seatNumber, cols) {
  if (seatNums[seatNumber - 1].text === "") addSeats(seatNumber, cols);
  else removeSeats(seatNumber, cols);
}

function removeSeats(seatNumber, cols) {
  seatNumber = parseInt(seatNumber);
  cols = parseInt(cols);
  let start = seatNumber % cols;
  if (start === 0) start = cols;
  let j = seatNumber;
  let no = seatNums[seatNumber - 1].text;
  for (let i = start; i < cols; i++, j++) {
    if (seatNums[j].text === "") continue;
    else {
      seatNums[j].text = `${no}`;
      no++;
    }
  }

  seatNums[seatNumber - 1].text = "";
}

function addSeats(seatNumber, cols) {
  seatNumber = parseInt(seatNumber);
  cols = parseInt(cols);
  let start = seatNumber % cols;
  if (start == 0) start = cols;
  let no = 1;
  let j = seatNumber - start;
  console.log(j);

  for (let i = 0; i < cols; i++, j++) {
    if (seatNums[j].text === "" && i != start - 1) {
      continue;
    } else {
      seatNums[j].text = `${no}`;
      no++;
    }
  }
}
