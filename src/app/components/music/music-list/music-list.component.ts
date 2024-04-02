import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MusicService } from 'src/app/services/music.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { MusicFormComponent } from '../music-form/music-form.component';
import { MessageModalComponent } from '../message-modal/message-modal.component';


@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent {

  music: any = [];
  dataMusic!: MatTableDataSource<any>;
  columns = ['artist', 'title', 'album', 'cover', 'releaseDate', 'tools'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  isLoading: boolean = true;

  constructor(
    private musicService: MusicService,
    private datePipe: DatePipe,
    private matDialog: MatDialog,
  ) { }

  async ngOnInit() {
    this.isLoading = true;
    try {
      const response = await this.musicService.getMusic();
      if (response && response.status && response.result) {
        this.music = response.result;
        localStorage.setItem('music', JSON.stringify(this.music));
        this.dataMusic = new MatTableDataSource(this.music);
        this.dataMusic.paginator = this.paginator;

        this.music.forEach((item: any) => {
          item.releaseDate = this.datePipe.transform(item.releaseDate, 'dd/MM/yyyy');
        });
      }
      this.isLoading = false;
    } catch (error) {
      console.error('Error en la petición a la API', error);
    }
  }

  openMessageModal(type: string, message: string): Observable<any> {
    const dialogRef = this.matDialog.open(MessageModalComponent, {
      data: { type, message },
      disableClose: true,
      panelClass: 'custom-dialog-container',
    });
    return dialogRef.afterClosed();
  }

  openDeleteModal(artist: string): Observable<boolean> {
    const dialogRef = this.matDialog.open(MessageModalComponent, {
      data: { type: 'warning', message: `¿Está seguro de eliminar '${artist}' del listado?` },
      disableClose: true,
      panelClass: 'custom-dialog-container',
    });
    return dialogRef.afterClosed();
  }

  indexPage(index: number): number {
    const pageIndex = this.dataMusic.paginator?.pageIndex || 0;
    const pageSize = this.dataMusic.paginator?.pageSize || 1;
    const calculatedIndex = (pageIndex * pageSize) + index;
    return calculatedIndex;
  }

  async createMusic() {
    try {
      const dialogRef = this.matDialog.open(MusicFormComponent, {
        data: { music: {}, index: -1 },
        disableClose: true,
        panelClass: 'custom-dialog-container',
      });

      const result = await dialogRef.afterClosed().toPromise();

      if (result && result.musicIndex < 0) {
        this.music.push(result.formData);
        this.dataMusic.data = this.music;
        localStorage.setItem('music', JSON.stringify(this.music));

        this.openMessageModal('success', 'Registro creado con éxito').subscribe();
      }
    } catch (error) {
      console.error('Error al crear registro', error);
      this.openMessageModal('error', 'Hubo un error al crear el resgitro');
    }
  }

  editMusic(index: number) {
    const musicToEdit = this.music[index];
    this.editMusicDialog(index, musicToEdit);
  }

  async editMusicDialog(index: number, music: any) {
    try {
      const dialogRef = this.matDialog.open(MusicFormComponent, {
        data: { index: index, music: music },
        disableClose: true,
        panelClass: 'custom-dialog-container',
      });

      const result = await dialogRef.afterClosed().toPromise();

      if (result && result.musicIndex >= 0) {
        this.music[result.musicIndex] = result.formData;
        this.dataMusic.data = this.music;
        localStorage.setItem('music', JSON.stringify(this.music));

        this.openMessageModal('success', 'Registro editado con éxito').subscribe();
      }
    } catch (error) {
      console.error('Error al editar registro', error);
      this.openMessageModal('error', 'Hubo un error al editar el registro');
    }
  }

  async deleteMusic(index: number, artist: string) {
    try {
      const result = await this.openDeleteModal(artist).toPromise();

      if (result) {
        this.music.splice(index, 1);
        localStorage.setItem('music', JSON.stringify(this.music));
        this.dataMusic.data = this.music;
        this.openMessageModal('success', 'Registro eliminado con éxito').subscribe();
      }
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
      this.openMessageModal('error', 'Hubo un error al eliminar el registro').subscribe();
    }
  }
}
