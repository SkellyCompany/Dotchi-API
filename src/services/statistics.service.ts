import { Injectable } from '@nestjs/common';

@Injectable()
export class Statisticservice {
  constructor() {
    setInterval(() => {
      this.checkMetrics();
    }, 1 * 1000);
  }

  checkMetrics() {
  }
}
