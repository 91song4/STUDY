Delete `␍` eslint (prettier/prettier) 오류 발생

이유는 Prettier와 ESLint의 충돌문제였습니다.

이 오류는 ESLint에서 발생하는 오류라고 합니다.  
실행은 정상적으로 되지만 빨간줄이 많이 보여 신경이 무진장 쓰입니다.

<br>

> 해결방법
ESLint파일인 .esLint.js 혹은 .eslint.json을 열어서 아래코드를 추가해줍니다.
```json js
rules: {
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
},
```

