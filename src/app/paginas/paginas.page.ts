import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagina } from '../interfaces/pagina';

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.page.html',
  styleUrls: ['./paginas.page.scss'],
})
export class PaginasPage implements OnInit {

    cadernoId: number;
    paginasAtt: any[];
    private paginasAtuais = new Array<Pagina>();

    public paginas = [
        { id: 1, cadId: 1, nome: "Página Vazia" },
        { id: 2, cadId: 2, nome: "Página 1" },
        { id: 3, cadId: 2, nome: "Página Dois" },
        { id: 4, cadId: 2, nome: "Página Boa Noite Família" }
    ];

    constructor( private nav: Router, private route: ActivatedRoute ) 
    { 
        this.route.params.subscribe(params => this.cadernoId = params['id']);
    }

    ngOnInit() {
        this.paginasAtt = [];

        for(var i=0; i<this.paginas.length; i++) {
            if(this.paginas[i].cadId == this.cadernoId){
                this.paginasAtt.push(this.paginas[i]);
            }
        }
    }

    acessarPagina($event, pagina){
        this.nav.navigate(['cadernos/paginas/' + this.cadernoId + '/canvas/' + pagina.id]);
    }

    nada() {
        console.log("cria nova página");
    }
}
