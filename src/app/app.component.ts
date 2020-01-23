import { Component } from '@angular/core';
import { ConsumorestService } from './service/consumorest.service'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';

  categoria:  any = []; 
  constructor(public rest: ConsumorestService){}

  ngOnInit(){
    this.getCategorias(); 
  }


  getCategorias(){

    this.categoria = []; 
    this.rest.getCategoriasRest().subscribe(data => {
      console.log(data); 
      this.categoria = data; 
    }); 


  }




}
