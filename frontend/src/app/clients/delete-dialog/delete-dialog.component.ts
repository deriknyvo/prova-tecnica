import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  delete() {
    console.log(this.data.id);
    this.http.delete(`http://localhost:3000/customers/${this.data.id}`, {}).subscribe((response) => {
      console.log(response);
      this.openSnackBar('Registro apagado', 'Fechar');
      this.closeDialog();
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
