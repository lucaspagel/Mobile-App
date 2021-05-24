import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Caderno } from '../interfaces/caderno';
import { AuthService } from '../services/auth.service';
import { CadernoService } from '../services/caderno.service';

@Component({
    selector: 'app-novo-caderno',
    templateUrl: './novo-caderno.page.html',
    styleUrls: ['./novo-caderno.page.scss'],
})
export class NovoCadernoPage implements OnInit {
    private cadernoNovo: Caderno = {};
    private loading: any;
    private cadernoId: string = null;

    constructor(
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private authService: AuthService,
        private cadernoService: CadernoService,
        private navController: NavController
    ) { }

    ngOnInit() {
    }

    async saveCaderno(){
        await this.presentLoading();

        this.cadernoNovo.userId = (await this.authService.getAuth().currentUser).uid;

        this.cadernoNovo.createdAt = new Date().getTime();

        try {
            await this.cadernoService.addCaderno(this.cadernoNovo);
            await this.loading.dismiss();

            this.navController.navigateBack('/cadernos');
        }catch(error) {
            this.presentToast("Erro ao tentar salvar");
            this.loading.dismiss();
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
