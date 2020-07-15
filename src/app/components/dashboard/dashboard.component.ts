import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';  
import { FieldService } from '../../services/field.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {tap, startWith, debounceTime, switchMap, map, filter } from 'rxjs/operators';
import * as fruitList from '../../../assets/mock/fruits.js';
export interface PeriodicElement {
  item:string;
  fullname: string;
  amount: number;
  unit: number;
  total:number;
}
export interface CustomerList {
  fullname: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private fruitIconList:any = [];
  sellingHistory:any = [];
  sellingDetails = new FormControl();
  displayedColumns: string[] = ['item', 'fullname', 'amount', 'unit', 'total','date'];
  dataSource:any;
  customerList:any = [];
  calculateTotal:any;
  myControl = new FormControl();
  options: CustomerList[] = [
    {
      fullname: "Shelley"
    },
  ];
  filteredOptions: Observable<any>;

  constructor(private _router: Router,private _fs:FieldService, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  
  ngOnInit() {
    this.getSellingfruitDetails();
    this.fruitIconList = fruitList.default;

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.fullname),
    //     map(fullname => fullname ? this._filter(fullname) : this.options.slice())
    //   );

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this._filter(value))
      );

  }
  // displayFn(customerList?: CustomerList): string | undefined {
  //   return customerList ? customerList.fullname : undefined;
  // }

  // private _filter(fullname: string): CustomerList[] {
  //   const filterValue = fullname.toLowerCase();

  //   return this.options.filter(option => option.fullname.toLowerCase().indexOf(filterValue) === 0);
  // }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    console.log('this.customerList',this.customerList, filterValue);
    return this.customerList.filter(option => option.fullname.toLowerCase().includes(value))
  }

  selectFruit(user_id : any){
    let url: string = "/item/" + user_id
    this._router.navigateByUrl(url);
  }

  getSellingfruitDetails(){
    this._fs.getSellingHistory('sellingHistory').subscribe(
      res => {
        this.sellingHistory = res;
        this.dataSource = this.sellingHistory;
        console.log('this.dataSource',this.dataSource);
        this.customerList = this.dataSource;
        
        let uniqueCustomerName = this.dataSource.reduceRight(function (r, a) {
          r.some(function (b) { return a.fullname === b.fullname; }) || r.push(a);
          return r;
        }, []);
        this.customerList = uniqueCustomerName;
      }
    );
  }
  getUserDetail(cusName){
    let filteredCustomerData = [];
    this.sellingHistory.map((customer)=>{
      if(customer.fullname == cusName){
        filteredCustomerData.push(customer);
        this.dataSource = filteredCustomerData;
        filteredCustomerData.map((rate) =>{
          console.log('rate',rate);
          let total = 0;
          this.calculateTotal = (total + rate.total);
        })
        console.log('calTotal',this.calculateTotal);
      }
    })
  }

}
