import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Student } from '../interface/student';
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private messagesService: FortesMessagesService,
    private modal: NzModalService
  ) { }

  students: Student[] = [];

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
        const data: Student[] = await response.json();
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
    this.router.navigate(['/organization/create-student']);
  }

  showStudent(ciStudent: string) {
    this.router.navigate(['/organization/show-student', ciStudent]);
  }

  editStudent(ciStudent: string) {
    this.router.navigate(['/organization/edit-student', ciStudent]);
  }

  deleteStudent(ciStudent: string) {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este estudiante?',
      nzContent: 'Esta acción no se puede deshacer',
      nzOkText: 'Eliminar',
      nzOkType: 'primary',
      nzOnOk: async () => {
        try {
          const response = await fetch(`http://localhost:3000/students/${ciStudent}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            this.loadStudents();
            this.messagesService.success('Estudiante eliminado correctamente');
          } else {
            const errorData = await response.json();
            console.error('Error al eliminar estudiante:', errorData);
            this.messagesService.error('Error al eliminar el estudiante');
          }
        } catch (error) {
          console.error('Error al eliminar estudiante:', error);
          this.messagesService.error('Error al eliminar el estudiante');
        }
      },
      nzCancelText: 'Cancelar'
    });
  }

  
}