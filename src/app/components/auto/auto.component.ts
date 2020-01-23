import { Component, OnInit } from '@angular/core';
import { ConsumofirebaseService } from 'src/app/service/consumofirebase.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {

  public autos : any = []; 

  constructor(private fs: ConsumofirebaseService) { }

  

  ngOnInit() {
    this.obtenerAutos(); 
  }

  public obtenerAutos() {
    this.fs.ObtenerAutos().subscribe((dataDocumentos) => {
      dataDocumentos.forEach((data: any) => {
        this.autos.push({
          id: data.payload.doc.id,
          data: data.payload.doc.data()
        });
        console.log(this.autos);
      })
    });
  }

}
