import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { of, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private firestore = inject(Firestore);
  private platformId = inject(PLATFORM_ID);

  private isValidId(id: string): boolean {
    return !!(id && id.trim().length > 0);
  }

  // ================= LIST PAGE =================
  getExams(): Observable<any[]> {

    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }

    return collectionData(
      collection(this.firestore, 'exams'),
      { idField: 'id' }
    ) as Observable<any[]>;
  }

  // ================= DETAILS PAGE =================
  getExam(examId: string): Observable<any> {

    if (!this.isValidId(examId) || !isPlatformBrowser(this.platformId)) {
      console.warn('Invalid examId provided to getExam:', examId);
      return of(null);
    }

    return docData(
      doc(this.firestore, 'exams', examId)
    );
  }

  // ================= BOOKS =================
  getBooks(examId: string): Observable<any[]> {

    if (!this.isValidId(examId) || !isPlatformBrowser(this.platformId)) {
      console.warn('Invalid examId provided to getBooks:', examId);
      return of([]);
    }

    console.log('📘 Loading books for exam:', examId);
    return collectionData(
      collection(this.firestore, `exams/${examId}/books`)
    ) as Observable<any[]>;
  }

  // ================= NOTES =================
  getNotes(examId: string): Observable<any[]> {

    if (!this.isValidId(examId) || !isPlatformBrowser(this.platformId)) {
      console.warn('Invalid examId provided to getNotes:', examId);
      return of([]);
    }

    console.log('📝 Loading notes for exam:', examId);
    return collectionData(
      collection(this.firestore, `exams/${examId}/notes`)
    ) as Observable<any[]>;
  }

  // ================= PYQs =================
  getPyqs(examId: string): Observable<any[]> {

    if (!this.isValidId(examId) || !isPlatformBrowser(this.platformId)) {
      console.warn('Invalid examId provided to getPyqs:', examId);
      return of([]);
    }

    console.log('❓ Loading PYQs for exam:', examId);
    return collectionData(
      collection(this.firestore, `exams/${examId}/pyqs`)
    ) as Observable<any[]>;
  }

  // ================= VIDEOS =================
  getVideos(examId: string): Observable<any[]> {

    if (!this.isValidId(examId) || !isPlatformBrowser(this.platformId)) {
      console.warn('Invalid examId provided to getVideos:', examId);
      return of([]);
    }

    console.log('🎥 Loading videos for exam:', examId);
    return collectionData(
      collection(this.firestore, `exams/${examId}/videos`)
    ) as Observable<any[]>;
  }
}