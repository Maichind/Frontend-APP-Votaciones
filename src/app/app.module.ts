import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { HomeComponent } from './pages/seguridad/home/home.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { MesasComponent } from './pages/resultados/mesas/mesas.component';
import { ToastModule } from 'primeng/toast';
import { PartidosComponent } from './pages/resultados/partidos/partidos.component';
import { CandidatosComponent } from './pages/resultados/candidatos/candidatos.component';
import { ReportesComponent } from './pages/resultados/reportes/reportes.component';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, HomeComponent, MesasComponent, PartidosComponent, CandidatosComponent, ReportesComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CheckboxModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        OverlayPanelModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        RouterModule,
        TableModule,
        HttpClientModule,
        ToolbarModule,
        DialogModule,
        ToastModule
    ],
    providers: [
        { 
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true 
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
