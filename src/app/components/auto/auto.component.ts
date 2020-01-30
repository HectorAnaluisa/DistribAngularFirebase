import { Component, OnInit } from '@angular/core';
import { ConsumofirebaseService } from 'src/app/service/consumofirebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {

  public autos : any = []; 

  public documentId= null; 

  public currentStatus = 1; 


  
  public newAutoForm = new FormGroup({
    marcaF: new FormControl('', Validators.required),
    modeloF: new FormControl('', Validators.required),
    anioF: new FormControl('', Validators.required),
    urlF: new FormControl('', Validators.required),
    idF: new FormControl('')
  });

  constructor(private fs: ConsumofirebaseService) { 
    this.newAutoForm.setValue({
      idF: '', 
      marcaF: '', 
      anioF: '',
      urlF:'',
      modeloF: '', 

    }); 
  }

  

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

  //ELIMINAR AUTO

  public eliminarAuto(documentId){
    this.fs.eliminarAuto(documentId).then(
      ()=>{
            console.log("Documento ELiminado");
          }, (error)=>
          {
            console.log(error)
          }); 

  }


  //Cargar los datos en el formulario

  public actualizarAuto(documentId){
    let editSubscribe= this.fs.obtenerAutoId(documentId).subscribe(
      (data)=>{

        this.currentStatus = 2; 
        this.documentId= documentId; 
        this.newAutoForm.setValue({
          idF: documentId, 
          marcaF: data.payload.data()['marca'], 
          anioF: data.payload.data()['modelo'],
          urlF: data.payload.data()['anio'],
          modeloF: data.payload.data()['url'], 
        })

        editSubscribe.unsubscribe(); 
      }
    );
    }



    //metodo para agragar y actualizar un nuevo registro 

    public nuevoAuto(form, documentId = this.documentId){
      if(this.currentStatus == 1){

        let data = {
          marca: form.marcaF, 
          modelo: form.modeloF, 
          anio: form.anioF, 
          url: form.urlF

        }

        this.fs.crearAuto(data).then(()=>{
          console.log("Documento Creado Exitosamente"); 
          this.newAutoForm.setValue({
            idF: '', 
            marcaF: '', 
            anioF: '',
            urlF:'',
            modeloF: '', 
      
          }); 

        }, 
        (error) => {
          console.error(error); 
        }
        ); 
      }else{

        let data = {
          marca: form.marcaF, 
          modelo: form.modeloF, 
          anio: form.anioF, 
          url: form.urlF

        }

        this.fs.actualizarAuto(documentId, data ).then(() => {
          this.newAutoForm.setValue({

            idF: '', 
            marcaF: '', 
            anioF: '',
            urlF:'',
            modeloF: '', 
          }); 
          console.log("Documento se edito con exito")
        }, (error) => {
          console.log(error);
          
        }); 




      }

    }

}
