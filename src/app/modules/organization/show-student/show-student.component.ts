import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { StudentDetail } from '../interface/StudentDetail';
import { IconComponent } from "../../../../icons/icon.component";


@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.scss'],
  standalone: true, 
  imports: [IconComponent]
})
export class ShowStudentComponent implements OnInit {
  student: StudentDetail = {
    comision: 'Comisión CIP LH(CIP - La Habana)',
    ci: '06092367688',
    apellidos: 'Arias Quispe',
    nombres: 'Erick Manuel',
    direccion: 'Edif 0-70 apto 2, Zona 7, Alamar',
    provincia: 'La Habana',
    municipio: 'La Habana del Este',
    colorPiel: 'Mestizo',
    sexo: 'Masculino',
    nacionalidad: 'Cubana',
    indiceAcademico: '98.46',
    preuniversitario: '2300-VLADIMIR I. LENIN',
    viaIngreso: 'Institutos Preuniversitarios',
    procedencia: '',
    situacion: '',
    escolaridadMadre: 'Preuniversitario',
    escolaridadPadre: 'Preuniversitario',
    ocupacionMadre: 'Administrativo',
    ocupacionPadre: 'Cuenta propista',
    sectorMadre: 'Estatal',
    sectorPadre: 'Privado'
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ci = params['ci'];
      console.log('CI:'+ci);
      if (ci) {
        this.http.get<StudentDetail>(`${environment.apiUrl}/students/${ci}`).subscribe({
          next: (data) => {
            this.student = data;
          },
          error: (error) => {
            console.log('CI:'+ci);
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