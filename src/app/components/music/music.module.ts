import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MusicListComponent } from "./music-list/music-list.component";
import { MusicFormComponent } from "./music-form/music-form.component";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { MessageModalComponent } from './message-modal/message-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    MusicListComponent,
    MusicFormComponent,
    MessageModalComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatDatepickerModule,
    MatInputModule,
    MatProgressSpinnerModule,

  ],
  exports: [MusicListComponent]
})
export class MusicModule {}
