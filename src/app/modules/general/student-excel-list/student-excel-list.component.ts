import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IconComponent } from 'src/icons/icon.component';
import { CommonModule } from '@angular/common';
import { StudentData } from '../../../../interface/studentData';


@Component({
  selector: 'app-list-student',
  templateUrl: './student-excel-list.component.html',
  styleUrls: ['./student-excel-list.component.scss'],
  standalone: true,
  imports: [IconComponent, CommonModule]
})
export class ListStudentExcelComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private messagesService: FortesMessagesService,
    private modal: NzModalService
  ) { }

  students: StudentData[] = [];

  filterCriteria = {
    commission: '',
    lastName: '',
    firstName: '',
    idCard: '',
    index: '',
    preuniversity: '',
    province: '',
    municipality: '',
    skinColor: '',
    gender: '',
    entryWay: '',
    nationality: '',
    careerRequest: '',
    preselection: ''
  };

  isFilterMenuVisible: boolean = false;



  ngOnInit() {
    // Cuando el backend esté listo, descomentar esta línea
    this.loadStudents();
    console.log('Students loaded');
  }

  toggleFilterMenu() {
    this.isFilterMenuVisible = !this.isFilterMenuVisible;
  }

  async loadStudents() {
    try {
      const response = await fetch('http://localhost:3000/students');
      if (response.status === 200) {
        const data: StudentData[] = await response.json();
        this.students = data;
        // console.log('Students loaded:', this.students);
      } else {
        this.messagesService.error('Estudiante registrado correctamente');
      }

    } catch (error) {
      console.error('Error al cargar estudiantes:', error);
    }
  }

  navigateToAddStudent() {
    this.router.navigate(['/general/import-student-data']);
  }

  showStudent(ciStudent: string) {
    this.router.navigate(['/general/show-student-excel', ciStudent]);
  }




}