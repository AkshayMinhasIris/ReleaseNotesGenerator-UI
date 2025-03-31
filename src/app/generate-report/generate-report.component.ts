
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [MatCardModule, CommonModule, FormsModule],
  templateUrl: './generate-report.component.html',
  styleUrl: './generate-report.component.css'
})
export class GenerateReportComponent implements OnInit {
  selectedPRs: any ;
  report: any;

  constructor(private apiService: ApiService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    // this.selectedPRs = navigation?.extras.state?.['prs'] || [];
    this.selectedPRs= {
      'title' : 'put the checkbox' ,
      "description": 'responsive checkbox is added'
    } 
  }

  ngOnInit() {
    if (this.selectedPRs.length) {
      debugger;
      this.apiService.generateReport(this.selectedPRs).subscribe((data) => {
        // this.report = data;
        this.report = true;
      });
    }
  }
}
