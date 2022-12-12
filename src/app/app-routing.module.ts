import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { HomeComponent } from './pages/seguridad/home/home.component';
import { MesasComponent } from './pages/resultados/mesas/mesas.component';
import { PartidosComponent } from './pages/resultados/partidos/partidos.component';
import { CandidatosComponent } from './pages/resultados/candidatos/candidatos.component';
import { ReportesComponent } from './pages/resultados/reportes/reportes.component';
import { GraficasComponent } from './pages/resultados/graficas/graficas.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: HomeComponent,
                children: [
                    // { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    // { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                ]
            },
            // { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: '', component: HomeComponent },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'home', component: HomeComponent },
            { path: 'mesas', component: MesasComponent },
            { path: 'partidos', component: PartidosComponent },
            { path: 'candidatos', component: CandidatosComponent },
            { path: 'reportes', component: ReportesComponent },
            { path: 'graficas', component: GraficasComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
