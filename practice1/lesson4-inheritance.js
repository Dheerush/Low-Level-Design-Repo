// =========================== Inheritance ===========================

// Example 1: 

// ======================= Parent Class =======================
class Vehicle {
    // Private Fields 
    #speed;
    #cost;

    constructor(brand, speed, cost) {
        this.brand = brand;   // public
        this.#speed = speed;  // private
        this.#cost = cost;    // private (read-only from outside)
    }

    // ================= Getters =================
    get speed() {
        return this.#speed;
    }

    get cost() {
        return this.#cost;
    }

    // ================= Setters =================
    set speed(value) {
        if (value < 0) {
            throw new Error("Speed cannot be negative");
        }
        this.#speed = value;
    }

    // ================= Common Behavior =================
    accelerate(amount) {
        if (amount <= 0) {
            throw new Error("Acceleration must be positive");
        }

        this.#speed += amount;
        console.log(`Speed increased to ${this.#speed} km/h`);
    }

    brake(amount) {
        if (amount <= 0) {
            throw new Error("Brake amount must be positive");
        }

        this.#speed = Math.max(0, this.#speed - amount);
        console.log(`Speed reduced to ${this.#speed} km/h`);
    }
}

// ======================= Child Class: Car =======================
class Car extends Vehicle {
    constructor(brand, speed, cost, fuelType, colour) {
        // initialize parent state
        super(brand, speed, cost);

        // child-specific state
        this.fuelType = fuelType;
        this.colour = colour;
    }

    // child-specific behavior
    startEngine() {
        console.log(
            `${this.brand} car (${this.colour}) started using ${this.fuelType} fuel`
        );
    }
}

// ======================= Child Class: Bike =======================
class Bike extends Vehicle {
    constructor(brand, speed, cost, colour, hasGear) {
        super(brand, speed, cost);

        this.colour = colour;
        this.hasGear = hasGear;
    }

    ride() {
        console.log(
            `${this.brand} bike (${this.colour}) is being ridden`
        );
    }
}

// ======================= Child Class: BatteryBike =======================
class BatteryBike extends Bike {
    constructor(
        brand,
        speed,
        cost,
        colour,
        hasGear,
        chargingTime,
        batteryBackup
    ) {
        super(brand, speed, cost, colour, hasGear);

        this.chargingTime = chargingTime;
        this.batteryBackup = batteryBackup;
    }

    // child-specific behavior
    chargeBattery() {
        console.log(
            `Charging ${this.brand} battery bike for ${this.chargingTime} hours`
        );
    }
}

// ======================= Usage =======================
const car = new Car("Tesla", 60, 50000, "Electric", "Red");
car.startEngine();
car.accelerate(20);
car.brake(10);
console.log("Car speed:", car.speed);
console.log("Car cost:", car.cost);

const bike = new Bike("Yamaha", 40, 1500, "Blue", true);
bike.ride();
bike.accelerate(10);
console.log("Bike speed:", bike.speed);

const eBike = new BatteryBike(
    "Ather",
    35,
    1800,
    "White",
    true,
    4,
    "80km"
);
eBike.ride();
eBike.chargeBattery();
console.log("Battery bike speed:", eBike.speed);
console.log("Battery bike cost:", eBike.cost);



/** Observations: 
 * 1. In the above examples, we have been using the common method (like coming from parent), but what if the child needs to override those method ? We have not encountered that scenario. For that we'll use Polymorphism (in the upcoming lessons)
 * 2. Multi-level inheritance (BatteryBike extends Bike extends Vehicle) is fine for learning, but in-real LLD systems, deep inheritance can make code rigid.
 * 3. LLD principle: A child should not weaken or break parent method expectations. When we learn polymorphism later, will keep this in mind while practicing.
 */



/** NOTE: 
 * Inheritance
 * - It allows a class (child) to reuse behavior of another class (parent).
 * - It establishes an "is-a" relationship.
 * - Example: 
 *   --> Car IS A Vehicle
 *   --> Bike IS A Vehicle
 * - Inheritance is useful for code reusability: reuse properties and methods of an existing class when you create a new class.
 * 
 * - To create a class inheritance, use the extends keyword 
 * - A class created with a class inheritance inherits all the methods from another class.
 *   --> The super() method refers to the parent class.
 *   --> By calling the super() method in the constructor method, we call the parent's constructor method and gets access to the parent's properties and methods.
 */


/**
 * Design principle:
 * - Encapsulation first, inheritance second.
 * - Expose behavior, hide data.
 * - Child classes should reuse behavior, not internal state.
 */
