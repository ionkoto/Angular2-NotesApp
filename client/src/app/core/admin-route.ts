import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AdminRoute implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(): boolean {
    return this.authService.isUserAdmin();
  }
}
