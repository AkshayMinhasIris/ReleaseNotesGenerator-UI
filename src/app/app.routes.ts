import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';   
import { PullRequestTableComponent } from './pull-request-table/pull-request-table.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';


export const routes: Routes = [
    { path: '', redirectTo: '/pull-requests', pathMatch: 'full' },
    { path: 'pull-requests', component: PullRequestTableComponent },
    { path: 'generate-report', component: GenerateReportComponent },
    
];
