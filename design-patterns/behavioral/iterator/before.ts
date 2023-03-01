const myData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function run() {
  let left = 0,
    right = myData.length - 1;
  let isLeft = true;

  while (left <= right) {
    if (isLeft) {
      console.log(myData[left]);
      left++;
      isLeft = false;
      continue;
    }
    console.log(myData[right]);
    right--;
    isLeft = true;
  }
}

run();
console.log("done");
