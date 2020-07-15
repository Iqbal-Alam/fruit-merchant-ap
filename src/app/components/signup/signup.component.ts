import { Component, OnInit, ViewChild } from '@angular/core';
declare var jQuery: any;
import { FieldService } from '../../services/field.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registrationForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private _fs:FieldService,private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {

    this.registrationForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required]
    });
  }



  registration(){
    console.log(this.registrationForm.value);
    this._fs.sendPostRequest(this.registrationForm.value, 'register').subscribe(
      res => {
        if(res.successMessage){
          this._snackBar.open(res.successMessage, 'Dismiss', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });  
        }
        else if(res.errorMessage){
          this._snackBar.open(res.errorMessage, 'Dismiss', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }); 
        }
        else{
          this._snackBar.open(res, 'Dismiss', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          console.log('res',res);
        }
      }
    );
  }

}
