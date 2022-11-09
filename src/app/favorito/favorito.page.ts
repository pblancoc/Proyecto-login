import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Favorito } from '../models/favorito.model';
import { FavoritosService } from '../services/favoritos.service';
import { Proveedor1Service } from '../services/proveedor1.service';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.page.html',
  styleUrls: ['./favorito.page.scss'],
})
export class FavoritoPage implements OnInit {

  public listaFav: Favorito[];

  constructor(
    public favoritos: FavoritosService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    public proveedor: Proveedor1Service
  ) { }

  ngOnInit() {
    this.listaFav = this.favoritos.favoritos
  }

  async eliminarLista(listaItem: Favorito) {
    const loading = await this.loadingController.create();
    await loading.present();
    
    const user = await this.favoritos.eliminarLista(listaItem);
    await loading.dismiss();
    this.showAlert('Favorito eliminado', 'xx');
    console.log("Eliminar lista:", listaItem);
   
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }  

  doRefresh(event) {
    this.listaFav = null; // this is replacement of splice
    this.ngOnInit(); // 
    setTimeout(() => {
      //this.router.navigate(['/favorito']);
      event.target.complete();
  }, 2000);  
  }

  async verLugar(id: string, nombre: string){
    console.log("Dio click en " + id);
    this.proveedor.idLugar = id;
    this.proveedor.nombreLugar = nombre;
    this.router.navigateByUrl('lugar', { replaceUrl: true });
  }  
}
