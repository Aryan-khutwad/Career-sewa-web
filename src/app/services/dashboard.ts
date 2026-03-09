import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private firestore = inject(Firestore);
  private platformId = inject(PLATFORM_ID);

  getSelectedExam(examId: string): Observable<any> {

    if (!examId || examId.trim().length === 0) {
      return of(null);
    }

    // prevent Firebase during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }

    return docData(doc(this.firestore, 'exams', examId));
  }
}