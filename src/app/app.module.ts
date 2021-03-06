import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,MatListModule,MatGridListModule, MatCardModule, MatButtonModule, MatDialogModule, MatCheckboxModule,
         MatFormFieldModule,MatInputModule,MatSlideToggleModule,MatSelectModule,MatProgressSpinnerModule,MatSliderModule } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { baseURL } from './shared/baseurl';

import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';

import {AppRoutingModule} from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,MatToolbarModule,FlexLayoutModule,MatListModule,MatGridListModule,
    MatCardModule,MatButtonModule,AppRoutingModule,MatDialogModule,FormsModule,MatFormFieldModule,MatInputModule,
    MatCheckboxModule,ReactiveFormsModule,MatSlideToggleModule,MatSelectModule,MatProgressSpinnerModule,MatSliderModule,
    HttpModule
  ],
  providers: [DishService,
         PromotionService,
        LeaderService,
        {provide: 'BaseURL', useValue: baseURL},
      ProcessHttpmsgService],
        entryComponents: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
