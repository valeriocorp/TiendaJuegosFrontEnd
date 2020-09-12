import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  constructor(private auth: AuthService,private router: Router){}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // Primero se comprueba que existe sesion
      if (this.auth.getSession() !== null) {
          console.log('esta logeado ');
          const dataDecode = this.decodeToken();
          console.log(dataDecode);
      // Comprobar que no esta caducado el token 
          if (dataDecode.exp < new Date().getTime() / 1000) {
            console.log('Sesion caducada');
            return    this.redirectTo();
          }
      // El rol del usuario tiene que ser admin
          if (dataDecode.user.role === 'ADMIN') {
          console.log('Somos administradores');
          return true;
        }
          console.log('no somos administradores');
      }
      console.log('sesion no iniciada ');
      return this.redirectTo();
  }

  redirectTo(){
    this.router.navigate(['/login']);
    return false;

  }

  decodeToken() {
    return jwtDecode(this.auth.getSession().token);
  }

}
