import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { IconComponent } from "../../../../icons/icon.component";
import { ShowStudent } from '../interface/showStudent';


@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.scss'],
  standalone: true,
  imports: [IconComponent]
})
export class ShowStudentComponent implements OnInit {
  student: ShowStudent = {
    ciStudent: '06092367688',
    lastName: 'Arias Quispe',
    firstName: 'Erick Manuel',
    address: 'Edif 0-70 apto 2, Zona 7, Alamar',
    province: 'La Habana',
    municipality: 'La Habana del Este',
    skinColor: 'Mestizo',
    gender: 'Masculino',
    nationality: 'Cubana',
    preUniversity: '2300-VLADIMIR I. LENIN',
    admissionMethod: 'Institutos Preuniversitarios',
    motherEducation: 'Preuniversitario',
    fatherEducation: 'Preuniversitario',
    motherOccupation: 'Administrativo',
    fatherOccupation: 'Cuenta propista',
    motherWorkSector: 'Estatal',
    fatherWorkSector: 'Privado',
    indiceAcademico: '98.46', // Atributo adicional
    procedencia: 'Procedencia de ejemplo', // Atributo adicional
    situacion: 'Situación de ejemplo', // Atributo adicional
    comision: 'Comisión de ejemplo' // Atributo adicional
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ci = params['ci'];
      console.log('CI:' + ci);
      if (ci) {
        this.http.get<ShowStudent>(`${environment.apiUrl}/students/${ci}`).subscribe({
          next: (data) => {
            this.student = data;
          },
          error: (error) => {
            console.log('CI:' + ci);
            console.error('Error fetching student:', error);
          }
        });
      }
    });
  }

  navigate() {
    this.router.navigate(['/organization/list-student']);
  }
}