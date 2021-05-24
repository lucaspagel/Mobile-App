import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
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

    constructor(
        private nav: Router,
        private cadernoService: CadernoService,
        private authService: AuthService
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
        this.nav.navigate(['cadernos/paginas/' + caderno.id]);
        
    }

    async logout() {
        try {
            await this.authService.logout();
        } catch(error) {
            console.error(error);
        }
    }

    deleteCaderno(idCaderno) {
        console.log(idCaderno);
    }
}
