import { Component, OnInit, ViewChild } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    @ViewChild(IonSlides) slides: IonSlides;
    public userLogin: User = {};
    public userRegister: User = {};
    private loading: any;

    constructor(
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private authService: AuthService
    ) { }

    ngOnInit() {
    }

    segmentChanged(event: any) {
        if (event.detail.value === 'login') {
            this.slides.slidePrev();
        } else {
            this.slides.slideNext();
        }
    }

    async login() {
        await this.presentLoading();

        try {
            await this.authService.login(this.userLogin);
        } catch (error) {
            console.error(error);
            this.presentToast(error.message);
        } finally {
            this.loading.dismiss();
        }
    }

    async register() {
        await this.presentLoading();

        try {
            await this.authService.register(this.userRegister);
        } catch (error) {
            console.error(error);
            this.presentToast(error.message);
        } finally {
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

    openWebpage(url: string) {/*
        const options: InAppBrowserOptions = {
          zoom: 'no'
        }

        // Opening a URL and returning an InAppBrowserObject
        const browser = this.iab.create(url, '_system', options);

       // Inject scripts, css and more with browser.X*/

       window.open(url, "_blank");
    }
}
