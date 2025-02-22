import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Para hacer las peticiones HTTP
import { Router } from '@angular/router';



// Definir la interfaz para los datos del estudiante
interface StudentData {
  nationality: string;
  lastName: string;
  firstName: string;
  address: string;
  province: string;
  municipality: string;
  skinColor?: string;
  gender: string;
  preUniversity: string;
  admissionMethod: string;
  motherEducation: string;
  fatherEducation: string;
  motherOccupation: string;
  fatherOccupation: string;
  motherWorkSector: string;
  fatherWorkSector: string;
}

@Component({
  selector: 'app-organization-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit {
  studentForm!: FormGroup;
  apiUrl = 'https://api.ejemplo.com/estudiantes';
  isFormVisible: boolean = false; // Bandera para controlar la visibilidad del formulario
  isValidIdCard: boolean = true; // Bandera para controlar si la cédula es válida

  constructor(private fb: FormBuilder, private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      idCard: ['', [Validators.required, this.idCardValidator]],
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
  idCardValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.length !== 11) {
      console.log(value);
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
    const idCard = this.studentForm.get('idCard')?.value;

    // Verifica si el idCard tiene 11 dígitos antes de hacer la solicitud
    if (this.studentForm.get('idCard')?.invalid) {
      this.isValidIdCard = false;  
      return;
    }

    // Si la cédula es válida, entonces realizamos la petición
    this.isValidIdCard = true;

    this.http.get<StudentData>(`/api/student/${idCard}`).subscribe({
      next: (data) => {
        // Si la petición es exitosa, asignamos los valores del backend a los campos del formulario
        this.studentForm.patchValue({
          nationality: data.nationality,
          lastName: data.lastName,
          firstName: data.firstName,
          address: data.address,
          province: data.province,
          municipality: data.municipality,
          skinColor: data.skinColor,
          gender: data.gender,
        });
        this.isFormVisible = true;
      },
      error: (error) => {

          // Cargar datos de prueba en caso de error
      this.studentForm.patchValue({
        nationality: "Cubano",
        lastName: "Pérez",
        firstName: "Juan",
        address: "Calle 8 #456, La Habana",
        province: "La Habana",
        municipality: "Centro Habana",
        skinColor: "Trigueño",
        gender: "Masculino",
      });

        this.isFormVisible = true;
        

        console.log('Error al obtener los datos:', error);
      },
    });
  }

  // Función para manejar el submit del formulario
  onSubmit(action: string = 'create'): void {
   
    if (this.studentForm.valid) {
      console.log('Enviando datos:', this.studentForm.value);
      
      this.http.post(this.apiUrl, this.studentForm.value).subscribe({
        next: (response) => {
          console.log('Formulario enviado con éxito:', response);
          alert('Datos enviados correctamente');

          if (action === 'create') {
            this.isFormVisible = false;
            this.studentForm.reset();
          }       
  
          // Redirigir solo si la acción es 'create-list'
          if (action === 'create-list') {
            this.router.navigate(['/organization/list-student']);
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
