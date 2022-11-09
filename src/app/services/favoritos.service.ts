import { Injectable } from '@angular/core';
import { Favorito } from '../models/favorito.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  public favoritos: Favorito[] = []; //Lista de lugares favoritos 

  constructor() { 
    this.cargarStorage();
  }

  crearLista(id: string, nombre: string) {
    let ObjetoFavorito = new Favorito(id, nombre);

    this.favoritos.push(ObjetoFavorito); //ingresamos en el array de favoritos el objeto con los datos creados
    this.guardarStorage();

    return ObjetoFavorito.nombreLugar;
  }  

  guardarStorage() {
    let stringFavoritos: string = JSON.stringify(this.favoritos); //Convertimos el array de listas en texto plano
    localStorage.setItem('favoritos', stringFavoritos); //Se debe ingresar dos parámetros, el primero un nombre y el se-gundo el contenido
  }  

  cargarStorage() {
    const listaStorage = localStorage.getItem('favoritos'); //Se debe ingresar el parámetro con el nombre del objeto que queremos recuperar
    if(listaStorage === null) {
    return this.favoritos = []; //Si el Storage está vacío devolvemos el objeto listas vacío también
    }
    let objLista = JSON.parse(listaStorage); //Convierte el texto plano a objeto para poder ingresarlo
    this.favoritos = objLista;
  }  

  eliminarLista(lista: Favorito) {
    let nuevoListado = this.favoritos.filter((listaItem)=> listaItem.idLugar !== lista.idLugar); //Guardamos todas las listas menos la lista a eliminar //filter devuelve un arreglo de listas
    this.favoritos = nuevoListado;
    this.guardarStorage();
  }  

}
