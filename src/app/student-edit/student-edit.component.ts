import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    // Uzyskanie wartości parametru "id" i jego konwersja na liczbę
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(student => this.student = student);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.studentService.updateStudent(this.student)
      .subscribe(() => this.goBack());
  }
}