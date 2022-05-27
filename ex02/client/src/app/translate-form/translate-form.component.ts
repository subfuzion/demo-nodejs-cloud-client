import {Component} from '@angular/core';

import {TranslateService} from "../translate.service";
import {Translation} from '../translate';

@Component({
  selector: 'app-translate-form',
  templateUrl: './translate-form.component.html',
  styleUrls: ['./translate-form.component.css']
})
export class TranslateFormComponent {

  languages = ['vi'];

  model = new Translation();

  submitted = false;

  constructor(private translateService: TranslateService) {
  }

  async onSubmit() {
    this.submitted = true;
    this.model.translation = await this.translateService.getTranslation(this.model.text, this.model.target);
  }

  newTranslation() {
    this.model = new Translation();
  }

  get empty() {
    return !this.model.text && !this.model.target
  }

  async getTranslation() {
    this.model.translation = await this.translateService.getTranslation(
      this.model.text, this.model.target);
  }

  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(translateForm)}}
  showFormControls(form: any) {
    return form && form.controls.text; // Dr. IQ }
  }

  /////////////////////////////

}
