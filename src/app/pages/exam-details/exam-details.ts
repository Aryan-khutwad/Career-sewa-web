import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../services/exam';
import { Observable, Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth';
import { FirebaseTestService } from '../../services/firebase-test';

@Component({
  selector: 'app-exam-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-details.html',
  styleUrls: ['./exam-details.css']
})
export class ExamDetailsComponent implements OnInit, OnDestroy {

  activeSection: string | null = null;
  examId: string = '';

  exam$!: Observable<any>;
  books$!: Observable<any[]>;
  notes$!: Observable<any[]>;
  pyqs$!: Observable<any[]>;
  videos$!: Observable<any[]>;

  private destroy$ = new Subject<void>();
  private examId$ = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private authService: AuthService,
    private firebaseTest: FirebaseTestService
  ) {}

  ngOnInit() {
    // Run Firebase connection test
    console.log('🚀 Exam Details Page Loaded - Running Firebase Diagnostic...\n');
    this.firebaseTest.testFirebaseConnection();

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      alert('Invalid exam ID');
      console.error('❌ No exam ID in route params');
      return;
    }

    this.examId = id;
    console.log('✅ Exam ID loaded:', id);

    this.exam$ = this.examId$.pipe(
      switchMap(examId => this.examService.getExam(examId)),
      takeUntil(this.destroy$)
    );

    this.books$ = this.examId$.pipe(
      switchMap(examId => this.examService.getBooks(examId)),
      takeUntil(this.destroy$)
    );

    this.notes$ = this.examId$.pipe(
      switchMap(examId => this.examService.getNotes(examId)),
      takeUntil(this.destroy$)
    );

    this.pyqs$ = this.examId$.pipe(
      switchMap(examId => this.examService.getPyqs(examId)),
      takeUntil(this.destroy$)
    );

    this.videos$ = this.examId$.pipe(
      switchMap(examId => this.examService.getVideos(examId)),
      takeUntil(this.destroy$)
    );

    this.examId$.next(id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.examId$.complete();
  }

  toggle(section: string) {
    this.activeSection = this.activeSection === section ? null : section;
  }

  async selectExam() {
    try {

      if (!this.examId) {
        alert('Invalid exam ID');
        return;
      }

      await this.authService.selectExam(this.examId);

      alert('Exam selected successfully!');

    } catch (error) {
      console.error('Error selecting exam:', error);
      alert('Failed to select exam. Please try again.');
    }
  }
}