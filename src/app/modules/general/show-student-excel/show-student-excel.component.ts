import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IconComponent } from "../../../../icons/icon.component";
import { Excel } from '../../../../interface/excel';



@Component({
  selector: 'app-show-student',
  templateUrl: './show-student-excel.component.html',
  styleUrls: ['./show-student-excel.component.scss'],
  standalone: true,
  imports: [IconComponent]
})
export class ShowStudentExcelComponent implements OnInit {
  excel: Excel = {
    name: '',
    modelType: '',
    description: '',
    id: ''
  };



  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.fetchStudent(id);
      }
    });
  }

  async fetchStudent(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/students/${id}`);
      if (response.ok) {
        const data = await response.json();
        this.excel = data;
      } else {
        console.log('CI:' + id);
        console.error('Error fetching student:', response.statusText);
      }
    } catch (error) {
      console.log('CI:' + id);
      console.error('Error fetching student:', error);
    }
  }

  navigate() {
    this.router.navigate(['/general/student-excel-list']);
  }
}