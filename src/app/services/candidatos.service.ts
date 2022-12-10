import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidato } from '../models/candidato.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>("http://127.0.0.1:9999/candidatos");
  }

  Crear(candidato : Candidato): Observable<Candidato[]>{
    return this.http.post<Candidato[]>("http://127.0.0.1:9999/candidatos", candidato);
  }

  Update(id:string, data:Candidato) {
    return this.http.put<Candidato>("http://127.0.0.1:9999/candidatos/update/"+id,data);
  }
  
  Delete(id:string){
    return this.http.delete<Candidato>("http://127.0.0.1:9999/candidatos/delete/"+id);
  }

  // listar(): Observable<Candidato[]> {
  //   return this.http.get<Candidato[]>(`${environment.url_gateway}/candidatos`);
  // }
  
  // eliminar(id:string){
  //   return this.http.delete<Candidato>(`${environment.url_gateway}/candidatos/${id}`,
  //   );
  // }
}
