import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mesa } from '../models/mesa.model';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(public http: HttpClient) { }

  listar(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>("http://127.0.0.1:9999/mesas");
  }

  Crear(mesa : Mesa): Observable<Mesa[]>{
    return this.http.post<Mesa[]>("http://127.0.0.1:9999/mesas", mesa);
  }

  Update(id:string, data:Mesa) {
    return this.http.put<Mesa>("http://127.0.0.1:9999/mesas/update/"+id,data);
  }

  // listar(): Observable<Mesa[]> {
  //   return this.http.get<Mesa[]>(`${environment.url_gateway}/mesas`);
  // }
  
  Delete(id:string){
    return this.http.delete<Mesa>("http://127.0.0.1:9999/mesas/delete/"+id);
  }
}
