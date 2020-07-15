import { Component, OnInit, ViewChild } from '@angular/core';
declare var jQuery: any;
import { FieldService } from '../../services/field.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as fruitList from '../../../assets/mock/fruits.js';

@Component({
  selector: 'app-itementry',
  templateUrl: './itementry.component.html',
  styleUrls: ['./itementry.component.scss']
})
export class ItementryComponent implements OnInit {
  sellingForm:FormGroup;
  selectedFruit:any;
  totalAmount:any;
  selectedItemImage:any;
  constructor(private formBuilder: FormBuilder,private _fs:FieldService,private activatedRoute: ActivatedRoute,private _snackBar: MatSnackBar) { }
  
  ngOnInit() {
    this.sellingForm = this.formBuilder.group({
      item: [{value:'', disabled: true}],
      fullname: ['', Validators.required],
      amount: ['', Validators.required],
      unit: ['', Validators.required],
      total: [{value:'', disabled: true}]
    });

    this.selectedFruit = this.activatedRoute.snapshot.paramMap.get('id');
    const fruitIconList = fruitList.default;
    fruitIconList.map((icon)=>{
      // console.log('icon',icon);
      if(icon.fruitName == this.selectedFruit){
        this.selectedItemImage = icon.fruitUrl;
      }
    })
    // console.log('fruitList',this.selectedFruit);


    
    
  }

  getTotalAmount(){
    console.log(this.totalAmount = this.sellingForm.value.amount * this.sellingForm.value.unit);
  }

  enterItemDetails(){
    this.sellingForm.value.item = this.selectedFruit;
    this.sellingForm.value.total = this.totalAmount;
    console.log('this.sellingForm.value',this.sellingForm.value);
    this._fs.sendPostRequest(this.sellingForm.value, 'sell').subscribe(
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
