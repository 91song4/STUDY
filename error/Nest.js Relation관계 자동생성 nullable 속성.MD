![스크린샷 2023-04-23 오전 12 04 29](https://user-images.githubusercontent.com/90318817/233792457-42d32d3c-b860-4096-8665-ee954cbcc4f7.png)

- 문제상황

  - articles의 category_id 의 nullable이 true이다.
  - @JoinColumn({}) 데코레이터에 nullable 속성을 false를 주고싶었지만 그러한 속성은 없었다.

<br>

- 원하는 방향

  nullable이 false로 정의

<br>

- 해결과정

  JoinColumn데코레이터의 JoinColumnOptions 에는 nullable속성이 없어서  
   ManyToOne 데코레이터에서 RelationOptions의 속성을 보는 중 nullable 발견

![스크린샷 2023-04-23 오전 12 04 29](https://user-images.githubusercontent.com/90318817/233793077-225c2b07-35d0-4cc3-bde3-c70e59575961.png)
