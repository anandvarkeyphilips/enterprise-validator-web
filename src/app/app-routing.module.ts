import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AceComponent } from './ace/ace.component';


const routes: Routes = [
  { path: 'editor', component: AceComponent },
  { path: '**', component: ErrorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
