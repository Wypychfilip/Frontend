import { Component, OnInit } from '@angular/core';

import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }

  delete(student: Student): void {
    if (confirm(`Na pewno usunąć studenta "${student.name}"?`)) {
      this.students = this.students.filter(s => s !== student);
      this.studentService.deleteStudent(student).subscribe();
    }
  }
}