import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Absence } from 'src/app/shared/models/Absence.model';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],
})
export class AbsenceComponent implements OnInit {
  @Input() absence: Absence;
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
