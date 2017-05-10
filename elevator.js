export default class Elevator {
  constructor(currentFloor, motionStatus, direction) {
    this.currentFloor = 0,
    this.motionStatus = 'idle',
    this.direction = 'up',
    // this.stops = [],
    this.requests = [],
    this.upRequests = [],
    this.upStops = [],
    this.downRequests = [],
    this.downStops = []
  }
  
  newRequests(user) {
    if (user.direction === 'up') {
      this.upRequests.push(user);
      this.upStops.push(user.currentFloor);
      this.upStops.push(user.dropOffFloor);
      // this.handleCalls();
    } else {
      this.downRequests.push(user);
      this.downStops.push(user.currentFloor);
      this.downStops.push(user.dropOffFloor);
    }
  }
  
  handleCalls() {
    //sort calls 
    this.upStops.forEach((floor) => {
      console.log(this.currentFloor);
      this.currentFloor = floor;
      this.upRequests.forEach((req) => {
        if (req.dropOffFloor === floor) {
          this.upRequests = this.upRequests.filter(req => req.dropOffFloor !== floor);
        }
      });
    });
  }
  

}


// export default class Elevator {
//   constructor(currentFloor, motionStatus) {
//     this.currentFloor = 0;
//     this.motionStatus = 'idle',
//     this.direction = 'up',
//     this.stops = [],
//     this.requests = [],
//     this.upRequests = [],
//     this.downRequests = []
//   }
// 
//   handleUsers() {
//     this.requests.forEach(user => this.goToFloor(user));
//   }
// 
//   
//   goToFloor(user) {
//     this.pickUpUser(user);
//     console.log(this.currentFloor);
//     this.dropOffUser(user);
//     console.log(this.currentFloor);
//   }
//   
//   pickUpUser(user) {
//     // this.floorsTraversed += Math.abs(this.currentFloor - user.currentFloor);
//     this.currentFloor = user.currentFloor;
//     this.stops.push(user.currentFloor);
//     return this.currentFloor = user.currentFloor;
//   }
//   
//   dropOffUser(user) {
//     // this.floorsTraversed += Math.abs(this.currentFloor - Math.abs(user.dropOffFloor - user.currentFloor));
//     this.currentFloor = user.currentFloor;
//     this.stops.push(user.dropOffFloor);
//     this.requests.filter(person => person.dropOffFloor !== this.currentFloor);
//     return this.currentFloor = user.dropOffFloor;
//   }
//   
//   getUsers() {
//     this.requests.map(request => request.name);
//   }
// 
//   getCurrentFloor() {
//     return this.currentFloor;
//   }
//   
//   getStops() {
//     return this.stops;
//   }
//   
//   countStops() {
//     return this.stops.length;
//   }
//   
//   addRequest(user) {
//       this.requests.push(user);  
//   }
// }
// 
// if(elevator.direction === 'up') {
//   split up floors to stop on in handleUsers
//   stop on appropriate floors and drop off users
// } else {
//   do same for down users
// }
// 
// if (going up) {
//   handle up users, then switch to down and handle down users
// } else {
//   handle down users, then switch to up and handle them
// }
// 
