import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IconComponent } from "../../../../icons/icon.component";
import { Excel } from '../../../../interface/excel';
import { FortesMessagesService } from 'src/app/core/messages/FortesMessages.service';



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
    private messagesService: FortesMessagesService,
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
      const response = await fetch(`http://localhost:3000/Excel/getExcelbyId/${id}`);
      if (response.status === 200) {     
        const responseJson = await response.json();   
          this.excel = responseJson.data;      
      } else {        
        this.messagesService.error('Error fetching student:', response.statusText);
      }
    } catch (error) {     
      console.error('Error fetching student:', error);
    }
  }

  navigate() {
    this.router.navigate(['/general/student-excel-list']);
  }
}