import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudante } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = "http://localhost:3000/estudante";

  constructor(private http: HttpClient) { }

  getEstudante(): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(this.url);
  }

  save(student: Estudante): Observable<Estudante> {
    return this.http.post<Estudante>(this.url, student);
  }

  update(student: Estudante): Observable<Estudante> {
    return this.http.put<Estudante>(`${this.url}/${student.id}`, student);
  }

  delete(student: Estudante): Observable<void> {
    return this.http.delete<void>(`${this.url}/${student.id}`);
  }
}
