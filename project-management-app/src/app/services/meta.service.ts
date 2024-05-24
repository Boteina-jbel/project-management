import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private title: Title, private meta: Meta) {}

  setTitle(title: string) {
    if (title) {
      this.title.setTitle(title);
    }
  }

  setDescription(description: string) {
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
    }
  }
}