import { Component, OnInit } from '@angular/core';
// para poder tener los datos de la api
import { Proveedor1Service } from '../services/proveedor1.service';

//Interface del lugar

interface Ubicacion {
  centroide: string;
  tipo: string;
}

interface Contenido {
  nombreId: string;
  nombre: string;
  posicion: string;
  valor: string;
}

interface Idata {
  contenido: Contenido[];
  fechaAlta: string;
  ubicacion: Ubicacion; 
  fechaUltimaModificacion: string;
  id: string;
  direccionNormalizada: string;
  fechaActualizacion: string;
  fuente: string;
  claseId: string; 
  clase: string;
  idForaneo: string;
}

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.page.html',
  styleUrls: ['./lugar.page.scss'],
})
export class LugarPage implements OnInit {

  data;
  contenidos: Contenido[];

  constructor(
    public proveedor: Proveedor1Service
  ) { }

  ngOnInit() {
    this.ionViewDidLoad();
  }

  ionViewDidLoad(){
    this.proveedor.obtenerLugar(this.proveedor.idLugar)
    .subscribe(
      (data)=> {this.data = data;
                this.contenidos = this.data.contenido},
      (error)=> {console.log(error);}
    );
  }  

}
