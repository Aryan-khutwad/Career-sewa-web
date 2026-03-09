import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../services/exam';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exams.html',
  styleUrls: ['./exams.css']
})
export class ExamsComponent {

  exams$!: Observable<any[]>;

  constructor(
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit() {
    this.exams$ = this.examService.getExams();
  }

  openExam(examId: string) {
    this.router.navigateByUrl('/exam-details/' + examId);
  }
}
