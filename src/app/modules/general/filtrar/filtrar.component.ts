import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IconComponent } from 'src/icons/icon.component';
import { CommonModule } from '@angular/common';
import { Excel } from 'src/interface/excel';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-list-student',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.scss'],
  standalone: true,
  imports: [IconComponent, CommonModule, FormsModule]
})
export class FiltrarComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private messagesService: FortesMessagesService,
    private modal: NzModalService
  ) { }

  excel: Excel[] = [];

  filterCriteria = {
    comision: '',
    nombre: '',
    tipoModelo: '',
    usuario: ''
  };

  isFilterMenuVisible: boolean = false;

  ngOnInit() {
    // Cuando el backend esté listo, descomentar esta línea
    // this.loadExcel();
  }

  toggleFilterMenu() {
    this.isFilterMenuVisible = !this.isFilterMenuVisible;
  }

  applyFilters() {
    // Implementar la lógica de filtrado cuando esté listo el backend
    console.log('Aplicando filtros:', this.filterCriteria);
  }

  resetFilters() {
    this.filterCriteria = {
      comision: '',
      nombre: '',
      tipoModelo: '',
      usuario: ''
    };
    // Recargar datos originales
    // this.loadExcel();
  }

  clearField(field: string) {
    this.filterCriteria[field as keyof typeof this.filterCriteria] = '';
  }
}