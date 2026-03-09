import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ExamsComponent } from './pages/exams/exams';
import { ExamDetailsComponent } from './pages/exam-details/exam-details';
import { ProfileComponent } from './pages/profile/profile';
import { AiAssistant } from './pages/ai-assistant/ai-assistant';
import { NotificationsComponent } from './pages/notifications/notifications';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'exams', component: ExamsComponent},
  {
  path: 'exam-details/:id',
  component: ExamDetailsComponent,
  data: { renderMode: 'client' }
},
  { path: 'profile', component:ProfileComponent},
  { path: 'ai-assistant' , component:AiAssistant},
  { path: 'notifications', component: NotificationsComponent}
  
];
