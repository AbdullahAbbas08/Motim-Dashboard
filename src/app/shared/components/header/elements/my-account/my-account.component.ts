import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  logout(){
    // localStorage.removeItem("RiskAuthorization");
    // localStorage.removeItem("RiskRole");
    localStorage.clear();

    this.router.navigate(["/login"]);

    window.setInterval(()=>{
      window.location.reload();
    },1000);

  }
}
