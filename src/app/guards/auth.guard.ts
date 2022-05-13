import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(
    private storage: StorageService,
    private router: Router
  ){}

  async canActivateChild(
    _childRoute: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Promise<any> {

    const userData = await this.storage.get('user');
    if(userData && userData.id){
      this.router.navigateByUrl('pages/home');
      return false;
    }else{
      return true;
    }
  }

}
