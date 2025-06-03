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


  isFilterMenuVisible: boolean = false;
  
  // Objeto para controlar la visibilidad de cada filtro
  isFilterVisible = {
    comision: false,
    nombre: false,
    tipoModelo: false,
    usuario: false
  };
  
  // Método para verificar si algún filtro está visible
  isAnyFilterVisible(): boolean {
    return this.isFilterVisible.comision || 
           this.isFilterVisible.nombre || 
           this.isFilterVisible.tipoModelo || 
           this.isFilterVisible.usuario;
  }
  
  // Método para activar/desactivar la visibilidad de un filtro específico
  toggleFilterVisibility(filtro: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    switch(filtro) {
      case 'comision':
        this.isFilterVisible.comision = isChecked;
        break;
      case 'nombre':
        this.isFilterVisible.nombre = isChecked;
        break;
      case 'tipoModelo':
        this.isFilterVisible.tipoModelo = isChecked;
        break;
      case 'usuario':
        this.isFilterVisible.usuario = isChecked;
        break;
    }
  }
  
  // Propiedad para controlar los filtros avanzados
  showAdvancedFilters = false;



  // Propiedad para almacenar los datos originales
  excelOriginal: Excel[] = [];
  
  ngOnInit() {
    // Cuando el backend esté listo, descomentar esta línea
    this.loadExcel();
    console.log('Students loaded');
    
    // Agregar el event listener para detectar clics fuera del menú
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }
  
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
  
  // No olvidar limpiar el event listener cuando se destruye el componente
  ongOnDestroy(): void {
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
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

  async loadExcel() {
    try {
      const response = await fetch('http://localhost:3000/Excel/getAllExcel');
      if (response.status === 200) {       
        const responseData = await response.json();
        // Extraer el array de la propiedad 'data'
        if (responseData && responseData.data && Array.isArray(responseData.data)) {
          console.log('Datos obtenidos:', responseData.data);
          this.excel = responseData.data;
          // Guardar una copia de los datos originales
          this.excelOriginal = [...responseData.data];
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



  downloadExcelById(id: string, name: string) {
    const url = `http://localhost:3000/Excel/downloadExcel/${id}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo descargar el archivo');
        }
        return response.blob();
      })
      .then(blob => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${name}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
      })
      .catch(error => {
        console.error('Error al descargar el archivo:', error);
        this.messagesService.error('Error al descargar el archivo');
      });
  }

  // Propiedades individuales para cada filtro
  showComisionFilter = false;
  showNombreFilter = false;
  showTipoModeloFilter = false;
  showUsuarioFilter = false;

  // Método para alternar un filtro específico
  toggleFilter(filtro: string): void {
    switch(filtro) {
      case 'comision':
        this.showComisionFilter = !this.showComisionFilter;
        break;
      case 'nombre':
        this.showNombreFilter = !this.showNombreFilter;
        break;
      case 'tipoModelo':
        this.showTipoModeloFilter = !this.showTipoModeloFilter;
        break;
      case 'usuario':
        this.showUsuarioFilter = !this.showUsuarioFilter;
        break;
    }
  }

  // Método para alternar todos los filtros a la vez
  toggleAllFilters(): void {
    // Si todos están visibles, ocultar todos
    if (this.showComisionFilter && this.showNombreFilter && 
        this.showTipoModeloFilter && this.showUsuarioFilter) {
      this.showComisionFilter = false;
      this.showNombreFilter = false;
      this.showTipoModeloFilter = false;
      this.showUsuarioFilter = false;
    } else {
      // Si alguno está oculto, mostrar todos
      this.showComisionFilter = true;
      this.showNombreFilter = true;
      this.showTipoModeloFilter = true;
      this.showUsuarioFilter = true;
    }
  }

  // Datos de ejemplo para los selects basados en la imagen
  comisiones: string[] = ['Comision de ejemplo'];
  tiposModelo: string[] = ['Registro académico', 'Registro de asistencia','Datos de matrícula', 'Calificaciones'];
  usuarios: string[] = ['Usurio de ejemplo'];

  // Método para restablecer todos los filtros
  // Método para aplicar los filtros
  applyFilters(): void {
    console.log('Aplicando filtros...');
    
    // Obtener los valores de los filtros
    const comision1 = (document.getElementById('comision1') as HTMLSelectElement)?.value || '';
    const comision2 = this.showComisionFilter ? (document.getElementById('comision2') as HTMLSelectElement)?.value || '' : '';
    
    const nombre1 = (document.getElementById('nombre1') as HTMLInputElement)?.value?.toLowerCase() || '';
    const nombre2 = this.showNombreFilter ? (document.getElementById('nombre2') as HTMLInputElement)?.value?.toLowerCase() || '' : '';
    
    const tipoModelo1 = (document.getElementById('tipo-modelo1') as HTMLSelectElement)?.value || '';
    const tipoModelo2 = this.showTipoModeloFilter ? (document.getElementById('tipo-modelo2') as HTMLSelectElement)?.value || '' : '';
    
    const usuario1 = (document.getElementById('usuario1') as HTMLSelectElement)?.value || '';
    const usuario2 = this.showUsuarioFilter ? (document.getElementById('usuario2') as HTMLSelectElement)?.value || '' : '';
    
    console.log('Valores de filtros:', { comision1, comision2, nombre1, nombre2, tipoModelo1, tipoModelo2, usuario1, usuario2 });
    console.log('Datos originales:', this.excelOriginal);
    
    // Filtrar los datos
    this.excel = this.excelOriginal.filter(item => {
      // Verificar que item no sea null o undefined
      if (!item) {
        console.log('Item es null o undefined');
        return false;
      }
      
      console.log('Filtrando item:', item);
      
      // Comisión - Verificar si existe la propiedad commission o usar un valor por defecto
      const comisionValue = 'Comision de ejemplo'; 
      // Comisión: el item pasa si coincide con el primer filtro O con el segundo filtro
      const comisionMatch = 
        (comision1 === '' || comisionValue.toLowerCase().includes(comision1.toLowerCase())) ||
        (comision2 !== '' && comisionValue.toLowerCase().includes(comision2.toLowerCase()));
      
      // Nombre - Verificar que item.name exista
      // Nombre: el item pasa si coincide con el primer filtro O con el segundo filtro
      const nombreMatch = 
        (nombre1 === '' || (item.name && item.name.toLowerCase().includes(nombre1))) ||
        (nombre2 !== '' && item.name && item.name.toLowerCase().includes(nombre2));
      
      // Tipo de modelo - Verificar que item.modelType exista
      // Tipo de modelo: el item pasa si coincide con el primer filtro O con el segundo filtro
      const tipoModeloMatch = 
        (tipoModelo1 === '' || (item.modelType && item.modelType.toLowerCase().includes(tipoModelo1.toLowerCase()))) ||
        (tipoModelo2 !== '' && item.modelType && item.modelType.toLowerCase().includes(tipoModelo2.toLowerCase()));
      
      // Usuario - Verificar si existe la propiedad user o usar un valor por defecto
      const usuarioValue = 'Usuario de ejemplo';
      // Usuario: el item pasa si coincide con el primer filtro O con el segundo filtro
      const usuarioMatch = 
        (usuario1 === '' || usuarioValue.toLowerCase().includes(usuario1.toLowerCase())) ||
        (usuario2 !== '' && usuarioValue.toLowerCase().includes(usuario2.toLowerCase()));
      
      console.log('Resultados de coincidencia:', { comisionMatch, nombreMatch, tipoModeloMatch, usuarioMatch });
      
      // Devolver true solo si TODOS los tipos de filtros coinciden
      // Pero dentro de cada tipo, basta con que coincida con el primer O el segundo filtro
      return comisionMatch && nombreMatch && tipoModeloMatch && usuarioMatch;
    });
    
    console.log('Datos filtrados:', this.excel);
  }

  // Modificar el método resetFilters para también restablecer la visibilidad de los filtros

  resetFilters(): void {
    // Limpiar los valores de los selects e inputs
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      select.selectedIndex = 0;
    });
    
    // Limpiar inputs
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
      (input as HTMLInputElement).value = '';
    });
    
    // Restaurar los datos originales si es necesario
    this.excel = [...this.excelOriginal];
    
  }












}
