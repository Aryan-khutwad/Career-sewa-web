import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.html',
  styleUrls: ['./ai-assistant.css']
})
export class AiAssistant {

  userInput: string = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [
    {
      sender: 'bot',
      text: 'Hello 👋 I am your Career-Sewa AI Assistant. Ask me anything about your exam.'
    }
  ];

  sendMessage() {
    if (!this.userInput.trim()) return;

    // User message
    const question = this.userInput;
    this.messages.push({ sender: 'user', text: question });

    // Bot response
    const response = this.getBotResponse(question.toLowerCase());
    this.messages.push({ sender: 'bot', text: response });

    this.userInput = '';
  }

  getBotResponse(question: string): string {

    if (question.includes('mpsc')) {
      return 'For MPSC preparation, start with NCERT books, focus on Polity, History, Geography, and solve previous year questions regularly.';
    }

    if (question.includes('police')) {
      return 'For Police exams, focus on basic GK, reasoning, physical fitness, and solve previous year question papers.';
    }

    if (question.includes('books')) {
      return 'You should start with NCERT books and standard reference books suggested for your selected exam.';
    }

    if (question.includes('syllabus')) {
      return 'Always download the official syllabus from the exam website and plan your study topic-wise.';
    }

    return 'I am still learning 😊 Please ask about MPSC, Police exams, books, or syllabus.';
  }
}
