import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private firestore = inject(Firestore);
  private platformId = inject(PLATFORM_ID);

  getNotificationsByExamId(examId: string): Observable<any[]> {

    if (!examId || examId.trim().length === 0) {
      return of([]);
    }

    // prevent Firebase during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }

    return from(
      getDocs(
        query(
          collection(this.firestore, 'notifications'),
          where('examId', '==', examId)
        )
      )
    ).pipe(
      switchMap(snapshot => {
        const notifications = snapshot.docs.map(doc => doc.data());
        return of(notifications);
      })
    );
  }
}