const Rows = document.querySelector(".rows");
const Cols = document.querySelector(".columns");
const btn = document.querySelector(".btn");

var canvas = new fabric.Canvas("canvas", {
  top: 50,
  left: 50,
  height: 500,
  width: 500,
});

let seatSize = 20;
let seatNums = [];

btn.addEventListener("click", () => {
  const rows = Rows.value;
  const cols = Cols.value;

  canvas.clear();
  seatNums = [];

  for (let i = 0; i < rows; i++) {
    const letter = String.fromCharCode(65 + i);
    const rowName = new fabric.Text(`${letter}`, {
      left: 0,
      top: i * seatSize * 2 + seatSize / 2.5,
      fontSize: 25,
      fill: "grey",
      selectable: false,
    });

    canvas.add(rowName);

    for (let j = 0; j < cols; j++) {
      const left = j * seatSize * 2 + seatSize;
      const top = i * seatSize * 2;

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
      });

      seat.on("mousedown", function () {
        toggleSeatSelection(seat);
        modifySeatNums(seatNum.seatNumber, cols);
      });

      canvas.add(seat);
      canvas.add(seatNum);
      seatNums.push(seatNum);
    }
  }
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
