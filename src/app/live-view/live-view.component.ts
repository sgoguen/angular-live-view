import { Component, Input } from "@angular/core";
import { BehaviorSubject, Subscription, Observable } from "rxjs";

@Component({
  selector: "live-view",
  templateUrl: "./live-view.component.html",
  styleUrls: ["./live-view.component.css"]
})
export class LiveViewComponent {
  @Input() value: any;
  @Input() maxDepth = 4;
  private _keys: string[] | null = null;

  get childDepth() {
    return this.maxDepth - 1;
  }

  get objectType() {
    return getObjectType(this.value);
  }

  get keys(): string[] {
    const input = this.value;

    if (this._keys !== null) {
      return this._keys;
    }
    if (Array.isArray(input)) {
      this._keys = this.getArrayKeys(input);
    } else if (typeof input === "object") {
      this._keys = Object.keys(input);
    } else {
      this._keys = [];
    }
    return this._keys;
  }

  private getArrayKeys(array: any[]) {
    const keys = new Set<string>();
    for (let i = 0; i < array.length; i++) {
      const e = array[i];
      if (typeof e === "object") {
        Object.keys(e).forEach(k => {
          keys.add(k);
        });
      }
    }

    return Array.from(keys);
  }
}

export function getObjectType(i: any) {
  if (i == null) {
    return "null";
  } else if (i === undefined) {
    return "undefined";
  }

  if (i instanceof Observable) {
    return "observable";
  }

  if (i instanceof Date) {
    return "date";
  } else if (typeof i === "boolean") {
    return "bool";
  } else if (typeof i === "number") {
    return "number";
  } else if (typeof i === "string") {
    return "string";
  } else if (typeof i === "function") {
    return "function";
  } else if (Array.isArray(i)) {
    return "array";
  } else if (typeof i === "object") {
    return "object";
  }
  return "unknown";
}
