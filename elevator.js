export default class Elevator {
  constructor() {
    this.floor = 0,
    this.traversed = 0,
    this.stops = 0,
    this.requests = [],
    this.riders = [],
    this.motionStatus = 'idle'
  }
  
  reset() {
    this.floor = 0,
    this.traversed = 0,
    this.stops = [],
    this.requests = [],
    this.riders = [],
    this.motionStatus = 'idle'
  }
  
  countStops() {
    return this.stops.length;
  }
  
  newCall(user) {
    this.requests.push(user);
    this.stops.push(user.floor);
  }
  
  goToFloor(input) {
    let addedTraversed = Math.abs(this.floor - input);
    this.traversed += addedTraversed;
    this.floor = input;
    console.log('Elevator is on: ', this.floor);
    
  }
  
  loadRider() {
    this.requests.forEach((request) => {
      if (request.floor === this.floor) {
        this.riders.push(request.name);
        console.log('Elevator is picking up ', this.riders);
      }
    });
  }
  
  dropRider(request) {
    this.riders.forEach(rider => {
      if (rider === request.name) {
        console.log('Elevator dropped off: ', request.name);
        
        this.riders = this.riders.filter(rider => rider !== request.name);
        this.requests = this.requests.filter(call => call !== request);
      }
      console.log('Elevator now contains: ', this.riders);
    })
  }
  
  handleRequests() {
    console.log('Elevator is on: ', this.floor);
    if (this.requests.length) {
      this.requests.forEach((request) => {

        this.goToFloor(request.floor);
        
        this.loadRider();

        this.goToFloor(request.dropFloor);
        
        this.dropRider(request);
      });
    }
    console.log('Floors traversed', this.traversed);
  }
  
}