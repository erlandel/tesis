import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Para hacer las peticiones HTTP
import { ActivatedRoute, Router } from '@angular/router';
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';
import { StudentData } from '../interface/studentData';



@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  studentForm!: FormGroup;
  apiUrl = 'https://api.ejemplo.com/estudiantes';


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messagesService: FortesMessagesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      ciStudent: [{ value: '', disabled: true }, Validators.required],
      nationality: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      firstName: [{ value: '', disabled: true }, Validators.required],
      address: [{ value: '', disabled: true }, Validators.required],
      province: [{ value: '', disabled: true }, Validators.required],
      municipality: [{ value: '', disabled: true }, Validators.required],
      skinColor: [{ value: '', disabled: true }],
      gender: [{ value: '', disabled: true }, Validators.required],
      preUniversity: ['', Validators.required],
      admissionMethod: ['', Validators.required],
      motherEducation: ['', Validators.required],
      fatherEducation: ['', Validators.required],
      motherOccupation: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      motherWorkSector: ['', Validators.required],
      fatherWorkSector: ['', Validators.required],
    });
      // Capturar el parámetro de la ruta
  const ciStudent = this.route.snapshot.paramMap.get('ci');

  if (ciStudent) {
    this.loadStudentData(ciStudent);
  }

  }

  loadStudentData(ciStudent: string): void {
    this.http.get<StudentData>(`/api/student/${ciStudent}`).subscribe({
      next: (data) => {
        this.studentForm.patchValue({
          ciStudent: ciStudent,
          nationality: data.nationality,
          lastName: data.lastName,
          firstName: data.firstName,
          address: data.address,
          province: data.province,
          municipality: data.municipality,
          skinColor: data.skinColor,
          gender: data.gender,
          preUniversity: data.preUniversity,
          admissionMethod: data.admissionMethod,
          motherEducation: data.motherEducation,
          fatherEducation: data.fatherEducation,
          motherOccupation: data.motherOccupation,
          fatherOccupation: data.fatherOccupation,
          motherWorkSector: data.motherWorkSector,
          fatherWorkSector: data.fatherWorkSector,
        });
      },
      error: (error) => {
        console.error('Error al cargar datos del estudiante:', error);
        this.studentForm.patchValue({
          ciStudent: ciStudent,
          nationality: 'Cubano',
          lastName: 'Pérez',
          firstName: 'Juan',
          address: 'Calle 8 #456, La Habana',
          province: 'La Habana',
          municipality: 'Centro Habana',
          skinColor: 'Trigueño',
          gender: 'Masculino',
        
          // estos deben coincidir con el valor del <option value="...">
          preUniversity: 'pre-university-1', // o 'pre-university-2' según el caso
          admissionMethod: 'method-1',
        
          motherEducation: 'university',
          fatherEducation: 'secondary',
        
          motherOccupation: 'engineer',
          fatherOccupation: 'engineer',
        
          motherWorkSector: 'health',
          fatherWorkSector: 'education',
        });
        
      }
    });
  }
  

  updateStudentFUC() {   
    const ciStudent = this.studentForm.get('ciStudent')!.value; // Use the non-null assertion operator
    this.http.post('URL_DEL_BACKEND', { ciStudent })
      .subscribe({
        next: (response: any) => {
          console.log('Student updated successfully', response);
          // Suponiendo que la respuesta contiene los datos actualizados
          this.studentForm.patchValue({
            nationality: response.data.nationality,
            lastName: response.data.lastName,
            firstName: response.data.firstName,
            address: response.data.address,
            province: response.data.province,
            municipality: response.data.municipality,
            skinColor: response.data.skinColor,
            gender: response.data.gender,
          });
        },
        error: (error) => {        
          console.error('Error updating student', error);
        }
      });
  }
  // Función para manejar el submit del formulario
  onSubmit(action: string = 'create'): void {
    if (this.studentForm.valid) {
      this.http.post(this.apiUrl, this.studentForm.value, { observe: 'response' }).subscribe({
        next: (response) => {
          if (response.status === 200) {

            if (action === 'create') {
              this.messagesService.success('La operación se completó correctamente');

              this.studentForm.reset();
            }
            // Redirigir solo si la acción es 'create-list'
            if (action === 'create-list') {
              this.router.navigate(['/organization/list-student']);
            }
          }
        },
        error: (error) => {
          console.error('Error al enviar el formulario:', error);
          alert('Hubo un error al enviar los datos. Inténtalo de nuevo.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  navigateToAddStudent() {
    this.router.navigate(['/organization/list-student']);
  }

}
