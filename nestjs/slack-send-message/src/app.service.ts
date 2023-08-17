import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SlackService } from 'nestjs-slack';

@Injectable()
export class AppService {
  constructor(private readonly slackService: SlackService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async sendMessage() {
    try {
      // Web Hooks를 통해서 채널에 메세지를 보내기
      // Web Hooks
      // this.slackService.sendText('hohoazooma!');

      // Web API를 통해서 채널에 메세지를 보내기
      // Web API
      // const response = await this.slackService.postMessage({
      //   text: 'song',
      // });

      // 워크스페이스 내 모든 사용자 정보 조회
      // const response = await axios.post(
      //   'https://slack.com/api/users.list',
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${process.env.BOT_TOKEN}`,
      //     },
      //   },
      // );

      // 다이렉트 메세지 열기
      // const response = await axios.post(
      //   'https://slack.com/api/conversations.open',
      //   {
      //     users: 'process.env.USER_ID',
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${process.env.BOT_TOKEN}`,
      //     },
      //   },
      // );

      // DM 보내기
      const result = await this.slackService.postMessage({
        channel: process.env.USER_ID,
        text: '다이렉트 메세지',
      });
      console.log(result);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}
