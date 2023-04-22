export class Queue {
  private readonly queue: any[];
  private front: number;
  private rear: number;

  constructor(private readonly maxSize: number) {
    this.queue = new Array(maxSize);
    this.front = -1;
    this.rear = -1;
  }

  // 어떤상태가 비어있음일까?
  isEmpty() {}
}
