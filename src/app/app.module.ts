import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion'; 
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { CreditrefmanagmentComponent } from './pages/creditrefmanagment/creditrefmanagment.component';
import { StatistiqueComponent } from './pages/statistique/statistique.component';
import { StatistiqueEntrepriseComponent } from './pages/statistique-entreprise/statistique-entreprise.component';
import { StatistiqueMagasinComponent } from './pages/statistique-magasin/statistique-magasin.component';
import { UpdateproduitComponent } from './pages/produit-management/updateproduit/updateproduit.component';









@NgModule({
  declarations: [
    AppComponent,

    










    
 


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
