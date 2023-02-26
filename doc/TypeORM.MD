# TypeORM 데이터베이스 연결

> TypeORM 설치 - Windows
```bash
npm install typeorm@0.3.0
npm install @nestjs/typeorm mysql

class-validator 이슈로 설치 실패시
npm uninstall class-validator
npm install typeorm@0.3.0
npm install @nestjs/typeorm mysql
npm install class-validator
```

<br>

> TypeORM 설치 - Mac

```bash
npm install @nestjs/typeorm mysql
 
class-validator 이슈로 설치 실패시
npm uninstall class-validator
npm install @nestjs/typeorm mysql
npm install class-validator
```

설치 후 루트 모듈(app.module.ts)에 적용시켜 줍니다.
```JavaScript
// src/app.module.ts

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BoardModule } from "./board/board.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "여러분들의 데이터베이스 아이디",
      password: "여러분들의 데이터베이스 비밀번호",
      database: "board",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true, // Production 환경에서는 false로 설정해야 합니다.
    }),
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
특정 모듈을 사용하기 위해서 imports 속성에 해당 모듈을 추가해야 합니다.  
지금 코드는 민감한 정보들이 노출되어있기 때문에 숨겨주겠습니다.

```JavaScript
// src/app.module.ts

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BoardModule } from "./board/board.module";
import { TypeOrmConfigService } from "./config/typeorm.config.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ // forRoot -> forRootAsync로 바뀌었어요!
      useClass: TypeOrmConfigService, // DB 관련 설정이 있는 서비스 파일을 불러와요!
    }),
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
TypeOrmModule.forRoot 함수 대신 TypeOrmModule.forRootAsync 함수를 사용 합니다.
> 왜냐하면, Nest.js 웹 어플리케이션이 부트스트랩될 때 데이터베이스 연결의 동적 구성을 허용해야 하는데 이것은 `TypeOrmModule.forRootAsync`라는 함수를 써야 가능하기 때문입니다!  
> 
> 다시 말해서, **비동기 작업**(여기서는 데이터베이스와 연결 설정)이 **완료될 때까지 응용 프로그램 시작을 지연**해야하기 때문에 `TypeOrmModule.forRootAsync` 를 사용하는 것입니다.  
> **파일이나 환경 변수에서 구성을 읽어야 하거나 런타임에 구성을 결정해야 하는 경우에 유용하게 쓸 수 있어요!**

<br>

```JavaScript
// src/config/typeorm.config.service.ts

import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "여러분들의 데이터베이스 아이디",
      password: "여러분들의 데이터베이스 비밀번호",
      database: "board", // 중요: board 데이터베이스는 미리 생성해놓아야 합니다!
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
??? 여기부터 ???끝까지의 줄이 끼워지거나 지워져 버린 것 같습니다
      synchronize: true, // Production 환경에서는 false로 설정해야 합니다.
    };
  }
}
```
그러나 이역시도 아직은 정보들이 노출되어 있습니다.  
보통은 .env 패키지를 사용합니다, 그러나 이러한 기능들을 Nest.js에서도 제공을 합니다.  
바로 @nestjs/config 입니다. 이 친구를 사용해 봅니다.

<br>

> @nestjs/config 설치
```bash
npm install @nestjs/config
```

<br>

루트 디렉토리에서 .env 파일을 생성합니다. 당연히 .gitignore에 추가해서 정보를 은닉해야 합니다.
```text
DATABASE_HOST="localhost"
DATABASE_PORT=3306
DATABASE_USERNAME="여러분들의 데이터베이스 아이디"
DATABASE_PASSWORD="여러분들의 데이터베이스 비밀번호"
DATABASE_NAME="board"
DATABASE_SYNCHRONIZE=true
```

<br>

config 설정을 전역적으로 참조하기 위해 app.module.ts 코드를 수정합니다.

```JavaScript
// src/app.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BoardModule } from "./board/board.module";
import { TypeOrmConfigService } from "./config/typeorm.config.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Article } from "./board/article.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 일단 이것은 무조건 가장 위에서!
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 주목
      useClass: TypeOrmConfigService,
      inject: [ConfigService], // 주목
    }),
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
> `@nestjs/config` 패키지를 통하여 ConfigModule, ConfigService를 가져와야 하는 것에 주목해주세요. 
> 
> 일단, 첫 번째로 `ConfigModule.forRoot({ isGlobal: true }),` 코드가 있습니다. 이 코드는 TypeORMModule이 TypeOrmConfigService를 통하여 초기 세팅이 되기전에 .env 파일 값들을 읽어오기 위해서 제일 위에 선언을 합니다. 
> 
> 두 번째로는 TypeOrmModule.forRootAsync 함수에서 .env 파일 값을 읽어오기 위해 imports, inject에 각각 ConfigModule, ConfigService를 넘겨주는 것입니다.

<br>

이제 typeorm.config.service.ts도 .env 파일의 환경변수를 읽어오는 버전으로 코드를 수정합니다.
> config/typeorm.config.service.ts
```Javascript
import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Article } from "src/board/article.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.configService.get<string>("DATABASE_HOST"),
      port: this.configService.get<number>("DATABASE_PORT"),
      username: this.configService.get<string>("DATABASE_USERNAME"),
      password: this.configService.get<string>("DATABASE_PASSWORD"),
      database: this.configService.get<string>("DATABASE_NAME"),
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: this.configService.get<boolean>("DATABASE_SYNCHRONIZE"),
    };
  }
}
```
TypeOrmModule.forRootAsync 함수에서 inject 속성을 통해 주입된 ConfigService의 get 함수를 통해서 .env 파일에 정의된 환경변수 값들을 넣어주도록 바꾸었습니다.
