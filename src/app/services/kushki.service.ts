import { Injectable, Renderer2, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

const baseUrl = 'http://localhost:4200';

@Injectable({
  providedIn: 'root'
})
export class KushkiService {

  constructor() { }

}

class MyService {

  constructor(@Inject(DOCUMENT) private _document: Document) { }

  /**
  * Set JSON-LD Microdata on the Document Body.
  *
  * @param renderer2             The Angular Renderer
  * @param data                  The data for the JSON-LD script
  * @returns                     Void
  */

  public setJsonLd(renderer2: Renderer2, data: any): void {
    let script = renderer2.createElement('script');
    script.type = 'text/javascript';
    renderer2.appendChild(this._document.body, script);
  }

}