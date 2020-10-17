import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

export interface UserData {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  cpf: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.loadClients();
  }

  loadClients() {
    this.http.get('http://localhost:3000/customers', {}).subscribe((response: any) => {
      const users = response.data.map(client => {
        return {
          id: client.id,
          name: client.nome,
          email: client.email,
          dateOfBirth: client.data_nascimento,
          cpf: client.cpf
        }
      });

      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '255px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadClients();
    });
  }
}