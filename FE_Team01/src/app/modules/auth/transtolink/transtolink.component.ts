import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-transtolink',
  templateUrl: './transtolink.component.html',
  styleUrls: ['./transtolink.component.scss']
})
export class TranstolinkComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.activeAcc().subscribe();
    // localStorage.removeItem("activeID");
    this.router.navigate(['/auth']);

  }

}
