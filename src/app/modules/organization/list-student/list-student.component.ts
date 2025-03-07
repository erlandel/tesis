import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Student } from '../interface/Student';



@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListStudentComponent implements OnInit {
  students: Student[] = [
    {
      commission: 'Comisión CIP LH(CIP - La Habana)',
      lastName: 'Antune Leyva',
      firstName: 'Keren Ruth',
      idCard: '06092067474',
      index: 98.75,
      preuniversity: '2300-VLADIMIR I. LENIN',
      province: 'La Habana',
      gender: 'Femenino',
      entryWay: 'Institutos Preuniversitarios'
    },
    {
      commission: 'Comisión CIP LH(CIP - La Habana)',
      lastName: 'Arias Quispe',
      firstName: 'Erick Manuel',
      idCard: '06092367688',
      index: 98.46,
      preuniversity: '2300-VLADIMIR I. LENIN',
      province: 'La Habana',
      gender: 'Masculino',
      entryWay: 'Institutos Preuniversitarios'
    },
    {
      commission: 'Comisión CIP LH(CIP - La Habana)',
      lastName: 'Atienza Moya',
      firstName: 'Rafael',
      idCard: '06071367720',
      index: 98.16,
      preuniversity: '2300-VLADIMIR I. LENIN',
      province: 'La Habana',
      gender: 'Masculino',
      entryWay: 'Institutos Preuniversitarios'
    }
  ];

  isFilterMenuVisible: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // Cuando el backend esté listo, descomentar esta línea
    // this.loadStudents();
    console.log('Students loaded');
  }

  toggleFilterMenu() {
    this.isFilterMenuVisible = !this.isFilterMenuVisible;
  }

  loadStudents() {
    this.http.get<Student[]>('http://localhost:3000/api/students').subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (error) => {
        console.error('Error al cargar estudiantes:', error);
      }
    });
  }
  
  navigateToAddStudent() {     
    this.router.navigate(['/organization/create-student']);
  }

  showStudent(idCard: string) {
    this.router.navigate(['/organization/show-student', idCard]);
  }
}