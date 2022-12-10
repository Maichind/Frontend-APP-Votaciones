import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Reporte } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(public http: HttpClient) { }

  listar(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>("http://127.0.0.1:9999/resultados");
  }

  Crear(resultado : Reporte): Observable<Reporte[]>{
    return this.http.post<Reporte[]>("http://127.0.0.1:9999/resultados", resultado);
  }

  Update(id:string, data:Reporte) {
    return this.http.put<Reporte>("http://127.0.0.1:9999/resultados/update/"+id,data);
  }
  
  Delete(id:string){
    return this.http.delete<Reporte>("http://127.0.0.1:9999/resultados/delete/"+id);
  }

  // listar(): Observable<Reporte[]> {
  //   return this.http.get<Reporte[]>(`${environment.url_gateway}/reportes`);
  // }
  
  // eliminar(id:string){
  //   return this.http.delete<Reporte>(`${environment.url_gateway}/reportes/${id}`);
  // }
}
