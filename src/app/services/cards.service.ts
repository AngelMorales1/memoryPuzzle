import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  public cards : string[] = ['fas fa-birthday-cake','fas fa-chess','fas fa-apple-alt','fas fa-cocktail','fas fa-cat','fas fa-book-dead','far fa-smile-wink','fab fa-angellist','fab fa-battle-net','fab fa-buy-n-large','fas fa-camera-retro','fas fa-church','fab fa-codepen','fas fa-cloud-moon-rain','fas fa-cloud-sun-rain','fas fa-birthday-cake','fas fa-chess','fas fa-apple-alt','fas fa-cocktail','fas fa-cat','fas fa-book-dead','far fa-smile-wink','fab fa-angellist','fab fa-battle-net','fab fa-buy-n-large','fas fa-camera-retro','fas fa-church','fab fa-codepen','fas fa-cloud-moon-rain','fas fa-cloud-sun-rain']

  public hiddenCard: string[]
  constructor() { }

  shuffleCards(){
    let deck = this.cards
    // shuffle the cards
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    this.hiddenCard = ['fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question','fas fa-question']

    return deck
  }

}
