self.onmessage = async (event) => {
  const { row, col, price, state, isColOdd } = event.data;
  let newRows = [];
  if (isColOdd) {
    for (let i = 0; i < row; i++) {
      newRows[i] = [];
      for (let j = 0; j < col; j++) {
        if (j % 2 !== 0) {
          await newRows[i].push({
            id: `${i + 1}-${j + 1}`,
            name: j + 1,
            state: state,
            price: price,
          });
        }
      }
    }
  } else {
    for (let i = 0; i < row; i++) {
      newRows[i] = [];
      for (let j = 0; j < col; j++) {
        await newRows[i].push({
          id: `${i + 1}-${j + 1}`,
          name: j + 1,
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
