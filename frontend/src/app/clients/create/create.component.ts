import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CustomValidations } from '../../custom-validations';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6),]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required, CustomValidations.cpfValidation]),
    dateOfBirth: new FormControl('', [Validators.required, CustomValidations.olderThan18]),
    age: new FormControl(''),
  });

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  create() {
    this.calculateAge();
    this.http.post('http://localhost:3000/customers', this.form.value).subscribe((response: any) => {
      this.openSnackBar('Cliente criado com sucesso', 'Fechar');
      this.route.navigate(['clients']);
    });
  }

  calculateAge() {
    const date = new Date();
    const birth = this.form.controls.dateOfBirth.value;
    let year = birth.slice(-4);
    let month = birth.slice(2, 2);
    let day = birth.slice(0, 2);

    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let currentDay = date.getMonth() + 1;

    year = +year,
      month = +month,
      day = +day;

    let age = currentYear - year;

    if (currentMonth < month || currentMonth == month && currentDay < day) {
      age--;
    }

    const result = age < 0 ? 0 : age;
    this.form.controls.age.setValue(result);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
