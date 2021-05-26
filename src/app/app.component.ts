import { Component } from '@angular/core';
import { FcmService } from './services/fcm.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(
        private fcmService: FcmService
    ) {
        // comentado para não crashar no dispositivo, mas funciona no emulador
        // this.fcmService.initPush(); 
    }
}
