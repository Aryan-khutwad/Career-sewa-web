import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTestService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async testFirebaseConnection(): Promise<void> {
    console.log('🔍 Starting Firebase Connection Test...\n');

    try {
      // Test 1: Check Auth State
      console.log('Test 1: Checking Auth State...');
      const currentUser = this.auth.currentUser;
      if (currentUser) {
        console.log('✅ Auth Connected - Current User:', currentUser.email);
      } else {
        console.warn('⚠️  No user logged in - Auth working but no user');
      }

      // Test 2: Check Firestore Collections
      console.log('\nTest 2: Checking Firestore Connection...');
      const examsCollection = collection(this.firestore, 'exams');
      const examsDocs = await getDocs(examsCollection);
      console.log(`✅ Firestore Connected - Found ${examsDocs.size} exams`);

      if (examsDocs.size === 0) {
        console.warn('⚠️  WARNING: exams collection is EMPTY!');
        console.log('Action needed: Add sample data to Firestore');
      } else {
        // Show first exam
        const firstExam = examsDocs.docs[0];
        console.log('First exam found:', {
          id: firstExam.id,
          data: firstExam.data()
        });

        // Test 3: Check subcollections
        console.log('\nTest 3: Checking Subcollections...');
        try {
          const booksRef = collection(this.firestore, `exams/${firstExam.id}/books`);
          const booksDocs = await getDocs(booksRef);
          console.log(`✅ Books subcollection: ${booksDocs.size} items`);

          const notesRef = collection(this.firestore, `exams/${firstExam.id}/notes`);
          const notesDocs = await getDocs(notesRef);
          console.log(`✅ Notes subcollection: ${notesDocs.size} items`);

          const pyqsRef = collection(this.firestore, `exams/${firstExam.id}/pyqs`);
          const pyqsDocs = await getDocs(pyqsRef);
          console.log(`✅ PYQs subcollection: ${pyqsDocs.size} items`);

          const videosRef = collection(this.firestore, `exams/${firstExam.id}/videos`);
          const videosDocs = await getDocs(videosRef);
          console.log(`✅ Videos subcollection: ${videosDocs.size} items`);
        } catch (error: any) {
          console.error('❌ Error reading subcollections:', error.message);
        }
      }

      // Test 4: Check Firestore Rules
      console.log('\nTest 4: Firestore Rules Check...');
      try {
        const usersCollection = collection(this.firestore, 'users');
        const usersDocs = await getDocs(usersCollection);
        console.log(`✅ Can read users collection: ${usersDocs.size} users`);
      } catch (error: any) {
        console.error('❌ Permission Error reading users:', error.message);
        console.log('Action needed: Update Firestore security rules');
      }

      console.log('\n🎉 Firebase Connection Test Complete!');
    } catch (error: any) {
      console.error('❌ Firebase Connection Error:', error.message);
      console.error('Full Error:', error);
    }
  }
}
