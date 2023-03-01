class DummyDataStructure {
  data: number[];

  constructor(data: number[]) {
    this.data = data;
  }

  [Symbol.iterator]() {
    // return new DummyIterator(this);
    return dummyGenerator(this);
  }
}

class DummyIterator {
  data: number[];
  left: number;
  right: number;
  isLeft: boolean;

  constructor(dataStruct: DummyDataStructure) {
    this.data = dataStruct.data;
    this.left = 0;
    this.right = dataStruct.data.length - 1;
    this.isLeft = true;
  }

  next() {
    let result = { done: this.left > this.right, value: 0 };

    if (this.isLeft) {
      result.value = this.data[this.left];
      this.left++;
      this.isLeft = false;
    } else {
      result.value = this.data[this.right];
      this.right--;
      this.isLeft = true;
    }

    return result;
  }
}

function* dummyGenerator(dataStruct: DummyDataStructure) {
  const myData = dataStruct.data;

  let left = 0,
    right = myData.length - 1;
  let isLeft = true;

  while (left <= right) {
    if (isLeft) {
      yield myData[left];
      left++;
      isLeft = false;
      continue;
    }
    yield myData[right];
    right--;
    isLeft = true;
  }
}

const dataStruct = new DummyDataStructure([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

for (const e of dataStruct) {
  console.log(e);
}
