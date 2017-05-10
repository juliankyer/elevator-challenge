require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

var chai = require('chai');
var assert = require('chai').assert;
const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Elevator', function() {
  
  it('should start on base floor', () => {
    let elevator = new Elevator();
    assert.equal(elevator.currentFloor, 0);
  });
  
  it('should sort calls into up and down', () => {
    let elevator = new Elevator();
    let mockUser1 = new Person('Brittany', 2, 5, 'up');
    let mockUser2 = new Person('Robbie', 7, 3, 'down');
    elevator.newRequests(mockUser1);
    elevator.newRequests(mockUser2);
    
    assert.deepEqual(elevator.upRequests, [{
      name: 'Brittany',
      currentFloor: 2,
      dropOffFloor: 5,
      direction: 'up'
    }]);
    assert.deepEqual(elevator.downRequests, [{
      name: 'Robbie',
      currentFloor: 7,
      dropOffFloor: 3,
      direction: 'down'
    }]);
  });
  
  it('should handle one upward req', () => {
    let elevator = new Elevator();
    let mockUser1 = new Person('Brittany', 2, 5, 'up');
    elevator.newRequests(mockUser1);
    
    assert.deepEqual(elevator.upRequests, [{
      name: 'Brittany',
      currentFloor: 2,
      dropOffFloor: 5,
      direction: 'up'
    }]);

    elevator.handleCalls();
    assert.deepEqual(elevator.upRequests, []);
  });
  
  // it('should bring a rider to a floor above their current floor', () => {
  //   let elevator = new Elevator();
  //   let mockUser = new Person('Brittany', 2, 5, 'up');
  //   elevator.goToFloor(mockUser);
  //   
  //   assert.equal(elevator.currentFloor, 5);
  //   assert.equal(elevator.motionStatus, 'idle');
  //   assert.deepEqual(elevator.getStops(), [2, 5]);
  // });
  // 
  // it('should bring a rider to a floor below their current floor', () => {
  //   let elevator = new Elevator();
  //   let mockUser = new Person('Brittany', 8, 3, 'down');
  //   elevator.goToFloor(mockUser);
  //   
  //   assert.equal(elevator.currentFloor, 3);
  //   assert.equal(elevator.motionStatus, 'idle');
  //   assert.deepEqual(elevator.getStops(), [8, 3]);
  // });
  // 
  // it('should be able to count number of stops', () => {
  //   let elevator = new Elevator();
  //   let mockUser = new Person('Brittany', 2, 5, 'up');
  //   elevator.goToFloor(mockUser);
  //   
  //   assert.equal(elevator.countStops(), 2);
  // })
  // 
  // it('should record requests', () => {
  //   let elevator = new Elevator();
  //   let mockUser = new Person('Brittany', 8, 3, 'down');
  //   
  //   elevator.addRequest(mockUser);
  //   assert.deepEqual(elevator.requests, [{
  //     name: 'Brittany',
  //     currentFloor: 8,
  //     dropOffFloor: 3,
  //     direction: 'down' }]);
  // });
  // 
  // it('should handle multiple users', () => {
  //   let elevator = new Elevator();
  //   let user1 = new Person('Brittany', 8, 3, 'down');
  //   let user2 = new Person('Robbie', 2, 7, 'up');
  //   
  //   elevator.addRequest(user1);
  //   elevator.addRequest(user2);
  //   elevator.handleUsers(elevator.requests);
  // 
  //   assert.equal(elevator.currentFloor, 7);
  //   assert.deepEqual(elevator.stops, [8, 3, 2, 7]);
  // });
  // 
  // it('should handle multiple users pt 2', () => {
  //   let elevator = new Elevator();
  //   let user1 = new Person('Brittany', 1, 3, 'up');
  //   let user2 = new Person('Robbie', 2, 7, 'up');
  //   
  //   elevator.addRequest(user1);
  //   elevator.addRequest(user2);
  //   elevator.handleUsers(elevator.requests);
  // 
  //   assert.equal(elevator.currentFloor, 7);
  //   assert.deepEqual(elevator.stops, [1, 3, 2, 7]);
  // });
  
  
});



