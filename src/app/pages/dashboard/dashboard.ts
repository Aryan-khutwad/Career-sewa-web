import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { signOut } from '@angular/fire/auth';
import { AuthService } from '../../services/auth';
import { DashboardService } from '../../services/dashboard';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { authState } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'./dashboard.html',
  styleUrls:['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  selectedExam$!: Observable<any>;
  userData$!: Observable<any>;

  private destroy$ = new Subject<void>();

  constructor(
    private auth: Auth,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
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

    this.selectedExam$ = authState(this.auth).pipe(
      switchMap(user => {
        if (!user) {
          return of(null);
        }
        return this.authService.getUserData(user.uid).pipe(
          switchMap(userData => {
            if (!userData?.['selectedExamId']) {
              return of(null);
            }
            return this.dashboardService.getSelectedExam(userData['selectedExamId']);
          })
        );
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
