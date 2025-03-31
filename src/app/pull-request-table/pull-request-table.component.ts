import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-pull-request-table',
  standalone: true,
  imports: [MatCardModule, MatCheckboxModule, CommonModule, FormsModule, MatTableModule,  MatIconModule],
  templateUrl: './pull-request-table.component.html',
  styleUrl: './pull-request-table.component.css'
})

  export class PullRequestTableComponent implements OnInit {
    pullRequests: any[] = [];
    displayedColumns: string[] = ['select', 'title', 'details', 'edit'];
    // selectedPRs: any[] = [];
    selectedPRs: any ;
    allSelected = false;
    report : any;
    generatedreporttext = false;
   
    constructor(private apiService: ApiService, private router: Router, private dialog: MatDialog) {
      
    }
   
    ngOnInit() {
      debugger;
      this.apiService.getPullRequests().subscribe((prs) => {
        this.pullRequests = prs.map((pr) => ({ ...pr, selected: false }));
      });
    }
   
    selectAll(checked: boolean) {
      this.allSelected = checked;
      this.pullRequests.forEach((pr) => (pr.selected = checked));
      this.updateSelectedPRs();
    }
   
    updateSelectedPRs() {
      this.selectedPRs = this.pullRequests.filter(pr => pr.selected);
    }
   
    generateReport() {

     // const selectedPRs 
      this.selectedPRs = this.pullRequests
          .filter(pr => pr.selected)
          .map(pr => ({
            title: pr.title,
            description: pr.body
          }));

          // Check if at least one PR is selected
          if (this.selectedPRs.length === 0) {
            alert('Please select at least one pull request.');
            return;
          }
      
      this.apiService.generateReport(this.selectedPRs).subscribe((data: any[]) => {
        debugger;
        if (data && data.length > 0) {
          this.generatedreporttext = true;
          this.report = data.map((item, index) => ({
            id: index + 1,
            details: item.Details || 'No details available',
            features: item.Features || 'No features available',
            impact: item.Impact || 'No impact described'
          }));
        } else {
          this.report = [];
          this.generatedreporttext = false;
        }
        console.log(data);
      });
    }
   
    editPR(pr: any) {
      const newTitle = prompt('Edit PR Title', pr.title) || pr.title;
      const newDescription = prompt('Edit PR Description', pr.body) || pr.body;
      pr.title = newTitle;
      pr.body = newDescription;
    }

    // editPR(pr: any): void {
    //   const dialogRef = this.dialog.open(EditDialogComponent, {
    //     width: '600px',
    //     maxHeight: '90vh',
    //     position: { top: '50%', left: '50%' },   // Centering the dialog
    //     panelClass: 'custom-dialog-container',
    //     data: { title: pr.title, body: pr.body }
    //   });
    
    //   // Center the dialog precisely by translating it
    //   dialogRef.afterOpened().subscribe(() => {
    //     const dialogElement = document.querySelector('.mat-dialog-container') as HTMLElement;
    //     if (dialogElement) {
    //       dialogElement.style.transform = 'translate(-50%, -50%)';   // Centering fix
    //     }
    //   });
    
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       pr.title = result.title;
    //       pr.body = result.description;
    //     }
    //   });
    // }
    
    

}
