import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // LOGIN
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // REGISTER
  async register(email: string, password: string, name: string) {

    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const user = userCredential.user;

    const userRef = doc(this.firestore, 'users', user.uid);

    await setDoc(userRef, {
      name: name,
      email: email,
      createdAt: new Date()
    });

    return userCredential;
  }

  // GET USER DATA
  getUserData(uid: string): Observable<{ selectedExamId?: string; name?: string; email?: string }> {
    const userRef = doc(this.firestore, 'users', uid);
    return docData(userRef) as Observable<{ selectedExamId?: string; name?: string; email?: string }>;
  }

  // SELECT EXAM
  async selectExam(examId: string) {

  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  const user = await firstValueFrom(authState(this.auth));

  if (!user) {
    throw new Error('User not logged in');
  }

  const userRef = doc(this.firestore, 'users', user.uid);

  await setDoc(
    userRef,
    { selectedExamId: examId },
    { merge: true }
  );
}

}