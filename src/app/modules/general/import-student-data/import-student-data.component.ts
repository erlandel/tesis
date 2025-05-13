import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';

@Component({
  selector: 'app-import-student-data',
  templateUrl: './import-student-data.component.html',
  styleUrls: ['./import-student-data.component.scss']
})
export class ImportStudentDataComponent implements OnInit {
  importForm!: FormGroup;
  selectedFile: File | null = null;
  fileAnalyzed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messagesService: FortesMessagesService
  ) {}

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
      this.selectedFile = input.files[0];
      // Actualizar el valor del control 'file' en el formulario
      this.importForm.get('file')?.setValue(this.selectedFile);
    }
  }

  onAnalyzeFile(): void {
    if (!this.selectedFile) {
      this.messagesService.error('Por favor, seleccione un archivo Excel para analizar');
      // alert('Por favor, seleccione un archivo Excel para analizar.');
      return;
    }

    // Check if the file is an Excel file
    const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();
    if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
       this.messagesService.error('Ha ocurrido un error al procesar la solicitud');
      alert('Por favor, seleccione un archivo Excel válido (.xlsx o .xls).');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('/api/analyze-excel', formData, { observe: 'response' }).subscribe({
      next: (response) => {
        if (response.status !== 200) {
          console.error('Error analyzing file. Status:', response.status);
          alert('Error al analizar el archivo. Por favor, inténtelo de nuevo.');
        } else {
          this.fileAnalyzed = true;
          alert('Archivo analizado correctamente.');
          console.log('File analyzed successfully:', response.body);
        }
      },
      error: (error) => {
        this.fileAnalyzed = true;
        console.error('Error analyzing file:', error);
        alert('Error al analizar el archivo. Por favor, inténtelo de nuevo.');
      }
    });
  }

  onSubmit(action: string = 'create'): void {
    console.log('Form data:', this.importForm.value);
    console.log('File:', this.selectedFile);
    
    // Verificar que el formulario sea válido, que exista un archivo seleccionado y que haya sido analizado
    if (this.importForm.valid && this.selectedFile && this.fileAnalyzed) {
      const formData = new FormData();
      formData.append('name', this.importForm.get('name')?.value);
      formData.append('modelType', this.importForm.get('modelType')?.value);
      formData.append('description', this.importForm.get('description')?.value);
      formData.append('file', this.selectedFile);

      this.http.post('/api/import-student-data', formData).subscribe({
        next: (response) => {
          console.log('Data imported successfully:', response);
          alert('Datos importados correctamente');

          if (action === 'create') {
            this.importForm.reset();
            this.selectedFile = null;
            this.fileAnalyzed = false; // Reiniciar el estado de análisis
          } else if (action === 'create-list') {
            this.router.navigate(['/general/student-excel-list']);
          }
        },
        error: (error) => {
          console.error('Error importing data:', error);
          alert('Error al importar los datos. Por favor, inténtelo de nuevo.');
        }
      });
    } else {
      // Mensaje más específico según lo que falta
      if (!this.fileAnalyzed) {
        alert('Por favor, analice el archivo Excel antes de continuar.');
      } else {
        alert('Por favor, complete todos los campos requeridos.');
      }
    }
  }

  navigateToList(): void {
    this.router.navigate(['/general/student-excel-list']);
  }
}