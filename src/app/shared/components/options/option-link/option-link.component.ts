import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-option-link',
  templateUrl: './option-link.component.html',
  styleUrls: ['./option-link.component.scss'],
})
export class OptionLinkComponent implements OnInit, OnDestroy {
  @Input() index: any;
  pathSub: Subscription;
  path: string;
  navigateTo: string;
  name: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pathSub = this.route.url.subscribe((url) => {
      this.path = url[0].path;
    });
    this.name =
      this.index.name || `${this.index.firstName} ${this.index.lastName}`;
  }

  onClick() {
    if (this.path === 'students') {
      this.navigateTo = '../student';
    }
    if (this.path === 'courses') {
      this.navigateTo = '../course';
    }
    this.router.navigate([this.navigateTo, this.index.id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(): void {
    if (this.pathSub) this.pathSub.unsubscribe();
  }
}
