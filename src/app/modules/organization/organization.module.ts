import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './test/organization.component';
import { OrganizationStudentComponent } from './create-student/organization-student.component';
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
    component: OrganizationStudentComponent,
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
  declarations: [OrganizationComponent, OrganizationStudentComponent,ListStudentComponent], 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,  
  ],
  exports: [RouterModule], 
 
})
export class OrganizationModule {}
