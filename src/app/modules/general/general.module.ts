import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralComponent } from './test/general.component';
import { Routes, RouterModule } from '@angular/router';
import { ImportStudentDataComponent } from './import-student-data/import-student-data.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
  },
  {
    path: 'import-student-data',
    component: ImportStudentDataComponent,
  }
];

@NgModule({
  declarations: [GeneralComponent, ImportStudentDataComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneralModule { }
