import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth';
import { NotificationsService } from '../../services/notifications';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import { authState } from '@angular/fire/auth';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  notifications$!: Observable<any[]>;
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private auth: Auth,
    private authService: AuthService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this.notifications$ = authState(this.auth).pipe(
      switchMap(user => {
        if (!user) {
          this.loading = false;
          return of([]);
        }

        return this.authService.getUserData(user.uid).pipe(
          switchMap(userData => {
            const selectedExamId = userData?.['selectedExamId'];
            if (!selectedExamId) {
              this.loading = false;
              return of([]);
            }

            return this.notificationsService.getNotificationsByExamId(selectedExamId).pipe(
              map(notifications => {
                this.loading = false;
                return notifications;
              })
            );
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
}
