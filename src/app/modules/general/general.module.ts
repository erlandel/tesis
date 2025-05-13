import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralComponent } from './test/general.component';
import { Routes, RouterModule } from '@angular/router';
import { ImportStudentDataComponent } from './import-student-data/import-student-data.component';
import { IconComponent } from 'src/icons/icon.component';
import { ListStudentExcelComponent } from './student-excel-list/student-excel-list.component';
import { ShowStudentExcelComponent } from './show-student-excel/show-student-excel.component';


const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
  },
  {
    path: 'import-student-data',
    component: ImportStudentDataComponent,
  },
  {
    path: 'student-excel-list',
    component: ListStudentExcelComponent,
  },
  {
    path: 'show-student-excel/:ciStudent',
    component: ShowStudentExcelComponent,
  }
];

@NgModule({
  declarations: [GeneralComponent, ImportStudentDataComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IconComponent
]
})
export class GeneralModule { }
