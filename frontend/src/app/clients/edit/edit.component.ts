import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CustomValidations } from '../../custom-validations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  public idClient: number;
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
    private router: Router
  ) {
    const stateRoute = this.router.getCurrentNavigation().extras.state;

    this.idClient = stateRoute.data.id;
    this.form.controls.name.setValue(stateRoute.data.name);
    this.form.controls.email.setValue(stateRoute.data.email);
    this.form.controls.cpf.setValue(stateRoute.data.cpf);
    this.form.controls.dateOfBirth.setValue(stateRoute.data.dateOfBirth.toString());

    this.calculateAge();
  }

  edit() {
    this.http.put(`http://localhost:3000/customers/${this.idClient}`, this.form.value).subscribe((response: any) => {
      console.log(response);
      this.openSnackBar('Cliente editado com sucesso', 'Fechar');
      this.router.navigate(['clients']);
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
