import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';

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

    constructor(
        //public navCtrl: NavController,
        private nav: Router
    ) { }

    ngOnInit() {
    }

    acessarCaderno($event, caderno) {
        // this.navCtrl.push(CadernosPage, caderno);

        this.nav.navigate(['cadernos/paginas/' + caderno.id]);
    }
}
