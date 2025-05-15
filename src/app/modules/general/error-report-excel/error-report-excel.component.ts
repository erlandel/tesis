import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IconComponent } from "../../../../icons/icon.component";
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';
import { CommonModule } from '@angular/common';
import { ErrorReportService } from 'src/app/services/error-report.service';

// Define the interface outside the class
interface StudentError {
  ciStudent: string;
  files: string[];
  // Otros campos que pueda tener
}

@Component({
  selector: 'app-show-student',
  templateUrl: './error-report-excel.component.html',
  styleUrls: ['./error-report-excel.component.scss'],
  standalone: true,
  imports: [IconComponent, CommonModule]
})
export class ErrorReportExcelComponent implements OnInit {

  errorStudents: StudentError[] = [];
  errorMessage: string = '';
  loading: boolean = true;
  
  // Mapeo de nombres de campos en inglés a español
  private fieldNamesMap: { [key: string]: string } = {
    'ciStudent': 'Carné de identidad',
    'lastName': 'Apellido',
    'firstName': 'Nombre',
    'address': 'Dirección particular',
    'province': 'Provincia de residencia',
    'municipality': 'Municipio de residencia',
    'skinColor': 'Color de piel',
    'gender': 'Sexo'
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messagesService: FortesMessagesService,
    private errorReportService: ErrorReportService
  ) { }

  ngOnInit() {
    this.loadErrorData();
  }

  loadErrorData() {
    const errorData = this.errorReportService.getErrorData();
    
    if (errorData) {
      this.errorMessage = errorData.message || 'Se encontraron errores en la importación de datos';
      this.errorStudents = errorData.students || [];
      this.loading = false;
    } else {
      this.messagesService.error('No hay datos de errores disponibles');
      this.loading = false;
    }
  }

  // Método para obtener el nombre del campo en español
  getFieldNameInSpanish(fieldName: string): string {
    return this.fieldNamesMap[fieldName] || fieldName;
  }

  navigate() {
    this.router.navigate(['/general/import-student-data']);
  }
}