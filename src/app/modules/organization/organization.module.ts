import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './test/organization.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { ListStudentComponent } from './list-student/list-student.component';
import { ShowStudentComponent } from './show-student/show-student.component';
import { IconComponent } from 'src/icons/icon.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { NzModalModule } from 'ng-zorro-antd/modal';



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
    path: 'show-student/:ciStudent',
    component: ShowStudentComponent
  },
  {
    path: 'edit-student/:ciStudent',
    component: EditStudentComponent,
  },

];

@NgModule({
  declarations: [OrganizationComponent, CreateStudentComponent,ListStudentComponent,EditStudentComponent], 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    IconComponent
],
  exports: [RouterModule], 
 
})
export class OrganizationModule { }
