import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, NavParams, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Caderno } from '../interfaces/caderno';
import { AuthService } from '../services/auth.service';
import { CadernoService } from '../services/caderno.service';

@Component({
    selector: 'app-cadernos',
    templateUrl: './cadernos.page.html',
    styleUrls: ['./cadernos.page.scss'],
})

export class CadernosPage implements OnInit {

    public cadernos = [
        { id: 1, nome: "Caderno 1" },
        { id: 2, nome: "Cad. Especial" }
    ];

    private cadernosAtuais = new Array<Caderno>();
    private cadernoSubscription: Subscription;
    private loading: any;

    constructor(
        private nav: Router,
        private cadernoService: CadernoService,
        private authService: AuthService,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController
    ){ 
        this.cadernoSubscription = this.cadernoService.getCadernos().subscribe(data =>{
            this.cadernosAtuais = data;
        });
    }

    ngOnInit() {
    
    }

    ngOnDestroy() {
        this.cadernoSubscription.unsubscribe();
    }

    acessarCaderno($event, caderno) {
        //this.nav.navigate(['cadernos/paginas/' + caderno.id]);
        this.nav.navigate(['cadernos/canvas/' + caderno.id]);
    }

    async logout() {
        try {
            await this.authService.logout();
        } catch(error) {
            console.error(error);
        }
    }

    async deleteCaderno(idCaderno: string) {
        try {
            await this.cadernoService.deleteCadernoById(idCaderno);
        }catch(error) {
            this.presentToast("Erro ao tentar salvar");
        }
    }

    async presentLoading() {
        this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
        return this.loading.present();
    }

    async presentToast(message: string) {
        const toast = await this.toastCtrl.create({ message, duration: 2000 });
        toast.present();
    }
}
