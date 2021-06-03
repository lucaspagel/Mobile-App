import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Caderno } from '../interfaces/caderno';
import { AuthService } from '../services/auth.service';
import { CadernoService } from '../services/caderno.service';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.page.html',
    styleUrls: ['./canvas.page.scss'],
})
export class CanvasPage implements OnInit {
    @ViewChild('myCanvas') canvas: any;
    private cadernoSubscription: Subscription;

    canvasElement: any;
    lastX: number;
    lastY: number;
    arrayDesenhos: any[];
    desenho: number[];

    cadernoId: string;
    public cadernoAtual: Caderno = {};
    private loading: any;

    constructor(
        public platform: Platform,
        public renderer: Renderer2,
        private cadernoService: CadernoService,
        private nav: Router,
        private route: ActivatedRoute,
        private loadingCtrl: LoadingController,
        private authService: AuthService,
        private toastCtrl: ToastController
    ) {
        this.route.params.subscribe(params => this.cadernoId = params['id']);
        this.desenho = [];
        this.arrayDesenhos = [];
    }

    ngOnInit() {
        this.cadernoSubscription = this.cadernoService.getCaderno(this.cadernoId).subscribe(data => {
            this.cadernoAtual = data;
            this.desenho = data.paginas;
        });
    }

    ngAfterViewInit(): void {
        this.canvasElement = this.canvas.nativeElement;
        // console.log(this.platform.height());

        this.renderer.setProperty(this.canvasElement, 'width', this.platform.width());
        this.renderer.setProperty(this.canvasElement, 'height', this.platform.height() - 78);

        this.drawDesenho();
    }

    handleStart(ev) {
        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY - 70;
    }

    handleMove(ev) {
        let ctx = this.canvasElement.getContext('2d');
        let currentX = ev.touches[0].pageX;
        let currentY = ev.touches[0].pageY - 70;

        //console.log("x: " + currentX + ", y: " + currentY);

        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = '#DC143C';
        ctx.lineWidth = 10;
        ctx.stroke();

        this.desenho.push(currentX);
        this.desenho.push(currentY);

        // console.log(this.desenho[0] + ':' + this.desenho[1]);

        this.lastX = currentX;
        this.lastY = currentY;
    }

    handleEnd(ev) {
        // this.arrayDesenhos.push(this.desenho);
        console.log(this.desenho);
        // this.desenho = [];
        this.desenho.push(0);
        this.desenho.push(0);
    }

    async saveCanvas() {
        //await this.presentLoading();

        this.drawDesenho();
        // coloca no banco de dados
        this.cadernoAtual.paginas = this.desenho;

        try {
            await this.cadernoService.updateCaderno(this.cadernoId, this.cadernoAtual);
            await this.loading.dismiss();

            this.nav.navigate(['/cadernos/']);
        } catch (error) {
            console.log(error)
            this.presentToast('Erro ao tentar salvar');
            this.loading.dismiss();
        }
    }
/*
    drawDesenho() {
        let ctx = this.canvasElement.getContext('2d');

        for (var j = 0; j < this.arrayDesenhos.length; j++) {
            ctx.beginPath();
            ctx.lineJoin = "round";

            this.lastX = this.desenho[0];
            this.lastY = this.desenho[1];
            for (var i = 2; i < this.desenho.length; i += 2) {
                let currentX = this.desenho[i];
                let currentY = this.desenho[i + 1];

                // console.log("x: " + currentX + ", y: " + currentY);

                ctx.moveTo(this.lastX, this.lastY);
                ctx.lineTo(currentX, currentY);
                ctx.closePath();
                ctx.strokeStyle = '#DC143C';
                ctx.lineWidth = 10;
                ctx.stroke();

                // console.log(this.desenho[0] + ':' + this.desenho[1]);

                this.lastX = currentX;
                this.lastY = currentY;
            }
        }
    }*/

    async drawDesenho() {
        await this.presentLoading();

        let ctx = this.canvasElement.getContext('2d');

        ctx.beginPath();
        ctx.lineJoin = "round";

        this.lastX = this.desenho[0];
        this.lastY = this.desenho[1];

        for (var i = 2; i < this.desenho.length; i += 2) {
            let currentX = this.desenho[i];
            let currentY = this.desenho[i + 1];

            if (currentX != 0 && currentY != 0) {
                ctx.moveTo(this.lastX, this.lastY);
                ctx.lineTo(currentX, currentY);
                ctx.closePath();
                ctx.strokeStyle = '#DC143C';
                ctx.lineWidth = 10;
                ctx.stroke();
    
                this.lastX = currentX;
                this.lastY = currentY;
            }

            else {
                this.lastX = this.desenho[i + 2];
                this.lastY = this.desenho[i + 3];

                i+=4;
            }
        }
        this.loading.dismiss();
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

// no onInit, diz que if(cadernoAtual.paginas) != null => desenho = cadernoAtual.paginas;
// chama o método drawDesenho