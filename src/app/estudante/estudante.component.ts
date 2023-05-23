import { Component, OnInit } from '@angular/core';
import { Estudante } from '../student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-estudante',
  templateUrl: './estudante.component.html',
  styleUrls: ['./estudante.component.css']
})
export class EstudanteComponent implements OnInit {
  student: Estudante[] = [];
  isEditing: boolean = false;
  formGroupStudent: FormGroup;
  submitted: boolean = false;

  constructor(private studentService: StudentService,
    private formBuilder: FormBuilder) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getEstudante().subscribe(
      {
        next: data => this.student = data
      }
    );
  }

  save() {
    this.submitted = true;

    if (this.formGroupStudent.valid) {
      if (this.isEditing) {
        this.studentService.update(this.formGroupStudent.value).subscribe({
          next: () => {
            this.loadStudents();
            this.formGroupStudent.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        })
      }
      else {
        this.studentService.save(this.formGroupStudent.value).subscribe({
          next: data => {
            this.student.push(data);
            this.formGroupStudent.reset();
            this.submitted = false;
          }
        });
      }
    }
  }

  clear() {
    this.formGroupStudent.reset();
    this.isEditing = false;
    this.submitted = false;
  }

  edit(student: Estudante) {
    this.isEditing = true;
    this.formGroupStudent.setValue(student);
    this.studentService.update(student).subscribe({
      next: () => this.loadStudents()
    })
  }

  delete(student: Estudante) {
    this.studentService.delete(student).subscribe({
      next: () => this.loadStudents()
    })
  }

  get name(): any {
    return this.formGroupStudent.get("name");
  }
  get phone(): any {
    return this.formGroupStudent.get("phone");
  }
  get email(): any {
    return this.formGroupStudent.get("email");
  }
}
