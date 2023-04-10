export class Stack {
  private readonly stack: number[] | string[];
  private top: number;

  constructor(private readonly maxSize: number) {
    this.stack = new Array(maxSize);
    this.top = -1;
  }

  isFull(): boolean {
    return this.maxSize - 1 === this.top;
  }

  isEmpty(): boolean {
    return this.top === -1;
  }

  push(data: number | string): void | Error {
    if (this.isFull()) {
      throw new Error("ERROR_STACKFULL");
    }

    this.stack[++this.top] = data;
  }

  pop(): number | string | Error {
    if (this.isEmpty()) {
      throw new Error("ERROR_STACKEMPTY");
    }

    return this.stack[this.top--];
  }

  get peek(): number | string | Error {
    if (this.isEmpty()) {
      throw new Error("ERROR_STACKEMPTY");
    }

    return this.stack[this.top];
  }
}
