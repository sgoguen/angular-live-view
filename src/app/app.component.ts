import { Component } from "@angular/core";
import { BehaviorSubject, Subscription, Observable, interval } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Test App";
  liveData = {
    x: interval(1000),
    y: interval(100),
    z: interval(1000).pipe(
      map(x => ({ 
        x, 
        sq: (x * x),
        ob: interval(100)
       }))
    ),
    // g: this.gen(200)
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

  createSubject(ms: number) {
    return interval(ms);
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