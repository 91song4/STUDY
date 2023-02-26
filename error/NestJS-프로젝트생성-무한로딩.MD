KT인터넷을 사용할 경우 이런상황을 겪는다는 분들이 많다.

npm의 registry를 미러 서버로 설정한 뒤 프로젝트를 생성하고, 다시 원 서버로 복구하는 방법이라고 한다.
```bash
npm config set registry https://registry.npmjs.cf/
nest new project
npm config set registry https://registry.npmjs.org/
```
