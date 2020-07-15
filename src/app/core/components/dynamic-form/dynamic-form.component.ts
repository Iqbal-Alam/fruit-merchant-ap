import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FieldConfig, Validator } from "../../services/field.interface";

@Component({
  selector: 'dynamic-form',
  template: `
  <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
  <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
  </ng-container>
  </form>
  `,
  styles: []
})
export class DynamicFormComponent implements OnInit {

  @Input() fields: FieldConfig[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // It creates the control dynamically and returns the FormGroup.
    this.form = this.createControl(); 
    console.log("fields",this.form, this.fields)
  }

  get value() {
    return this.form.value;
  }

  /* It loops through the configuration fields and creates a control for each field 
      with validations and then add these dynamically created controls to the form group. */
  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.fieldType === "button") return;
      const control = this.fb.control(
        field.fieldValue,
        this.bindValidations(field.fieldValidations || [])
      );
      group.addControl(field.fieldName, control);
    });
    return group;
  }

  // add validations to dynamic control.
  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  // if the form is valid, the parent submit method is fired otherwise validation errors will be displayed.
  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  // validate all form fields.
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

}
