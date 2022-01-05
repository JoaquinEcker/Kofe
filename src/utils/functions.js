export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function threeProducts(array) {
  const numbers = [1, 2, 3];
  let newArray = [];

  numbers.map(() => {
    let num = Math.floor(Math.random() * (44 - 1)) + 1;

    newArray.push(array[num]);
  });
  return newArray;
}
