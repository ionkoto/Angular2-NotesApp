import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgRedux} from "ng2-redux";
import {IAppState} from "../../store/app.state";
import {ProfileActions} from "../../store/profile/profile.actions";
import {AuthService} from "../../core/auth.service";
import {EditDescriptionService} from "./edit-description.service";

@Component({
  selector: 'edit-description',
  templateUrl: './edit-description.component.html'
})
export class EditDescriptionComponent implements OnInit {
  description: string = "Loading ...";

  constructor(private ngRedux: NgRedux<IAppState>,
              private authService: AuthService,
              private profileActions: ProfileActions,
              private router: Router,
              private editService: EditDescriptionService) {

  }

  ngOnInit() {
    this.ngRedux
      .select(state => state.profile)
      .subscribe(profile => {
        this.description = profile.userDescription
      });

    if (this.description === 'Loading ...') {
      this.profileActions.getProfile(this.authService.getUser().id)
    }
  }

  submitEdit() {
    this.editService
      .editDesc({description: this.description})
      .subscribe(() => {
        this.router.navigateByUrl(`user/profile/${this.authService.getUser().id}`)
      });
  }
}
