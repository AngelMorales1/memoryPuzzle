import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Output() reset: EventEmitter<boolean> = new EventEmitter<boolean>()
  public hiddenCard: string[] 
  public cards: string[]
  public ranks : boolean 
  public animationFade : string
  public animationFlip: string 
  public time: number = 0
  public ranksTimes: number[] = []
  private stopTimer: any
  private toggle: Boolean = false
  private pairs : number[] = []
  private tempCard1 : any[] = []
  private tempCard2 : any[] = []
  public finish: boolean = false
  constructor( private cardsService: CardsService ) { }

  ngOnInit(): void {
    this.cards = this.cardsService.shuffleCards()
    this.hiddenCard = this.cardsService.hiddenCard
  }

  timer(){
    this.stopTimer = setInterval(()=>{
      this.time = this.time + 1
    },1000)
  }

  resetGame(){
    // shufle cards, reset hidden cards and the timer
    this.cards = this.cardsService.shuffleCards()
    this.hiddenCard = this.cardsService.hiddenCard
    clearInterval(this.stopTimer)
    this.time = 0
    this.finish = false
    this.ranks = false
  }
  backMenu(){
    this.reset.emit(false)
  }
  
  viewRanks() {
    this.saveRanks()
    if (!this.ranks) {
      this.ranks = true
      this.animationFade = 'animate__fadeIn'
    } else {
      this.animationFade = 'animate__fadeOut'
      setTimeout(()=>{this.ranks = false},1500) 
    }
    this.ranksTimes = localStorage.getItem('time').split(',').map(Number)
    }

  saveRanks(){
    if (this.time>0) {
      this.ranksTimes.push(this.time)
      localStorage.setItem('time',this.ranksTimes.toString())
    }
  }
 
  
  flipCard(i: number, card:string){
    // save 2 cards in temporary variables
    this.hiddenCard[i] = card
    if (!this.toggle) {
      this.toggle = true
      this.tempCard1.push(i,card)

    }else{
      this.toggle = false
      this.tempCard2.push(i,card)
    }
  // logic about card matches
    if (this.tempCard1.length >0 && this.tempCard2.length >0) {
      
      if (this.tempCard1.length > 2 || this.tempCard2.length > 2) {
        this.hiddenCard[this.tempCard1[2]] = 'fas fa-question'
          this.hiddenCard[this.tempCard2[2]] = 'fas fa-question'
        this.resetCards();
      }else{
        if (this.time == 0) {
          this.timer()
        }
        this.resetCards();
      }

    }
  }

// logic about card matches
  resetCards(){
    if (this.tempCard1[1] !== this.tempCard2[1] ) {

      //resets cards in case they are diferent 
        setTimeout(()=>{
          this.hiddenCard[this.tempCard1[0]] = 'fas fa-question'
          this.hiddenCard[this.tempCard2[0]] = 'fas fa-question'
          this.tempCard1 =[]
          this.tempCard2 = []
        },400)

    }else if (this.tempCard1[0] == this.tempCard2[0]) {

      // resets in case of double click to the same card 

      this.hiddenCard[this.tempCard1[0]] = 'fas fa-question'
      this.tempCard1 =[]
      this.tempCard2 = []
    
    }else if (this.tempCard1[1] == this.tempCard2[1]) {
      // Match 
      this.pairs.push(this.tempCard1[0],this.tempCard2[0])
      this.tempCard1 =[]
      this.tempCard2 = []

      // finished game notification and reset
      if (this.pairs.length >= this.cards.length) {
        this.finish= true
        this.viewRanks()
        clearInterval( this.stopTimer)
        this.pairs = []
      }
    }


  }



}
