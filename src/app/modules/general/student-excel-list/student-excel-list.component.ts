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
      const response = await fetch('http://localhost:3000/Excel/getAllExcel');
      if (response.status === 200) {       
        const responseData = await response.json();
        // Extraer el array de la propiedad 'data'
        if (responseData && responseData.data && Array.isArray(responseData.data)) {
          this.excel = responseData.data;
      
        } else {
          console.error('Formato de respuesta inesperado:', responseData);
          this.messagesService.error('Error: Formato de datos incorrecto');
       
        }
      } else {
        this.messagesService.error('Error al cargar los datos del excel');
     
      }
    } catch (error) {
      console.error('Error al cargar estudiantes:', error);
      this.messagesService.error('Error al conectar con el servidor');
    
    }
  }

  navigateToAddStudent() {
    this.router.navigate(['/general/import-student-data']);
  }

  showStudent(id: string) {
    this.router.navigate(['/general/show-student-excel', id]);
  }




}