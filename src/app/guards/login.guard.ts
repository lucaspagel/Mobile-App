import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ){};

    canActivate(): Promise<boolean> {
        return new Promise(resolve => {
            this.authService.getAuth().onAuthStateChanged(user => {
                if(user) this.router.navigate(['cadernos']);

                // retorna true se usuário não existe, falso se sim
                resolve(!user ? true : false);
            })
        });
    }
}
