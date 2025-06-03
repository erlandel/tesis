import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Para hacer las peticiones HTTP
import { Router } from '@angular/router';
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';
import { StudentData } from '../../../../interface/studentData';
import { StudentDataFUC } from 'src/interface/studentDataFUC';


@Component({
  selector: 'app-organization-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit {
  studentForm!: FormGroup;
  apiUrl = 'http://localhost:3000/students';
  isFormVisible: boolean = false; // Bandera para controlar la visibilidad del formulario
  isValidCiStudent: boolean = true; // Bandera para controlar si la cédula es válida

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private messagesService: FortesMessagesService) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      ciStudent: ['', [Validators.required, this.ciStudentValidator]],
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
  }



  // Validador personalizado para verificar que idCard tenga exactamente 11 dígitos
  ciStudentValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.length !== 11) {      
      return { invalidIdCard: true }; // Marca el campo como inválido si no tiene 11 dígitos
    }
    return null;
  }


  onKeyDown(event: KeyboardEvent): void {
    const input = (event.target as HTMLInputElement).value;
    const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'];
    const isNumber = /[0-9]/.test(event.key);
    if (input.length >= 11 && isNumber) {
      event.preventDefault();
    }
    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }


  onAutocomplete(): void {
    const ciStudent = this.studentForm.get('ciStudent')?.value;

    // Verifica si el idCard tiene 11 dígitos antes de hacer la solicitud
    if (this.studentForm.get('ciStudent')?.invalid) {
      this.messagesService.error('Verifica que el carné de identidad tenga 11 dígitos');
      this.isValidCiStudent = false;
      return;
    }

    // Si la cédula es válida, entonces realizamos la petición
    this.isValidCiStudent = true;

    this.http.get<StudentDataFUC>(`http://localhost:3000/students/FUC/${ciStudent}`).subscribe({
      next: (data) => {    

        const transformedData: Partial<StudentData> = {
          ciStudent: data.identidad_numero,
          nationality: data.ciudadania,
          lastName: `${data.primer_apellido} ${data.segundo_apellido ?? ''}`.trim(),
          firstName: `${data.primer_nombre} ${data.segundo_nombre ?? ''}`.trim(),
          address: data.direccion,
          province: data.provincia_residencia,
          municipality: data.municipio_residencia,
          skinColor: data.color_piel,
          gender: data.sexo,
          // Los demás campos se quedan como están (vacíos o a completar después)
        };
        this.studentForm.patchValue(transformedData);
        this.isFormVisible = true;
      },
      error: (error) => {
        console.log('Error al obtener los datos:', error);
        if (error.status === 404) {
          this.messagesService.error('No se encontró ningún estudiante con ese carné de identidad');
        } else if (error.status === 0) {
          this.messagesService.error('No se pudo conectar con el servidor. Verifique su conexión');
        } else {
          this.messagesService.error('Error al obtener los datos del estudiante. Por favor, intente nuevamente');
        }
      },
    });
  }

  // Función para manejar el submit del formulario
  async onSubmit(action: string = 'create'): Promise<void> {
    console.log(this.studentForm.value)
    if (this.studentForm.valid) {
      const formData = this.studentForm.getRawValue();
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        console.log(response.status);
        if (response.status === 200) {
          this.messagesService.success('Estudiante registrado correctamente');

          if (action === 'create') {
            this.isFormVisible = false;
            this.studentForm.reset();
          }
          if (action === 'create-list') {
            this.router.navigate(['/organization/list-student']);
          }
        } else if (response.status === 400) {
          this.messagesService.error('Estudiante ya existe');
        } else {
          this.messagesService.error('Error al registrar el estudiante');
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    } else {
      this.messagesService.error('Por favor, completa todos los campos obligatorios.');

      // Opcional: Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.studentForm.controls).forEach(key => {
        const control = this.studentForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  navigateToAddStudent() {
    this.router.navigate(['/organization/list-student']);
  }

}
