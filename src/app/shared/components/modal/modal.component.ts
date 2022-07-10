import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() message: string;
  @Input() redirectUrl: string = null;
  @Output() messageChange = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onClose() {
    this.messageChange.emit(null);
    if (!this.redirectUrl) {
      // console.log(this.redirectUrl);
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      // console.log(this.redirectUrl);
      this.router.navigate([this.redirectUrl]);
    }
  }
}
