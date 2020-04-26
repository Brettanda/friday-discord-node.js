module.exports = (array = []) => {
  if (array[0] == array[1]) {
    return true;
  }
  //     var dups = array;
  //     dups[0] = "";

  //     console.log(dups);
  //     console.log(array);
  //     dups.forEach(item => {
  //       // dups = array.map(i => i == item);
  //       // console.log(dups)
  //       if(array[0] == item) {
  //         return true;
  //       }
  //     });
  return false;
  // var valuesSoFar = [];
  // for (var i = 0; i < array.length; ++i) {
  //     var value = array[i];
  //     if (valuesSoFar.indexOf(value) !== -1) {
  //         return true;
  //     }
  //     valuesSoFar.push(value);
  // }
  // return false;
};
