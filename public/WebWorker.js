 self.onmessage = async event => { 
      const { row, col, price, state } = event.data;
      let newRows = [];
  
      for (let i = 0; i < row; i++) {
        newRows[i] = [];
        for (let j = 0; j < col; j++) {
          await newRows[i].push({
            "id": `${i + 1}-${j + 1}`,
            "name": j + 1,
            "state": state,
            "price": price,
          });
        }
      }
      
      self.postMessage(newRows); 

  };