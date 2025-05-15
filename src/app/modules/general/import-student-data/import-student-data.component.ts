import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';
import { StudentData } from 'src/interface/studentData';
import { ErrorReportService } from 'src/app/services/error-report.service';

@Component({
  selector: 'app-import-student-data',
  templateUrl: './import-student-data.component.html',
  styleUrls: ['./import-student-data.component.scss']
})
export class ImportStudentDataComponent implements OnInit {
  importForm!: FormGroup;
  selectedFile: File | null = null;
  fileAnalyzed: boolean = false;


  // Mapeo de columnas del Excel a propiedades de StudentData
  columnMapping = {
    ciStudent: 0,         // Carné de identidad
    lastName: 1,          // Apellidos
    firstName: 2,         // Nombre(s)
    address: 3,           // Dirección particular
    province: 4,          // Provincia de residencia
    municipality: 5,      // Municipio de residencia
    skinColor: 6,         // Color de piel
    gender: 7,            // Sexo
    preUniversity: 8,     // Preuniversitario
    admissionMethod: 9,   // Vía de ingreso
    academicIndex: 10,    // Índice académico
    origin: 11,           // Procedencia
    situation: 12,        // Situación
    motherEducation: 13,  // Escolaridad de la madre
    fatherEducation: 14,  // Escolaridad del padre
    motherOccupation: 15, // Ocupación de la madre
    fatherOccupation: 16, // Ocupación del padre
    motherWorkSector: 17, // Sector Laboral de la madre
    fatherWorkSector: 18  // Sector Laboral del padre
  };




  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messagesService: FortesMessagesService,
    private errorReportService: ErrorReportService,
  ) { }

  ngOnInit(): void {
    this.importForm = this.fb.group({
      name: ['', Validators.required],
      modelType: ['', Validators.required],
      description: [''],
      file: [null, Validators.required]
    });
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension !== 'xlsx') {
        this.messagesService.error('Por favor, seleccione solo archivos con formato .xlsx');
        // Limpiar el input de archivo
        input.value = '';
        this.selectedFile = null;
        this.importForm.get('file')?.setValue(null);
        return;
      }

      this.selectedFile = file;
      // Actualizar el valor del control 'file' en el formulario
      this.importForm.get('file')?.setValue(this.selectedFile);
    }
  }

  async onAnalyzeFile(): Promise<void> {
    if (!this.selectedFile) {
      this.messagesService.error('Por favor, seleccione un archivo Excel para analizar');
      return;
    }

    // Check if the file is an Excel file
    const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();
    if (fileExtension !== 'xlsx') {
      this.messagesService.error('Por favor, seleccione un archivo Excel válido (.xlsx).');
      return;
    }

    // Leer el archivo Excel y extraer los datos
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        // Importar la biblioteca xlsx dinámicamente
        import('xlsx').then(async (XLSX) => {  // Añadir async aquí
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Obtener la primera hoja del libro
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convertir la hoja a JSON
          const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

          // Buscar la fila que contiene los encabezados reales
          let headerRowIndex = -1;
          for (let i = 0; i < rawData.length; i++) {
            const row = rawData[i];
            // Buscar la fila que contiene "Carné de identidad" como primer elemento
            if (row && row[0] === "Carné de identidad") {
              headerRowIndex = i;
              break;
            }
          }

          // Si no se encuentra la fila de encabezados, mostrar un error
          if (headerRowIndex === -1) {
            this.messagesService.error('No se encontró la estructura esperada en el archivo Excel. Verifique que el archivo tenga el formato correcto.');
            return;
          }

          // Obtener solo las filas de datos (después de los encabezados)
          const dataRows = rawData.slice(headerRowIndex + 1);

          // Filtrar filas vacías o que no tengan un carné de identidad válido
          const filteredRows = dataRows.filter(row => {
            // Verificar que la fila tenga datos y que el carné de identidad no esté vacío
            return row &&
              row.length > 0 &&
              row[this.columnMapping.ciStudent] &&
              typeof row[this.columnMapping.ciStudent] === 'string' &&
              row[this.columnMapping.ciStudent].length > 0 &&
              // Verificar que no sea una fila de instrucciones o metadatos
              !row[this.columnMapping.ciStudent].includes('Introducir') &&
              !row[this.columnMapping.ciStudent].includes('Período') &&
              !row[this.columnMapping.ciStudent].includes('Datos');
          });

          // Transformar los datos según el mapeo
          const studentDataArray: StudentData[] = filteredRows.map((row: unknown) => {
            const typedRow = row as any[];
            const studentData: StudentData = {
              ciStudent: typedRow[this.columnMapping.ciStudent]?.toString() || '',
              nationality: 'Cubana', // Establecer un valor predeterminado o mapear si existe
              lastName: typedRow[this.columnMapping.lastName]?.toString() || '',
              firstName: typedRow[this.columnMapping.firstName]?.toString() || '',
              address: typedRow[this.columnMapping.address]?.toString() || '',
              province: typedRow[this.columnMapping.province]?.toString() || '',
              municipality: typedRow[this.columnMapping.municipality]?.toString() || '',
              skinColor: typedRow[this.columnMapping.skinColor]?.toString() || '',
              gender: typedRow[this.columnMapping.gender]?.toString() || '',
              preUniversity: typedRow[this.columnMapping.preUniversity]?.toString() || '',
              admissionMethod: typedRow[this.columnMapping.admissionMethod]?.toString() || '',
              motherEducation: typedRow[this.columnMapping.motherEducation]?.toString() || '',
              fatherEducation: typedRow[this.columnMapping.fatherEducation]?.toString() || '',
              motherOccupation: typedRow[this.columnMapping.motherOccupation]?.toString() || '',
              fatherOccupation: typedRow[this.columnMapping.fatherOccupation]?.toString() || '',
              motherWorkSector: typedRow[this.columnMapping.motherWorkSector]?.toString() || '',
              fatherWorkSector: typedRow[this.columnMapping.fatherWorkSector]?.toString() || '',
              academicIndex: typedRow[this.columnMapping.academicIndex]?.toString() || '',
              origin: typedRow[this.columnMapping.origin]?.toString() || '',
              situation: typedRow[this.columnMapping.situation]?.toString() || ''
            };

            return studentData;
          });
          // Imprimir el arreglo filtrado en la consola
          console.log('Array filtrado de estudiantes:', JSON.stringify(studentDataArray, null, 2));
          console.log('Número total de estudiantes válidos:', studentDataArray.length);

          // Enviar los datos transformados al backend para análisis
          try {
            const response = await fetch('http://localhost:3000/students/FilterwithFuc', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(studentDataArray)  
            });

            if (response.status === 200 || response.status === 201) {
              // Enviar el arreglo de estudiantes al backend
              const secondResponse = await fetch('http://localhost:3000/students/AddStudentsbyExcel', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentDataArray)  
              });

              if (secondResponse.status === 200 || secondResponse.status === 201) {
                this.fileAnalyzed = true;
                this.messagesService.success('Estudiantes registrados correctamente.');
              } else {
                this.fileAnalyzed = false;
                this.messagesService.error('Error al procesar los datos. Por favor, inténtelo de nuevo.');
              }
            } else {
              const errorData = await response.json();          
     
              // Guardar los datos de error en el servicio
              this.errorReportService.setErrorData(errorData);
              
              // Navegar al componente de reporte de errores
              this.router.navigate(['/general/error-report-excel']);           
            
            
            console.log('la respuesta: ' + response.status);
            
            }
          } catch (error) {
            console.error('Error en las peticiones:', error);
            this.messagesService.error('Error al procesar los datos. Por favor, inténtelo de nuevo.');
          }
        });
      } catch (error) {
        console.error('Error reading Excel file:', error);
        this.messagesService.error('Error al leer el archivo Excel.');
      }
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      this.messagesService.error('Error al leer el archivo.');
    };

    // Leer el archivo como ArrayBuffer
    reader.readAsArrayBuffer(this.selectedFile);
  }







  async onSubmit(action: string = 'create'): Promise<void> {
    console.log('Form data:', this.importForm.value);
    
    // Verificar que el formulario sea válido y que el archivo haya sido analizado
    if (this.importForm.valid && this.fileAnalyzed) {
      // Crear objeto con los datos del formulario (sin el archivo)
      const formData = {
        name: this.importForm.get('name')?.value,
        modelType: this.importForm.get('modelType')?.value,
        description: this.importForm.get('description')?.value
      };

      try {
        const response = await fetch('http://localhost:3000/Excel/createExcel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.status === 200 || response.status === 201) {    
          
          this.messagesService.success('Datos del excel registrados correctamente');
          
          // Guardar el archivo Excel en la carpeta "excel"
          // if (this.selectedFile) {
          //   this.saveExcelFile(this.selectedFile, formData.name);
          // }

          if (action === 'create') {
            this.importForm.reset();
            this.selectedFile = null;
            this.fileAnalyzed = false; // Reiniciar el estado de análisis
          } else if (action === 'create-list') {
            this.router.navigate(['/general/student-excel-list']);
          }
        } else {
          this.messagesService.error('Error al registrar los datos del excel');
        }
      } catch (error) {
        console.error('Error importing data:', error);
      }
    } else {
      // Mensaje más específico según lo que falta
      if (!this.fileAnalyzed) {
        this.messagesService.error('Por favor, analice el archivo Excel antes de continuar.');
      } else {
        this.messagesService.error('Por favor, complete todos los campos requeridos.');
      }
    }
  }

  private saveExcelFile(file: File, fileName: string): void {
  
  }

  navigateToList(): void {
    this.router.navigate(['/general/student-excel-list']);
  }
}