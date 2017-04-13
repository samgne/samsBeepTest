import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

//import { Observable,Subscription } from 'rxjs/Rx';

const LEVELS: Level[] = [
  { id: 1, time: 9000, shuttles: 7 },
  { id: 2, time: 8000, shuttles: 8 },
  { id: 3, time: 7580, shuttles: 8 },
  { id: 4, time: 7200, shuttles: 9 },
  { id: 5, time: 6860, shuttles: 9 },
  { id: 6, time: 6550, shuttles: 10 },
  { id: 7, time: 6260, shuttles: 10 },
  { id: 8, time: 6000, shuttles: 11 },
  { id: 9, time: 5760, shuttles: 11 },
  { id: 10, time: 5540, shuttles: 11 },
  { id: 11, time: 5330, shuttles: 12 },
  { id: 12, time: 5140, shuttles: 12 },
  { id: 13, time: 4970, shuttles: 13 },
  { id: 14, time: 4800, shuttles: 13 },
  { id: 15, time: 4650, shuttles: 13 },
  { id: 16, time: 4500, shuttles: 14 },
  { id: 17, time: 4360, shuttles: 14 },
  { id: 18, time: 4240, shuttles: 15 },
  { id: 19, time: 4110, shuttles: 15 },
  { id: 20, time: 4000, shuttles: 16 },
  { id: 21, time: 3890, shuttles: 16 }
]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public shuttleStart: Date;
  public currentLevel: number = 1;
  public currentShuttle: number = 0;
  public timeElapsed: number;
  public timer;
  public interval;
  constructor(public navCtrl: NavController) {
    
  }

  levels = LEVELS;

  stop() {
    clearInterval(this.interval);
  }

  start() {
 
    this.createTimer();
    this.runLevel();
    
    
  }

  runLevel() {
    this.currentShuttle = 0;
    this.interval = setInterval(() => this.updateTimer(this.shuttleStart), 100);
    console.log(this.interval);
  }

  createTimer() {
    
    console.log("STARTING CREATETIMER");
    this.shuttleStart = new Date();
    this.shuttleStart.setMilliseconds(this.shuttleStart.getMilliseconds() + this.levels[this.currentLevel].time);
    console.log("Shuttle start: " + this.shuttleStart);
    this.timeElapsed = 0;
    
  }

  updateTimer(shuttleStarts) {
    console.log("Current level: " + this.currentLevel);
    
    var currentTime = new Date();
    
    var timeDifference = shuttleStarts.getTime() - currentTime.getTime();
    console.log("Time difference: " + timeDifference);
 
    //Time elapsed in seconds
    this.timeElapsed = Math.abs(timeDifference / 1000);
 
    console.log("Time elapsed: " + this.timeElapsed);
    this.timer = this.timeElapsed.toFixed(1);
    
    if (timeDifference < 0) {
      console.log("shuttle done");
      this.currentShuttle = this.currentShuttle + 1;
      console.log("Current shuttle: " + this.currentShuttle);
      this.createTimer();
    }

    if (this.currentShuttle == this.levels[this.currentLevel].shuttles) {
      clearInterval(this.interval);
      this.currentLevel++;
      console.log("LEVEL DONE");
      this.createTimer();
      this.runLevel();
      this.currentShuttle = 0;
    }
    
  }
}



export class Level {
  id: number;
  time: number;
  shuttles: number;
}