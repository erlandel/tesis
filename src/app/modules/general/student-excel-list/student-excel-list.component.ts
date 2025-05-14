import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IconComponent } from 'src/icons/icon.component';
import { CommonModule } from '@angular/common';
import { Excel } from 'src/interface/excel';


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

  excel: Excel[] = [];

  // filterCriteria = {
  //   commission: '',
  //   lastName: '',
  //   firstName: '',
  //   idCard: '',
  //   index: '',
  //   preuniversity: '',
  //   province: '',
  //   municipality: '',
  //   skinColor: '',
  //   gender: '',
  //   entryWay: '',
  //   nationality: '',
  //   careerRequest: '',
  //   preselection: ''
  // };

  isFilterMenuVisible: boolean = false;



  ngOnInit() {
    // Cuando el backend esté listo, descomentar esta línea
    this.loadExcel();
    console.log('Students loaded');
  }

  toggleFilterMenu() {
    this.isFilterMenuVisible = !this.isFilterMenuVisible;
  }

  async loadExcel() {
    try {
      const response = await fetch('http://localhost:3000/excel');
      if (response.status === 200) {
        const data: Excel[] = await response.json();
        this.excel = data;
        // console.log('Students loaded:', this.students);
      } else {
        // this.messagesService.error('Error al cargar los datos del excel');
        this.loadMockData();
      }

    } catch (error) {
      console.error('Error al cargar estudiantes:', error);
    }
  }


  loadMockData() {
    console.log('Cargando datos de prueba');
    this.excel = [
      {
        id: '1',
        name: 'Listado de Estudiantes 2023',
        modelType: 'Estudiantes',
        description: 'Listado completo de estudiantes del curso 2023'
      },
      {
        id: '2',
        name: 'Matrícula Primer Año',
        modelType: 'Matrícula',
        description: 'Datos de matrícula de estudiantes de primer año'
      },
      {
        id: '3',
        name: 'Evaluaciones Finales',
        modelType: 'Evaluaciones',
        description: 'Registro de evaluaciones finales del semestre'
      },
      {
        id: '4',
        name: 'Asistencia Mensual',
        modelType: 'Asistencia',
        description: 'Control de asistencia mensual de todos los grupos'
      },
      {
        id: '5',
        name: 'Becados 2023',
        modelType: 'Becas',
        description: 'Listado de estudiantes con beca universitaria'
      }
    ];
  }

  navigateToAddStudent() {
    this.router.navigate(['/general/import-student-data']);
  }

  showStudent(id: string) {
    this.router.navigate(['/general/show-student-excel', id]);
  }




}