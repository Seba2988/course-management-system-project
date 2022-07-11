import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isProfessor: boolean;
  constructor() {}

  ngOnInit(): void {
    this.isProfessor = sessionStorage.getItem('professorToken') ? true : false;
  }
}
