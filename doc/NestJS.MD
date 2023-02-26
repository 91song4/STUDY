# 입문주차

<input type="checkbox"> Nest.js가 기존 웹 프레임워크에 비해서 어떤 장점이 있는지 명확하게 이해하고 설명할 수 있다. <br>
<input type="checkbox"> 레이어드 아키텍처 패턴에 대해서 제대로 알고 설명할 수 있다. <br>
<input type="checkbox"> 기본적인 nest 커맨드를 사용하여 구성요소들을 생성할 수 있다. <br>
<input type="checkbox"> IoC와 DI 개념에 대해서 설명할 수 있다. <br>
<input type="checkbox"> 데코레이터에 대해서 설명할 수 있다. <br>
<input type="checkbox"> 간단한 웹 서비스를 Nest.js 기반으로 작성할 수 있다. <br>

<br>

# 들어가며

Express, Koa, Fastify 등 수많은 Node.js 웹 프레임워크들 중 후발대인 Nest.js는 어떻게 가장사랑받는 웹 프레임워크가 될 수 있었을까?  
무엇이 그걸 가능케 만들었을까?

<br>

# Express의 아쉬운 점

Node.js를 배울때 꼭 거치게 되는 단계가 있는데, 
바로 웹서버를 개발하는 단계이다.

이럴때 항상 책, 메뉴얼 에서는 Express가 등장한다.
그만큼 Express의 위상은 대단하다.

그 이유는 Express를 사용하면 몇 줄 안되는 코드로 서버를 열 수 있다.
```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000)  // 3000번 폰트로 WAS 서버 바로 띄우기
```

그러나 이렇게 간단한 웹서버는 실제로 사용하지 않는다.  
필요한 기능들을 하나씩 추가하다보면 점점 무거워지게 된다.

<br>

# Nest.js의 등장
Nest.js는 어떤 특징들을 가지고 있을까?  
Nest.js는 타입스크립트 & 커맨드 기반 웹 프레임워크이다. 이제부터 모든 것을 커맨드로!

예를 들어 레이어드 아키텍처 패턴에 Posts 컨트롤러를 만드려고 한다면 다음과 같은 커맨드를 입력한다.
```bash
nest g co posts
g: generate
co: controller
posts: 파일 이름
```

여기서 Express와 Nest.js의 차이점을 알 수 있습니다.  
Express는 간단하지만 직접 폴더구조를 설계하고, 파일들을 생성해야 합니다.  
반면 Nest.js는 커맨드 명령으로 폴더구조와, 파일들을 간단히 생성할 수 있습니다.  

Express를 사용하여 직접 생성해도 상관없습니다.  
다만 Express를 사용하면 직접 작성하는 만큼 유동적이게 만들 수 있겠지만, 에러도 그만큼 생길 수 있습니다.  

Nest.js는 로직에 의해 생성되기 때문에 정확하게 만들어 냅니다.  

이런 게 지원이 되면 좋은 것이 또 하나가 있습니다.  
바로, 개발자가 비지니스 로직. 즉, **웹 서버의 핵심 로직 구현에만 신경**쓰고 그 외에 다른 부분들은 Nest.js에 일임을 하면 되는 것입니다. 이렇게 되면 뭐가 좋을까요?

- 생각할 거리가 줄어들어 비지니스 로직의 퀄리티가 향상될 가능성이 커집니다!
- 이것저것 직접 손대지 않아도 된다는 얘기는 바꿔 말하면 코드 생산성이 향상된다는 얘기에요!
- 그리고 같은 기능의 웹 서버를 만든다고 해도 조금이라도 일을 덜 하면… 그냥 좋잖아요?!

<br>

# Nest.js 준비

> 터미널 명령어를 실행하는 디렉토리는 Nest.js 루트 디렉토리입니다.  

> 패키지 매니저는 NPM만 사용하며 yarn 및 다른 패키지 매니저는 일절 사용하지 않습니다!
> 그 이유는 npm이 가장 잘 호환이 되기 때문입니다.

> [강의 참조 사이트 1주차 사용코드](https://github.com/mindori/sparta-nest)

<br>

Nest.js 설치하기
```bash
npm install [-g] @nestjs/cli
글로벌 설치는 옵션이다.
```
Nest.js 매뉴얼
```bash
nest
```
Nest.js 프로젝트 생성 명령어
```bash
nest new nestjs
실패시
git clone https://github.com/nestjs/typescript-starter.git sparta-nest
cd sparta-nest
npm i
```

<br>

# Nest.js 코드분석 - main.ts
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

const app = await NestFactory.create(AppModule);
AppModule이라는 모듈을 루트 모듈로 사용하는 Nest.js 어플리케이션 인스턴스를 생성하는 문장입니다.
```

<br>

# Nest.js 코드분석 - app.module.ts

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

데코레이터('@', Decorator)가 등장한다.
```

<br>

# Nest.js 코드 분석 - app.controller.ts

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

> Nest.js의 IoC 컨테이너라는 친구는 @Injectable 혹은 @InjectRepository 와 같은 데코레이터가 달린 클래스를 트래킹하여 실제로 Nest.js 웹 어플리케이션이 실행될 때 동적으로 DI를 합니다!

> @Get이라는 새로운 데코레이터가 보입니다. 이 @Get이라는 데코레이터는 HTTP GET으로 요청이 들어올 시 아래의 함수(코드에서는 getHello 함수)를 실행하라는 얘기입니다!

<br>

# Nest.js 코드 분석 - app.service.ts

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```
> 서비스는 리포지토리를 반드시 의존해야 하며 이는 생성자를 통한 DI로 해결해야 합니다!  
> 단, 데이터베이스를 사용하는 경우에만 해당이 됩니다.

<br>

# Nest.js 코드 분석 - app.controller.spec.ts

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

describe는 테스트 코드를 그룹화 해주는 함수이다.
```

<br>

# Nest.js IoC와 DI

IoC는 Inversion of Control의 준말로서 제어 역전이라고도 합니다.  
기존에는 어떠한 서비스를 사용하고 싶으면 아래와 같이 코드를 작성했습니다.
```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 1. 사용하고 싶은 서비스 타입 객체를 미리 선언합니다.
  private appService: AppService
  
  constructor() {
    // 2. 생성자에서 실제로 사용할 서비스 객체를 직접 생성합니다.
    this.appService = new AppService();
  }
  ...
}
```
지금까지는 개발자가 사용하고 싶은 객체가 있으면 이것은 개발자가 생성부터 소멸까지 직접 관리해야 했습니다.  
이렇게 직접 생성하면 의존하는 서비스가 변경되면 개발자도 그에 맞추어서 코드를 수정해야 합니다.

하지만, **IoC는 개발자가 사용하고 싶은 객체를** 직접 생성하는 것이 아니라 **객체의 생명주기 관리 자체를 외부(여기서는 Nest.js IoC 컨테이너)에 위임**을 합니다!  
즉, 객체의 관리를 컨테이너에 맡겨서 제어권이 넘어갔기 때문에 IoC(제어 역전)라고 하는 것입니다.
> IoC는 모듈 간 결합도를 낮추기 때문에 하나의 모듈이 변경되어도 다른 모듈들에는 영향을 최소화되어 웹 어플리케이션을 지속 가능하고 확장성 있게 해줍니다!

<br>

이렇게 제어권을 넘겨주면 개발자는 비지니스 로직을 작성하는 데 더 집중을 할 수 있습니다.  
비지니스 로직을 작성하기 위해 세팅해야 하는 사전작업이 최소화되는 것 입니다.

**DI**는 이런 **IoC를 수행하는 방법의 하나**이며 Nest.js에서는 생성자를 통한 DI를 가장 기본적인 IoC 테크닉으로 생각하고 있습니다.

<br>

# Nest.js 게시판을 만들어보자 - 1

> Nest.js Board 모듈 생성 명령어
```bash
nest g mo board
```

<br>

> board라는 디렉토리가 자동으로 생성되고 다음과 같은 코드가 새로 생긴다.
```typescript
// board.module.ts

import { Module } from '@nestjs/common';

@Module({})
export class BoardModule {}
```

<br>

> Nest.js Board 컨트롤러 생성 명령어
```bash
nest g co board
```

<br>

> 컨트롤러가 생성되었다면 다음과 같은 코드가 자동으로 생성 된다.
```typescript
// board.controller.ts

import { Controller } from '@nestjs/common';

// Controller 데코레이터 옆에 문자열은 라우팅 룰이라고 생각하시면 됩니다!
// 이 컨트롤러는 /board 라는 주소 아래로 요청을 하면 해당 컨트롤러에서 처리를 해요!
// 예를 들면, GET /board/{articleId}, POST /board/comments/ 등이 있어요!
@Controller('board')
export class BoardController {}
```
```typescript
// board.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';

describe('BoardController', () => {
  let controller: BoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
    }).compile();

    controller = module.get<BoardController>(BoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```

<br>

> 다시 모듈을 보면 코드가 바뀌어 있습니다.
```typescript
// board.module.ts

import { Module } from '@nestjs/common';
import { BoardController } from './board.controller'; // 새로 생김

@Module({
  controllers: [BoardController], // 새로 생김
})
export class BoardModule {}
```

<br>

> nest 커맨드로 생성을 하니 모듈에 자동으로 적용이 되었습니다.
> 서비스도 적용시켜 봅니다.
```bash
nest g s board
```

<br>

```typescript
// board.module.ts

import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service'; // 새로 생김

@Module({
  controllers: [BoardController],
  providers: [BoardService], // 새로 생김
})
export class BoardModule {}
```

<br>

> 서비스 역시 모듈에 추가되었습니다.
> 서비스 코드를 확인해봅니다.
```typescript
// board.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {}
```
```typescript
// board.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService],
    }).compile();

    service = module.get<BoardService>(BoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

<br>

> 루트모듈인 AppModule을 확인해봅니다.
```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';

@Module({
  imports: [BoardModule], // 새로 생김
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

<br>

> AppModule에서 BoardModule을 잘 참조하고 있습니다.

<br>

# Nest.js 게시판을 만들어보자 - 2

게시물 기능 목록
- 게시물 작성
  - 작성자 이름
  - 게시물 비밀번호
    - 게시물 수정 및 삭제를 위함
  - 게시물 제목
  - 게시물 내용
- 게시물 목록 조회
  - 페이지네이션
    - 간편하게 구현하기 위해 생략을 하겠습니다.
  - 게시물 번호
  - 게시물 제목
  - 작성자 이름
  - 작성일자
- 게시물 상세 조회
  - 작성자 이름
  - 게시물 제목
  - 게시물 내용
- 게시물 수정
  - 게시물 비밀번호 일치 여부 확인 후 수정할 수 있게 합시다.
  - 게시물 제목
  - 게시물 내용
- 게시물 삭제
  - 게시물 비밀번호 일치 여부 확인 후 삭제할 수 있게 합시다.

<br>

> 사용패키지 lodash  
> lodash는 Javascript로 코딩할 때 유용하게 사용할 수 있는 유틸성 패키지이며 express 이상으로 월클입니다.

<br>

> lodash 설치
```bash
npm install lodash
```

<br>

> tsconfig.json 속성 추가
```json
"esModuleInterop": true
ES6 모듈 사양을 준수하여 CommonJS 모듈을 가져올 수 있게 합니다.
```

<br>

> board.controller.ts 1차
```typescript
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/articles')
  getArticles() {
    return this.boardService.getArticles();
  }

  @Get('/articles/:id')
  getArticleById() {
    return this.boardService.getArticleById(id);
  }

  @Post('/articles')
  createArticle() {
    return this.boardService.createArticle();
  }

  @Put('/articles/:id')
  updateArticle() {
    return this.boardService.updateArticle(id);
  }

  @Delete('/articles/:id')
  deleteArticle() {
    return this.boardService.deleteArticle(id);
  }
}
```

<br>

> Express에서는 req.body 등을 통해 데이터를 전달받았는데,  
> Nest.JS에서는 어떻게 데이터를 받을까?

<br>

> Nest.js에서는 클라이언트로부터 데이터를 받거나 데이터를 줘야 할 때는 DTO를 사용해야 합니다. 

<br>

> DTO(Data Transfer Object)에 대해서 간단하게 정의하자면 데이터를 전송하기 위해 작성된 객체라고 생각하시면 됩니다.  
> Nest.js에서는 모든 데이터는 DTO를 통해서 운반됩니다.

<br>

> 그렇다면, DTO를 써야 하는 것은 알겠는데 어떻게 작성하면 될까?  
> 그 전에, class-validator, class-transformer라는 패키지를 설치를 할 거다.  
> class-validator는 입력값 유효성 검사를 위해 정말 다양한 기능을 제공합니다.
> class-transformer는 차차 알아가보자.

```bash
npm install class-validator class-transformer
```

<br>

> 설치한 class-validator 패키지를 이용해서 DTO로 전달되는 입력받의 유효성 검사를 합니다.  
> DTO 클래스를 작성합니다.

<br>

> create-article.dto.ts
```typescript
import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsNumber()
  readonly password: number;
}
```
> @IsString, @IsNumber()라는 데코레이터는 Nest.js에서 제공하는 데코레이터가 아닌 class-validator에서 제공하는 데코레이터 입니다.  
> 위의 코드에서는 클라이언트로부터 전달받아야 하는 title, content를 DTO 객체의 변수로 선언했고  
> title, content 둘 중 하나라도 String 값으로 오지 않으면 자동으로 400 에러를 리턴합니다.

<br>

> update-article.dto.ts 1차
```typescript
import { IsNumber, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsNumber()
  readonly password: number;
}
```
> @IsString, @IsNumber()라는 데코레이터는 Nest.js에서 제공하는 데코레이터가 아닌 class-validator에서 제공하는 데코레이터 입니다.  
> 위의 코드에서는 클라이언트로부터 전달받아야 하는 title, content를 DTO 객체의 변수로 선언했고  
> title, content 둘 중 하나라도 String 값으로 오지 않으면 자동으로 400 에러를 리턴합니다.

<br>

> delete-article.dto.ts 1차
```typescript
import { IsNumber } from 'class-validator';

export class DeleteArticleDto {
  @IsNumber()
  readonly password: number;
}
```
> DTO를 3개 작성한 이유는 각각의 요청마다 해당 요청으로부터 전달을 받는 데이터가 조금씩 다 다르기 때문에 통상적으로 요청 1 : 1 DTO 비율을 유지합니다. 그런데, update-article.dto.ts는 create-article.dto.ts에서 사실상 다를게 없습니다.  
> 이럴 때는 코드 복사 + 붙여넣기도 좋지만 @nestjs/mapped-types의 PartialType을 상속받으면 이를 깔끔하게 해결할 수 있습니다. 

<br>

> DeleteArticleDto도 동일합니다 하지만, 게시물을 삭제하는데 title, content를 굳이 선택적으로 받게끔 할 필요는 없습니다.  
> 이럴 때는 더욱 더 단호하게 @nestjs/mapped-types의 PickType을 상속받아 부모 클래스에서 필드를 선택해서 선언하는 것이 더욱 더 깔끔합니다.

<br>

> @nestjs/mapped-types 설치
```bash
npm install @nestjs/mapped-types
```
> 만약, class-validator 의존성 이슈로 설치에 실패한다면 다음과 같이 시도를 해주시기 바랍니다.
```bash
$ npm uninstall class-validator
$ npm i @nestjs/mapped-types
$ npm i class-validator
```

<br>

> update-article.dto.ts 2차
```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
```

<br>

> delete-article.dto.ts 2차
```typescript
import { PickType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

export class DeleteArticleDto extends PickType(CreateArticleDto, [
  'password',
] as const) {}
```
> 코드가 굉장히 줄어들었습니다.  
> 새로운 유형의 DTO를 작성하는 것이 아니면 항상 @nestjs/mapped-types 사용을 습관화해야 합니다.

<br>

또한, DTO의 유효성 검사를 하기 위해서는 main.ts에 ValidationPipe를 주입해야 합니다
> main.ts
```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 이 한줄만 넣어주면 됩니다! 잊지마세요!  
  await app.listen(3000);
}
bootstrap();
```

<br>

> 만약, Express로 작업했다면?  
```typescript
import _ from 'lodash';

api.post('/articles', (req, res) => {
  const data = req.body.data;
  // 개발자가 직접 유효성 검사 규칙을 작성해야 합니다.
  // 필드가 많아지면 많아질수록 선형적으로 코드와 노력이 들어가게 되는 구조죠.
  if (!_.isString(data.title) || !_.isString(data.string)) {
    // 400 리턴!
  }
});
```
> DTO를 작성하면 필요한 곳에서는 어디서든 사용할 수 있고, 유효성 검사 데코레이터는 DTO에서 한번만 정의되면 됩니다.

<br>

> board.controller.ts 2차
```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/articles')
  getArticles() {
    return this.boardService.getArticles();
  }

  @Get('/articles/:id')
  getArticleById(@Param('id') articleId: number) {
    return this.boardService.getArticleById(articleId);
  }

  @Post('/articles')
  createArticle(@Body() data: CreateArticleDto) {
    return this.boardService.createArticle(
      data.title,
      data.content,
      data.password,
    );
  }

  @Put('/articles/:id')
  updateArticle(
    @Param('id') articleId: number,
    @Body() data: UpdateArticleDto,
  ) {
    return this.boardService.updateArticle(
      articleId,
      data.title,
      data.content,
      data.password,
    );
  }

  @Delete('/articles/:id')
  deleteArticle(
    @Param('id') articleId: number,
    @Body() data: DeleteArticleDto,
  ) {
    return this.boardService.deleteArticle(articleId, data.password);
  }
}
```
> @Param과 @Body가 보입니다. Express에서의 req.params, req.body 입니다.

<br>

> updateArticle 함수 시그니처를 살펴보겠습니다.
```typescript
  @Put('/articles/:id')
  updateArticle(
    @Param('id') articleId: number,
    @Body() data: UpdateArticleDto,
  )
```
> /articles/:id에서 :id는 파라미터를 뜻합니다.  
> 그래서 저 URI에 지정된 파라미터를 가져오기 위해서는 @Param이라는 데코레이터에 갖고 올 파라미터 이름을 넘겨야합니다.  
> 여기서는 id라는 파라미터를 갖고 오는 것이기 때문에 @Param(’id’)라고 갖고 온 후 number 타입의 articleId로 id라는 파라미터를 받겠다는 얘기죠!

<br>

> 바디를 갖고 오는 것은 @Body 데코레이터를 사용하면 됩니다.  
> req.body로 전달되는 데이터를 UpdateArticleDto라는 타입의 객체의 data라는 변수로 받겠다는 의미입니다!  
> 당연히, 잘못된 데이터가 있으면 ValidationPipe로 인해서 400 리턴이 자동으로 될 것입니다.

<br>

이제, 컨트롤러가 의존하는 서비스 코드를 작성해보겠습니다.
> board.service.ts
```typescript
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class BoardService {
  // 데이터베이스를 사용하지 않아 일단은 배열로 구현을 하였으니 오해 말아주세요!
  // 보통은 TypeORM 모듈을 이용하여 리포지토리를 의존합니다. 이건 나중에 배울게요!
  private articles = [];

  // 게시글 비밀번호를 저장하기 위한 Map 객체입니다.
  private articlePasswords = new Map();

  getArticles() {
    return this.articles;
  }

  getArticleById(id: number) {
    return this.articles.find((article) => return article.id === id);
  }

  createArticle(title: string, content: string, password: number) {
    const articleId = this.articles.length + 1;
    this.articles.push({ id: articleId, title, content });
    this.articlePasswords.set(articleId, password);
    return articleId;
  }

  updateArticle(id: number, title: string, content: string, password: number) {
    if (this.articlePasswords.get(id) !== password) {
      throw new UnauthorizedException(
        `Article password is not correct. id: ${id}`,
      );
    }

    const article = this.getArticleById(id);
    if (_.isNil(article)) {
      throw new NotFoundException(`Article not found. id: ${id}`);
    }

    article.title = title;
    article.content = content;
  }

  deleteArticle(id: number, password: number) {
    if (this.articlePasswords.get(id) !== password) {
      throw new UnauthorizedException(
        `Article password is not correct. id: ${id}`,
      );
    }

    this.articles = this.articles.filter((article) => article.id !== id);
    this.articlePasswords.delete(id);
  }
}
```
> lodash 제공 메소드  
> _.isNil()은 return값이 null||undefined를 확인하는 메소드 이다.

서비스 코드는 매우 간단합니다. 데이터베이스를 쓰지 않기 때문에 메모리에서 article 정보를 저장/수정/삭제를 하고 있음을 알 수 있습니다.  
단, 수정/삭제 시에는 게시물 비밀번호를 체크합니다.

코드를 보면, UnauthorizedException와 NotFoundException라는 예외가 보일텐데 이건 실제로 HTTP 상태코드에 해당되는 예외입니다.  
Nest.js에서는 예외 상황이 발생할 때 수동으로 상태 코드를 입력해서 리턴할 필요가 없으며 이미 정의가 된 예외를 던지기만 하면 전혀 문제가 없습니다!
