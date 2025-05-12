import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { IconComponent } from "../../../../icons/icon.component";
import { ShowStudent } from '../interface/showStudent';
import { StudentData } from '../interface/studentData';


@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.scss'],
  standalone: true,
  imports: [IconComponent]
})
export class ShowStudentComponent implements OnInit {
  student: StudentData = {
    ciStudent: '',
    nationality: '',
    lastName: '',
    firstName: '',
    address: '',
    province: '',
    municipality: '',
    skinColor: '',
    gender: '',
    preUniversity: '',
    admissionMethod: '',
    motherEducation: '',
    fatherEducation: '',
    motherOccupation: '',
    fatherOccupation: '',
    motherWorkSector: '',
    fatherWorkSector: '',   
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ci = params['ci'];
      console.log('CI:' + ci);
      if (ci) {
        this.fetchStudent(ci);
      }
    });
  }

  async fetchStudent(ci: string) {
    try {
      const response = await fetch(`http://localhost:3000/students/${ci}`);
      if (response.ok) {
        const data = await response.json();
        this.student = data;
      } else {
        console.log('CI:' + ci);
        console.error('Error fetching student:', response.statusText);
      }
    } catch (error) {
      console.log('CI:' + ci);
      console.error('Error fetching student:', error);
    }
  }

  navigate() {
    this.router.navigate(['/organization/list-student']);
  }
}