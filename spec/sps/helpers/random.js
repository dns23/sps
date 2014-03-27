function randomChoice(array) {
   var rand = Math.random();
   rand *= array.length;
   rand = Math.floor(rand);
   return array[rand];
}
