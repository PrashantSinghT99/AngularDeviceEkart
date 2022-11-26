import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router:Router) { }

    onModeChange() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form: NgForm) {

        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;
        let authObs = new Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        }
        else {

            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/devices']);

            }, errorMessage => {

                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        );
        form.reset();

    }

}
   //    console.log(errorRes);
        //    switch(errorRes.error.error.message)
        //    {
        //     case 'EMAIL_EXISTS':
        //         this.error='This email exists already';
        //    }