import { Component } from "@angular/core";
import { BehaviorSubject, Subscription, Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Test App";
  liveData = {
    x: this.createSubject("liveData", 1000),
    // y: this.createSubject("liveData", 100),
    // z: this.createSubject("liveData", 200).pipe(
    //   map(x => ({ x, dbl: (x * x) }))
    // ),
    g: this.gen(200)
  };

  constructor() {
  }

  async *gen(ms) {
    let value = false;
    while(true) {
      yield value;
      await delay(ms);
    }
  }

  createSubject(name: string, ms: number) {
    const subject = new BehaviorSubject("Initial");
    doLoop();
    return subject;

    async function doLoop() {
      let x = 1;
      while (true) {
        await delay(ms);
        subject.next(x.toString());
        x += 1;
      }
    }
  }

  identify(x: any) {
    if(x instanceof Observable) { return 'observable'; }
    return typeof(x);
  }
}

function delay(ms) {
  return new Promise((res, rej) => {
    setTimeout(function() {
      res();
    }, ms);
  });
}