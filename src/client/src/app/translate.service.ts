import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor() { }

  async getTranslation(text: string, target: string): Promise<string> {
    const url = `${location.origin}/api/translate`;
    console.log(url);
    const res = await window.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        target: target,
      })
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      const translation = data.translation;
      console.log(`success: ${translation}`);
      return translation;
    } else {
      console.log(`error: ${data.message}`);
      return data.message;
    }
  }
}
