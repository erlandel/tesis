import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Para hacer las peticiones HTTP
import { ActivatedRoute, Router } from '@angular/router';
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';
import { StudentData } from '../../../../interface/studentData';
import { StudentDataFUC } from 'src/interface/studentDataFUC';



@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  studentForm!: FormGroup;
  apiUrl = 'http://localhost:3000/students/';


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
    const ciStudent = this.route.snapshot.paramMap.get('ciStudent');

    if (ciStudent) {
      this.loadStudentData(ciStudent);
    }

  }

  loadStudentData(ciStudent: string): void {
    this.http.get<StudentData>(`http://localhost:3000/students/${ciStudent}`).subscribe({
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

      }
    });
  }


  updateStudentFUC(): void {
    const ciStudent = this.studentForm.get('ciStudent')!.value;
  
    this.http.get<StudentDataFUC>(`http://localhost:3000/students/FUC/${ciStudent}`).subscribe({
      next: (response) => {
        console.log(response);
        const transformedData: Partial<StudentData> = {
          ciStudent: response.identidad_numero,
          nationality: response.ciudadania,
          lastName: `${response.primer_apellido} ${response.segundo_apellido ?? ''}`.trim(),
          firstName: `${response.primer_nombre} ${response.segundo_nombre ?? ''}`.trim(),
          address: response.direccion,
          province: response.provincia_residencia,
          municipality: response.municipio_residencia,
          skinColor: response.color_piel,
          gender: response.sexo,
        };
  
        this.studentForm.patchValue(transformedData);
      },
      error: (error) => {
        console.error('Error updating student', error);
      }
    });
  }
  


  // Función para manejar el submit del formulario
  async onSubmit(shouldNavigate: boolean = true): Promise<void> {
    if (this.studentForm.valid) {
      try {
        const formData = this.studentForm.getRawValue(); // Obtiene los valores incluyendo los campos deshabilitados
        const ciStudent = formData.ciStudent; // Extraemos el ciStudent para usarlo en la URL

        console.log('FormData:', formData);
        const response = await fetch(`${this.apiUrl}${ciStudent}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          this.messagesService.success('La operación se completó correctamente');
          if (shouldNavigate) {
            this.router.navigate(['/organization/list-student']);
          }
        } else {
          this.messagesService.error('Error al actualizar el estudiante');
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    } else {
      this.messagesService.error('Por favor, completa todos los campos obligatorios.');
    }
  }

  navigateToAddStudent() {
    this.router.navigate(['/organization/list-student']);
  }

}
