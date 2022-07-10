import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as DTO from '../../../models/DTO.model';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],
})
export class AbsenceComponent implements OnInit {
  @Input() absence: DTO.Absence;
  @Input() isStudent: boolean;
  color = {
    isPresent: false,
    isFuture: false,
    isStudent: false,
  };
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.color.isFuture = new Date(this.absence.class.date) > new Date();
    this.color.isPresent = this.absence.isPresent;
    this.color.isStudent = this.isStudent;
  }
  onClick() {
    if (!this.color.isFuture && this.isStudent)
      this.router.navigate(['absence', this.absence.id], {
        relativeTo: this.route,
      });
  }
}
