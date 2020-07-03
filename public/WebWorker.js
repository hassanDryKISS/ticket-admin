self.onmessage = async (event) => {
  const {
    row,
    col,
    colEnd,
    colStp,
    price,
    state,
    numberColFormat,
    colRtl,
    numberRowFormat,
  } = event.data;
  let newRows = [];
  if (numberColFormat === "odd") {
    for (let i = 0; i < row; i++) {
      newRows[i] = [];
      for (let j = col; j < colEnd; j = j + colStp) {
        if (j % 2 !== 0) {
          //check odd
          await newRows[i].push({
            id: `${i + 1}-${j + 1}`,
            name: colRtl ? Math.abs(j - colEnd) + col : j,
            state: state,
            price: price,
          });
        }
      }
    }
  } else if (numberColFormat === "even") {
    for (let i = 0; i < row; i++) {
      newRows[i] = [];
      for (let j = col; j <= colEnd; j = j + colStp) {
        if (j % 2 === 0) {
          // check even
          await newRows[i].push({
            id: `${i + 1}-${j}`,
            name: colRtl ? Math.abs(j - colEnd) + col : j,
            state: state,
            price: price,
          });
        }
      }
    }
  } else {
    for (let i = 0; i < row; i++) {
      newRows[i] = [];
      for (let j = col; j <= colEnd; j = j + colStp) {
        // default
        await newRows[i].push({
          id: `${i + 1}-${j + 1}`,
          name: colRtl ? Math.abs(j - colEnd) + col : j,
          state: state,
          price: price,
        });
      }
    }
  }

  self.postMessage(newRows);
};

const printOdd = (num) => {
  for (let i = 1; i < num; i++) {
    if (i % 2 !== 0) {
      console.log(i);
    }
  }
};

const printEven = (num) => {
  let even;
  for (let i = 1; i < num; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
};
