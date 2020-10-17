import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { CustomPaginator } from '../translate-paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent }
];

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [ListComponent, CreateComponent, EditComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class ClientsModule { }
