import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './test/organization.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { ListStudentComponent } from './list-student/list-student.component';
import { ShowStudentComponent } from './show-student/show-student.component';

const routes: Routes = [
  {
    path: 'organization',
    component: OrganizationComponent,
  },
  {
    path: 'create-student',
    component: CreateStudentComponent,
  },
  {
    path: 'list-student',
    component: ListStudentComponent,
  },
  {
    path: 'show-student/:ci',
    component: ShowStudentComponent
  },
];

@NgModule({
  declarations: [OrganizationComponent, CreateStudentComponent,ListStudentComponent], 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,  
  ],
  exports: [RouterModule], 
 
})
export class OrganizationModule {}
