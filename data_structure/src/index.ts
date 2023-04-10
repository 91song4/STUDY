/** 양의 정수를 입력 받아 팩토리얼 계산해주는 함수
 * @param num 양의 정수
 * @return result
 */
export function factorial(num: number): number {
  if (num <= 1) return 1;

  return num * factorial(num - 1);
}

// console.log("factorial", factorial(5));

export class Stack {
  private readonly stack: number[];
  private top: number;

  constructor(private readonly maxSize: number) {
    this.stack = new Array(maxSize);
    this.top = -1;
  }

  private isFull(): boolean {
    return this.maxSize - 1 === this.top;
  }

  private isEmpty(): boolean {
    return this.top === -1;
  }

  push(num: number): void | Error {
    if (this.isFull()) {
      throw new Error("ERROR_STACKFULL");
    }

    this.stack[++this.top] = num;
  }

  pop(): number | Error {
    if (this.isEmpty()) {
      throw new Error("ERROR_STACKEMPTY");
    }

    return this.stack[this.top--];
  }

  get peek(): number | Error {
    if (this.isEmpty()) {
      throw new Error("ERROR_STACKEMPTY");
    }

    return this.stack[this.top];
  }
}

console.log("hello world!");
const stack = new Stack(5);
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);
// stack.push(6);
console.log(stack.peek);
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
// console.log(stack.pop());
