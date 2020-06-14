import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AceComponent } from './ace/ace.component';


const routes: Routes = [
  { path: 'error', component: ErrorComponent },
  { path: '**', component: AceComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
