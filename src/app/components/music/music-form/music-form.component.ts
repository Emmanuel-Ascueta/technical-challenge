import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-music-form',
  templateUrl: './music-form.component.html',
  styleUrls: ['./music-form.component.scss']
})
export class MusicFormComponent implements OnInit {

  musicForm: FormGroup;
  musicIndex = -1;
  modalTitle = 'Nuevo Albúm';
  hiddenInput: boolean = false;

  constructor(
    public matDialogRef: MatDialogRef<MusicFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    this.musicForm = this.formBuilder.group({
      artists: ['', Validators.required],
      title: ['', Validators.required],
      album: ['', Validators.required],
      cover: [null, Validators.required],
      releaseDate: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.index >= 0 && this.data.music) {
      this.modalTitle = 'Editar';
      this.musicIndex = this.data.index;

      const { artists, title, album, cover, releaseDate } = this.data.music;

      this.musicForm.setValue({
        artists: artists,
        title: title,
        album: album,
        cover: cover,
        releaseDate: releaseDate,
      });
    }
  }

  closeModal(): void {
    this.matDialogRef.close();
  }

  imageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
        this.musicForm.get('cover')?.setErrors({ 'fileType': true });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.musicForm.patchValue({
          cover: {
            file: file,
            base64String: reader.result,
          }
        });
      };
    }
    this.hiddenInput = true;
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  saveData() {
    if (!this.musicForm.valid) {
      return;
    }
    const releaseDate = this.musicForm.get('releaseDate')?.value;
    const formatedDate = this.formatDate(releaseDate);
    this.musicForm.get('releaseDate')?.setValue(formatedDate);
    this.matDialogRef.close({ formData: this.musicForm.value, musicIndex: this.musicIndex });
  }
}
