require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

var chai = require('chai');
var assert = require('chai').assert;
const Elevator = require('../elevator').default;
const Person = require('../person').default;

describe('Elevator', function() {
  let elevator = new Elevator();
  
  afterEach( function() {
    elevator.reset();
  });
  
  it('should start on base floor', () => {
    assert.equal(elevator.floor, 0);
  });
  
  it('should pick up a person going up', () => {
    let user = new Person('Julian', 2, 5, 'up');
    elevator.newCall(user);
    
    assert.deepEqual(elevator.requests, [{
      name: 'Julian',
      floor: 2,
      dropFloor: 5,
      direction: 'up'
    }]);
    

    elevator.handleRequests();
    assert.deepEqual(elevator.riders, []);
    assert.equal(elevator.floor, 5);
    // assert.equal(elevator.goToFloor()).called(2)
    // assert.equal(elevator.loadRider())
    // assert.equal(elevator.dropRider)
  });
  
  it('should pick up a person going down', () => {
    let user = new Person('Julian', 7, 3, 'down');
    elevator.newCall(user);
    
    assert.deepEqual(elevator.requests, [{
      name: 'Julian',
      floor: 7,
      dropFloor: 3,
      direction: 'down'
    }]);
    
    elevator.handleRequests();
    assert.deepEqual(elevator.riders, []);
    assert.equal(elevator.floor, 3);
  });
  
  it('newCall should add a request and a pickup floor', () => {
    let user = new Person('Julian', 2, 4, 'up');
    elevator.newCall(user);
    
    assert.deepEqual(elevator.requests, [{
      name: 'Julian',
      floor: 2,
      dropFloor: 4,
      direction: 'up'
    }]);
    
    assert.deepEqual(elevator.stops, [2])
  });
  
  it('goToFloor should take the elevator to a specified floor', () => {
    elevator.goToFloor(5);
    assert.equal(elevator.floor, 5);
  });
  
  it('loadRider should put a riders name in a riders array', () => {
    let user = new Person('Julian', 2, 4, 'up');
    elevator.newCall(user);
    elevator.goToFloor(2);
    elevator.loadRider();
    
    assert.deepEqual(elevator.riders, ['Julian']);
  });
  
  it('dropRider should remove a rider from the array when rider is at dropFloor', () => {
    let user = new Person('Julian', 2, 4, 'up');
    elevator.newCall(user);
    elevator.goToFloor(2);
    elevator.loadRider();
    elevator.goToFloor(4);
    elevator.dropRider({
      name: 'Julian',
      floor: 2,
      dropFloor: 4,
      direction: 'up'
    });
    
    assert.deepEqual(elevator.riders, []);
  });
  
  it('should handle two upward requests', () => {
    let user1 = new Person('Julian', 2, 4, 'up');
    let user2 = new Person('Bob', 5, 7, 'up');
    
    elevator.newCall(user1);
    elevator.handleRequests();
    
    assert.equal(elevator.floor, 4);
    assert.equal(elevator.traversed, 4);
    // assert.equal(elevator.countStops(), 1);
    
    elevator.newCall(user2);
    elevator.handleRequests();
    
    assert.equal(elevator.floor, 7);
    assert.equal(elevator.traversed, 7);
    // assert.equal(elevator.countStops(), 2);
  });
  
  it('should handle two downward requests', () => {
    let user1 = new Person('Julian', 5, 2, 'down');
    let user2 = new Person('Bob', 7, 3, 'down');
    
    elevator.newCall(user1);
    elevator.newCall(user2);
    elevator.handleRequests();
    
    assert.equal(elevator.floor, 3);
    assert.equal(elevator.traversed, 17);
  });
  
  it('should handle one up, one down', () => {
    let user1 = new Person('Julian', 2, 9, 'up');
    let user2 = new Person('Bob', 12, 4, 'down');
    
    elevator.newCall(user1);
    elevator.newCall(user2);
    elevator.handleRequests();
    
    assert.equal(elevator.floor, 4);
    assert.equal(elevator.traversed, 20);
  });
  
});



