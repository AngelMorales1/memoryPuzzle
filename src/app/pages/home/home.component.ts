import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public expression: boolean = false
  public rules: boolean = false
  
  constructor() { }

  ngOnInit(): void {
  }

  startGame(){
    this.expression = true;
  }

  viewRules(){
    this.rules = true;
  }

  backMenu(){
    this.rules = false
  }

  reset(reset:boolean){
    this.expression = reset
  }

}
