import { Component, OnInit, Input } from '@angular/core';

import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.css']
})
export class StudentNewComponent implements OnInit {
  @Input() students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  add(name: string, email: string, username: string): void {
    // Usunięcie białych znaków z danych
    name = name.trim();
    email = email.trim();
    username = username.trim();

    // Zaprzestanie wykonywania, kiedy pola są puste
    if (!name || !email || !username) {
      return;
    }

    // Zaprzestanie wykonywania, kiedy adres e-mail nie zawiera "@"
    if (email.indexOf('@') < 1) {
      return;
    }

    // Przesłanie danych do serwera i zaktualizowanie lokalnej tablicy
    this.studentService.addStudent({ name, email, username } as Student)
      .subscribe(student => {
        this.students.push(student);
      });
  }

}
