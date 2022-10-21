import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-recuperar-usuario',
  templateUrl: './recuperar-usuario.page.html',
  styleUrls: ['./recuperar-usuario.page.scss'],
})
export class RecuperarUsuarioPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder, private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService
  ) { }
  get email() {
    return this.credentials.get('email');
  }
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]]

    })
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

   onSubmit() {
     if (this.credentials.valid) {
       const { email } = this.credentials.value;
      this.authService.recuperarContraseña(email);
     }
   }

  //  async recuperarUsuario() {
  //    const loading = await this.loadingController.create();
  //    await loading.present();

  //    const user = await this.authService.recuperar(this.credentials.value);
  //    await loading.dismiss();

  //    if (user) {
  //      this.router.navigateByUrl('/login', { replaceUrl: true });
  //    } else {
  //      this.showAlert('Falló ', 'Por favor intente de nuevo');
  //    }
  //  }


}
