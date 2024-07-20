class Spot {
    constructor(spotId) {
        this.spotId = spotId; 
        this.vehicle = null;
    }
    parkVehicle(vehicle) {
        this.vehicle = vehicle;
    }
    removeVehicle() {
        this.vehicle = null;
    }
    isAvailable() {
        return this.vehicle === null;
    }
}

class Level {
    constructor(levelId, numSpots) {
        this.levelId = levelId;
        
        this.spots = []
        for(let i=0;i<numSpots;i++){
            this.spots.push(new Spot(i))
        }
    }
    findAvailableSpot() {// Method to find first available spot in the level
        return this.spots.find(spot => spot.isAvailable());
    }
}

class ParkingLot {
    constructor(numLevels, spotsPerLevel) {
        this.levels = []
        for(let i =0;i<numLevels;i++){
            this.levels.push(new Level(i, spotsPerLevel))
        }
    }
    parkVehicle(vehicle) {
        for (const level of this.levels) {
            const spot = level.findAvailableSpot();
            if (spot) {
                spot.parkVehicle(vehicle);
                return `Vehicle ${vehicle.licensePlate} parked at Level ${level.levelId}, Spot ${spot.spotId}`;
            }
        }
        return "Parking Lot is Full";
    }
    removeVehicle(levelId, spotId) {
        if (this.levels[levelId] && this.levels[levelId].spots[spotId]) {
            this.levels[levelId].spots[spotId].removeVehicle();
            return `Vehicle removed from Level ${levelId}, Spot ${spotId}`;
        }
        return "Invalid Level or Spot ID";
    }
}
class Vehicle {
    constructor(licensePlate) {
        this.licensePlate = licensePlate;
    }
}


const parkingLot = new ParkingLot(3, 10);
const vehicle1 = new Vehicle("123-ABC");
const vehicle2 = new Vehicle("456-DEF");

console.log(parkingLot.parkVehicle(vehicle1));
console.log(parkingLot.parkVehicle(vehicle2));
console.log(parkingLot.removeVehicle(0, 0));

/*
Design a parking lot with vehicles to get allocated spot and removed vice versa

Solution
    Classes and Methods

    ParkingLot
        - parkVehicle
        - removeVehicle
    Level
        - findAvailableSpot
    Spot
        - parkVehicle
        - removeVehicle
        - isAvailable
    Vehicle
*/