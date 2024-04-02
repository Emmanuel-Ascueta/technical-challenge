import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicListComponent } from './components/music/music-list/music-list.component';

const routes: Routes = [
  {
    path: 'music',
    pathMatch: 'full',
    component: MusicListComponent,
  },
  {
    path: '**',
    redirectTo: 'music'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
