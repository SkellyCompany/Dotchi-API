import { Injectable } from '@nestjs/common';

@Injectable()
export class Statisticservice {
  constructor() {
    setInterval(() => {
      this.test();
    }, 1 * 1000);
  }

  test() {
    console.log("now");
  }
}
