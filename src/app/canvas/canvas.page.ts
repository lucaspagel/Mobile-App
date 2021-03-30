import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.page.html',
    styleUrls: ['./canvas.page.scss'],
})
export class CanvasPage implements OnInit {

    constructor(private nav: Router, private route: ActivatedRoute) { }

    ngOnInit() {
    }

}
