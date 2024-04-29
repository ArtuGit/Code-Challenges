/**
 * 
Implement a basic transport system

Requirements:

Implement a basic transport system with the following features:
Ability to create a new transport with a name, a max weight capacity and max speed.
Ability to add items to a transport, ensuring that the weight of the transport does not exceed the maximum weight capacity.
Ability to calculate the total weight of the cargo.

 */

/**
 Requirements:

Add support for different types of transports, such as cars and trucks. Cars can get max weight - 10 w_units, trucks - 30 w_units. And speed cars - 100 s_units per second, trucks - 70 s_units per second.
We need the ability to calculate the current speed of the transport. For cars formula is maxSpeed - currentWeight, trucks - maxSpeed - (currentWeight/4)
Cars and trucks has to implement method called “drive” that advances their distance by 1 sec multiplied by their speed
Total distance should be tracked
Each type of transport should have its own implementation

 */

/**
Requirements
Create a list of transport - 10 vehicles.
Every 3d element should be trucks, others - cars. List starts counting from 0.
Add to each vehicle 1 item with weight 4
Call method “drive” depends on vehicle position on the list +1. It means the first item with index 0 call method drive once..
Print the list output one line per vehicle so each line reads like “VEHICILE_NAME with weight ITEMS_WEIGHT traveled DISTANCE”

 */


class Transport {
    constructor(name, maxCapacity, maxSpeed) {
      this.name = name,
      this.maxCapacity = maxCapacity,
      this.maxSpeed = maxSpeed,
      this.weight = 0
      this.distance = 0
    }
  
    addItem(weight) {
      if (this.weight + weight < this.maxCapacity)
      this.weight = this.weight + weight
    }
  
    getTotalWeigth() {
      return this.weight
    }
  
    drive(seconds, currentSpeed) {
      this.distance = seconds * currentSpeed
    }
  }
  
  class Car extends Transport {
      constructor(name, maxCapacity, maxSpeed) {
          if (maxCapacity > 10) {
              console.error ("Max capacity is exceed")
          }
          if (maxSpeed > 100) {
              console.error ("Max speed is exceed")
          }
          super(name, maxCapacity, maxSpeed)
      }
      getCurrentSpeed() {
          return this.maxSpeed - this.weight 
      }
  }
  
  
  class Track extends Transport {
      constructor(name, maxCapacity, maxSpeed) {
          if (maxCapacity > 30) {
            console.error ("Max capacity is exceed")
          }
          if (maxSpeed > 70) {
            console.error ("Max speed is exceed")
          }
          super(name, maxCapacity, maxSpeed)
      }
      getCurrentSpeed() {
          return this.maxSpeed - (this.weight/4) 
      }    
  }

  let transports = []
  for (let i=1;i<10;i++){
    if (i % 3 == 0) {
      transports.push(new Track(i, 100, 80))
    } else {
      transports.push(new Car(i, 80, 100))
    }
  }
  
  transports.forEach((t)=>{
    t.addItem(4);  
  })
  
  for (let i=0;i<9;i++){
      const currentSpeed = transports[i].getCurrentSpeed()
      for (let j=0;j<=i;j++) {
        transports[i].drive(j+1,currentSpeed)
      }
  }
  
  transports.forEach((t)=>{
      console.log(`${t.name} with weight ${t.weight} traveled ${t.distance} `);
  })