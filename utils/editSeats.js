function modifySeatNums(seatNumber, cols, seatNums) {
  if (seatNums[seatNumber - 1].text === "") addSeats(seatNumber, cols, seatNums);
  else removeSeats(seatNumber, cols, seatNums);
}

function removeSeats(seatNumber, cols, seatNums) {
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

function addSeats(seatNumber, cols, seatNums) {
  seatNumber = parseInt(seatNumber);
  cols = parseInt(cols);
  let start = seatNumber % cols;
  if (start == 0) start = cols;
  let no = 1;
  let j = seatNumber - start;

  for (let i = 0; i < cols; i++, j++) {
    if (seatNums[j].text === "" && i != start - 1) {
      continue;
    } else {
      seatNums[j].text = `${no}`;
      no++;
    }
  }
}

export default modifySeatNums;