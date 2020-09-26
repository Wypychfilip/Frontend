import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentsUrl = 'https://jsonplaceholder.typicode.com/users';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url);
  }

  updateStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}/${student.id}`;
    return this.http.put<Student>(url, student, this.httpOptions);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student, this.httpOptions);
  }

  deleteStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}/${student.id}`;
    return this.http.delete<Student>(url, this.httpOptions);
  }
  searchStudents(term: string): Observable<Student[]> {
    // Jeśli brak frazy, zwróć pustą tablicę
    // "of" - tworzy obserwowalny strumień
    if (!term.trim()) {
      return of([]);
    }
  
    return this.http.get<Student[]>(`${this.studentsUrl}?name_like=${term}`);
  }
}