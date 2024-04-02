import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private readonly url = 'https://spotify-downloader8.p.rapidapi.com/api/spotifyplay?note=its%20longer%20time%20then%20your%20playlist%20size%2C%20please%20wait&search=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F3VZqaCsSqQ9Bk96a0JiQJI%3Fsi%3Dda1b68e018ca487f&apikey=5eb5f408';

  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '879db1a3famsh36ea72b1f75cef1p18d796jsnc33ffa0a7b0f',
    'X-RapidAPI-Host': 'spotify-downloader8.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

  async getMusic(): Promise<any> {
    try {
      const response = await this.http.get(this.url, { headers: this.headers}).toPromise();
      return response;
    } catch (error) {
      console.log('Error en la petición a la API', error)
      throw error;
    }
  }
}

