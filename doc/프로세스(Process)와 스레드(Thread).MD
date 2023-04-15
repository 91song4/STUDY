# 프로세스(Process)와 스레드(Thread)의 간략정의

## 프로그램(Program)

프로그램은 프로그래밍 언어로 작성된 코드를 실행가능한 상태의 파일이다.

## 프로세스(Process)

프로그램을 인스턴스화 한 것 그것이 프로세스 이다.<br>
메모리에 적재되면서 운영체제에서 자원을 할당받는데,<br>
운영체제에서 자원을 할당받는 작업의 단위 이기도 하다.<br>
프로세스는 한 개 이상의 스레드를 가질 수 있다.

## 스레드(Thread)

프로세스 내에서 실제로 작업을 수행하는 주체 이다.<br>
프로세스가 할당받은 자원을 이용하여 작업을 실행하는데,<br>
스레드는 실행 흐름의 단위 이기도 하다.

## 가상메모리공간(Virtual Memory Space)

1차 메모리와 2차메모리를 합쳐서 하나의 연속된 메모리로 추상화 한 메모리

## 일단 이렇게 외우자

- Process(작업)는 최소 1개의 Thread 존재
  - 실행을 시켜서 연산을 하는 단위는 Thread 단위로 한다
- OS는 Virtual Memory(제한된 공간)를 Process한테 할당한다(Attach).
- Process에 속한 모든 Thread는 Process의 Virtual Memory로 공간이 제약된다.
- Multi-threading
  - Thread마다 각자 고유한 TLS(Thread Local Storage)를 가지고 Stack을 가진다.

## 궁금한 점

- 프로세스는 운영체제가 CPU자원과 RAM자원을 할당받는데, 메모리에 적재된다라는 말이 이해가가질 않는다.<br>
