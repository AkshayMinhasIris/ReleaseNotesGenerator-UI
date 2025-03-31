import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PullRequestTableComponent } from './pull-request-table/pull-request-table.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PullRequestTableComponent, GenerateReportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hackathon-pr-ui';
}
