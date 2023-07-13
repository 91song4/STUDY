import { Injectable } from '@nestjs/common';
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      ttl: 60,
      limit: 10,
    };
  }
}
