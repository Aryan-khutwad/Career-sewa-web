import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { authState } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userData$!: Observable<any>;
  private destroy$ = new Subject<void>();

  constructor(
    private auth: Auth,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userData$ = authState(this.auth).pipe(
      switchMap(user => {
        if (!user) {
          return of(null);
        }
        return this.authService.getUserData(user.uid);
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
