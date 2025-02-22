import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { LayoutsModule } from './layouts/layouts.module';
import { AssignmentModule } from './modules/assignment/assignment.module';
import { ExaminationModule } from './modules/examination/examination.module';
import { GeneralModule } from './modules/general/general.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

registerLocaleData(en);

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,        
        ReactiveFormsModule,
        CoreModule,
        LayoutsModule,
        AssignmentModule,
        ExaminationModule,
        GeneralModule,        
        OrganizationModule],
    providers: [{ provide: NZ_I18N, useValue: en_US },
    provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule {}
