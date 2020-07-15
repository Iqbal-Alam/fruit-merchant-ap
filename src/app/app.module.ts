import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialThemeModule } from './material-theme.module';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItementryComponent } from './components/itementry/itementry.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import {DialogueComponent} from './components/dialogue/dialogue.component';
import { InputComponent } from './core/components/input/input.component';
import { ButtonComponent } from './core/components/button/button.component';
import { SelectComponent } from './core/components/select/select.component';
import { DateComponent } from './core/components/date/date.component';
import { RadiobuttonComponent } from './core/components/radiobutton/radiobutton.component';
import { CheckboxComponent } from './core/components/checkbox/checkbox.component';
import { DynamicFormComponent } from './core/components/dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './core/components/dynamic-field/dynamic-field.directive';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    ItementryComponent,
    PagenotfoundComponent,
    DialogueComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFormComponent,
    DynamicFieldDirective
  ],
  entryComponents: [
    DialogueComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    FormsModule,
    ReactiveFormsModule,
    MaterialThemeModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  exports: [DynamicFormComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}