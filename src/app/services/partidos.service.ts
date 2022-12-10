import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Partido } from '../models/partido.model';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private http: HttpClient) { }
  
  listar(): Observable<Partido[]> {
    return this.http.get<Partido[]>("http://127.0.0.1:9999/partidos");
  }

  Crear(partido : Partido): Observable<Partido[]>{
    return this.http.post<Partido[]>("http://127.0.0.1:9999/partidos", partido);
  }

  Update(id:string, data:Partido) {
    return this.http.put<Partido>("http://127.0.0.1:9999/partidos/update/"+id,data);
  }
  
  Delete(id:string){
    return this.http.delete<Partido>("http://127.0.0.1:9999/partidos/delete/"+id);
  }

  // listar(): Observable<Partido[]> {
  //   return this.http.get<Partido[]>(`${environment.url_gateway}/partidos`);
  // }
  
  // eliminar(id:string){
  //   return this.http.delete<Partido>(`${environment.url_gateway}/partidos/${id}`,
  //   );

}
