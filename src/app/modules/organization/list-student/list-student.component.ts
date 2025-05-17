import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StudentData } from '../../../../interface/studentData';

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

  ngOnInit() {
    // Cuando el backend esté listo, descomentar esta línea
    this.loadStudents();
    console.log('Students loaded');
    
    // Agregar el event listener para detectar clics fuera del menú
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  // Agregar método ngOnDestroy para limpiar el event listener cuando el componente se destruya
  ngOnDestroy() {
    // Eliminar el event listener cuando el componente se destruya
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
  }

  students: StudentData[] = [];
  estudentOriginal: StudentData[] = [];
  isFilterMenuVisible: boolean = false;
  
  // Variables para los filtros
  isFilterVisible = {
    commission: false,
    lastName: false,
    firstName: false,
    ciStudent: false,
    academicIndex: false,
    preUniversity: false,
    province: false,
    gender: false,
    admissionMethod: false
  };
  
  // Variables para mostrar filtros dobles
  showCommissionFilter = false;
  showLastNameFilter = false;
  showFirstNameFilter = false;
  showCiStudentFilter = false;
  showAcademicIndexFilter = false;
  showPreUniversityFilter = false;
  showProvinceFilter = false;
  showGenderFilter = false;
  showAdmissionMethodFilter = false;
  
  // Datos para los selectores
  commissions: string[] = ['Comisión 1', 'Comisión 2', 'Comisión 3'];
  preUniversities: string[] = ['IPVCE', 'IPUEC', 'Otro'];
  provinces: string[] = ['La Habana', 'Matanzas', 'Villa Clara', 'Cienfuegos', 'Sancti Spíritus'];
  genders: string[] = ['Masculino', 'Femenino'];
  admissionMethods: string[] = ['Concurso', 'Orden 18', 'Extranjero'];
  
  // Propiedad para controlar los filtros avanzados
  showAdvancedFilters = false;

  // Método para manejar clics fuera del menú
  handleOutsideClick(event: MouseEvent): void {
    const filterMenu = document.querySelector('.filter-menu');
    const filterButton = document.querySelector('.action-button');
    
    // Si el menú está visible y el clic no fue ni en el menú ni en el botón
    if (this.isFilterMenuVisible && 
        filterMenu && !filterMenu.contains(event.target as Node) && 
        filterButton && !filterButton.contains(event.target as Node)) {
      this.isFilterMenuVisible = false;
    }
  }

  toggleFilterVisibility(filterName: string, event: any): void {
    this.isFilterVisible[filterName as keyof typeof this.isFilterVisible] = event.target.checked;
  }

  toggleFilter(filterName: string): void {
    switch(filterName) {
      case 'commission':
        this.showCommissionFilter = !this.showCommissionFilter;
        break;
      case 'lastName':
        this.showLastNameFilter = !this.showLastNameFilter;
        break;
      case 'firstName':
        this.showFirstNameFilter = !this.showFirstNameFilter;
        break;
      case 'ciStudent':
        this.showCiStudentFilter = !this.showCiStudentFilter;
        break;
      case 'academicIndex':
        this.showAcademicIndexFilter = !this.showAcademicIndexFilter;
        break;
      case 'preUniversity':
        this.showPreUniversityFilter = !this.showPreUniversityFilter;
        break;
      case 'province':
        this.showProvinceFilter = !this.showProvinceFilter;
        break;
      case 'gender':
        this.showGenderFilter = !this.showGenderFilter;
        break;
      case 'admissionMethod':
        this.showAdmissionMethodFilter = !this.showAdmissionMethodFilter;
        break;
    }
  }

  isAnyFilterVisible(): boolean {
    return Object.values(this.isFilterVisible).some(value => value);
  }

  aplicarFiltros(): void {
    // Obtener los valores de los filtros
    const commission1 = (document.getElementById('commission1') as HTMLSelectElement).value;
    const commission2 = this.showCommissionFilter ? (document.getElementById('commission2') as HTMLSelectElement).value : '';
    
    const lastName1 = (document.getElementById('lastName1') as HTMLInputElement).value.toLowerCase();
    const lastName2 = this.showLastNameFilter ? (document.getElementById('lastName2') as HTMLInputElement).value.toLowerCase() : '';
    
    const firstName1 = (document.getElementById('firstName1') as HTMLInputElement).value.toLowerCase();
    const firstName2 = this.showFirstNameFilter ? (document.getElementById('firstName2') as HTMLInputElement).value.toLowerCase() : '';
    
    const ciStudent1 = (document.getElementById('ciStudent1') as HTMLInputElement).value;
    const ciStudent2 = this.showCiStudentFilter ? (document.getElementById('ciStudent2') as HTMLInputElement).value : '';
    
    const academicIndex1 = (document.getElementById('academicIndex1') as HTMLInputElement).value;
    const academicIndex2 = this.showAcademicIndexFilter ? (document.getElementById('academicIndex2') as HTMLInputElement).value : '';
    
    const preUniversity1 = (document.getElementById('preUniversity1') as HTMLSelectElement).value;
    const preUniversity2 = this.showPreUniversityFilter ? (document.getElementById('preUniversity2') as HTMLSelectElement).value : '';
    
    const province1 = (document.getElementById('province1') as HTMLSelectElement).value;
    const province2 = this.showProvinceFilter ? (document.getElementById('province2') as HTMLSelectElement).value : '';
    
    const gender1 = (document.getElementById('gender1') as HTMLSelectElement).value;
    const gender2 = this.showGenderFilter ? (document.getElementById('gender2') as HTMLSelectElement).value : '';
    
    const admissionMethod1 = (document.getElementById('admissionMethod1') as HTMLSelectElement).value;
    const admissionMethod2 = this.showAdmissionMethodFilter ? (document.getElementById('admissionMethod2') as HTMLSelectElement).value : '';
    
    // Filtrar los datos
    this.students = this.estudentOriginal.filter(item => {
      // Comisión
      const commissionMatch = 
        (commission1 === '' || 'Comision de ejemplo'.includes(commission1)) &&
        (commission2 === '' || 'Comision de ejemplo'.includes(commission2));
      
      // Apellidos
      const lastNameMatch = 
        (lastName1 === '' || item.lastName.toLowerCase().includes(lastName1)) &&
        (lastName2 === '' || item.lastName.toLowerCase().includes(lastName2));
      
      // Nombre
      const firstNameMatch = 
        (firstName1 === '' || item.firstName.toLowerCase().includes(firstName1)) &&
        (firstName2 === '' || item.firstName.toLowerCase().includes(firstName2));
      
      // Carné de identidad
      const ciStudentMatch = 
        (ciStudent1 === '' || item.ciStudent.includes(ciStudent1)) &&
        (ciStudent2 === '' || item.ciStudent.includes(ciStudent2));
      
      // Índice académico
      const academicIndexMatch = 
        (academicIndex1 === '' || (item.academicIndex?.includes(academicIndex1) ?? false)) &&
        (academicIndex2 === '' || (item.academicIndex?.includes(academicIndex2) ?? false));
      
      // Preuniversitario
      const preUniversityMatch = 
        (preUniversity1 === '' || item.preUniversity.includes(preUniversity1)) &&
        (preUniversity2 === '' || item.preUniversity.includes(preUniversity2));
      
      // Provincia
      const provinceMatch = 
        (province1 === '' || item.province.includes(province1)) &&
        (province2 === '' || item.province.includes(province2));
      
      // Sexo
      const genderMatch = 
        (gender1 === '' || item.gender.includes(gender1)) &&
        (gender2 === '' || item.gender.includes(gender2));
      
      // Vía de ingreso
      const admissionMethodMatch = 
        (admissionMethod1 === '' || item.admissionMethod.includes(admissionMethod1)) &&
        (admissionMethod2 === '' || item.admissionMethod.includes(admissionMethod2));
      
      // Devolver true solo si todos los filtros coinciden
      return commissionMatch && lastNameMatch && firstNameMatch && ciStudentMatch && 
             academicIndexMatch && preUniversityMatch && provinceMatch && 
             genderMatch && admissionMethodMatch;
    });
  }

  resetFilters(): void {
    // Limpiar los valores de los selects
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      select.selectedIndex = 0;
    });
    
    // Limpiar inputs
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
      (input as HTMLInputElement).value = '';
    });
    
    // Restaurar los datos originales
    this.students = [...this.estudentOriginal];    
  }

  toggleAllFilters(): void {
    // Verificar si todos los filtros visibles tienen su versión doble activada
    const allDoubleFiltersActive = Object.keys(this.isFilterVisible).every(key => {
      const filterKey = key as keyof typeof this.isFilterVisible;
      if (!this.isFilterVisible[filterKey]) {
        return true; // Ignorar los filtros que no están visibles
      }
      
      // Verificar si el filtro doble está activo
      switch(key) {
        case 'commission': return this.showCommissionFilter;
        case 'lastName': return this.showLastNameFilter;
        case 'firstName': return this.showFirstNameFilter;
        case 'ciStudent': return this.showCiStudentFilter;
        case 'academicIndex': return this.showAcademicIndexFilter;
        case 'preUniversity': return this.showPreUniversityFilter;
        case 'province': return this.showProvinceFilter;
        case 'gender': return this.showGenderFilter;
        case 'admissionMethod': return this.showAdmissionMethodFilter;
        default: return true;
      }
    });
    
    // Activar o desactivar los filtros dobles solo para los filtros visibles
    Object.keys(this.isFilterVisible).forEach(key => {
      const filterKey = key as keyof typeof this.isFilterVisible;
      if (this.isFilterVisible[filterKey]) {
        // Solo modificar los filtros que están visibles
        switch(key) {
          case 'commission':
            this.showCommissionFilter = !allDoubleFiltersActive;
            break;
          case 'lastName':
            this.showLastNameFilter = !allDoubleFiltersActive;
            break;
          case 'firstName':
            this.showFirstNameFilter = !allDoubleFiltersActive;
            break;
          case 'ciStudent':
            this.showCiStudentFilter = !allDoubleFiltersActive;
            break;
          case 'academicIndex':
            this.showAcademicIndexFilter = !allDoubleFiltersActive;
            break;
          case 'preUniversity':
            this.showPreUniversityFilter = !allDoubleFiltersActive;
            break;
          case 'province':
            this.showProvinceFilter = !allDoubleFiltersActive;
            break;
          case 'gender':
            this.showGenderFilter = !allDoubleFiltersActive;
            break;
          case 'admissionMethod':
            this.showAdmissionMethodFilter = !allDoubleFiltersActive;
            break;
        }
      }
    });
  }

  toggleFilterMenu(event?: MouseEvent): void {
    // Detener la propagación para evitar que el clic en el botón cierre inmediatamente el menú
    if (event) {
      event.stopPropagation();
    }
    this.isFilterMenuVisible = !this.isFilterMenuVisible;
  }
  
  // Método para alternar la visibilidad de los filtros avanzados
  toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  async loadStudents() {
    try {
      const response = await fetch('http://localhost:3000/students');
      if (response.status === 200) {
        const data: StudentData[] = await response.json();
        this.students = data;
        this.estudentOriginal = [...data]; // Guardar una copia para los filtros
        // console.log('Students loaded:', this.students);
      } else {
        this.messagesService.error('Error al cargar estudiantes');
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