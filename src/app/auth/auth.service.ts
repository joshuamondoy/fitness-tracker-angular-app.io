import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable() // this is to inject routing service in this service
export class AuthService {
    authChange = new Subject<boolean>();
    userEmail = new Subject<string>();
    private isAuthenticated: boolean = false;

    constructor(private router: Router, private afAuth: AngularFireAuth) {}
    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.isAuthenticated = true;
                this.authChange.next(true)
                this.router.navigate(['/training']) 
            } else {
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }
    
    registerUser(authData: AuthData) {
        this.afAuth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password)
            .then(result => {
                this.initAuthListener();
            })
            .catch(err => {
                console.log(err);
            });
        
    }

    login(authData: AuthData) {
        this.afAuth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        )
        .then(result => {
            this.initAuthListener();
        })
        .catch(err => {
            console.log(err);
        });

    }

    isAuth() { // This is used in auth-guard 
        return this.isAuthenticated;
    }
    logout() {
        this.afAuth.signOut();
    }


}