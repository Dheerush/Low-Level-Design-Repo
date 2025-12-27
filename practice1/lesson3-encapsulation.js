// =============== Encapsulation ================
// Earlier we had done encapsulation indirectly.
// This time we implement it properly using private fields.


class Vehicle {
    // ================= Private Fields =================
    #speed;
    #mileage;

    constructor(brand, speed, mileage, mfgYear) {
        this.brand = brand;        // public
        this.#speed = speed;       // private
        this.#mileage = mileage;   // private
        this.mfgYear = mfgYear;    // public
    }

    // ================= Getters =================
    get speed() {
        return this.#speed;
    }

    get mileage() {
        return this.#mileage;
    }

    // ================= Setters =================
    set speed(value) {
        if (value < 0) {
            throw new Error("Speed cannot be negative");
        }
        this.#speed = value;
    }

    set mileage(value) {
        if (value < 0) {
            throw new Error("Mileage cannot be negative");
        }
        this.#mileage = value;
    }

    // ================= Behavior =================
    accelerate(amount) {
        this.#speed += amount;
        console.log(`Speed increased to ${this.#speed}`);
    }
}

// ================= Usage =================
const car = new Vehicle("Tesla", 60, 15, 2022);

console.log(car.speed);     // ✅ getter
car.speed = 80;             // ✅ setter
car.accelerate(20);         // ✅ behavior

// ❌ Direct access not allowed
// car.#speed = 200;  // SyntaxError


/**
 * NOTE:
 * 1. Encapsulation
 *    - Encapsulation means hiding internal (sensitive) data and exposing only controlled access to it.
 *    - Internal state should NOT be accessed directly from outside.
 *    - Access is provided using public methods or getters/setters.
 *    - This protects the object from invalid or unintended usage.
 */


/** Golden Rule about private
    - If something must NEVER be touched → use #private
    - If something may be used by child classes → expose a method
    - If something is internal but shared → _method by convention
 */




/** 1. Protected 
 *  - Unlike C++, JS does NOT have protected.
 *  - Protected means: Not accessible outside the class even with getter and setter, but accessible inside child classes
 *  - JS was originally prototype-based, not class-based. So for a long time, there were: 
 *                                                                              --> no private
 *                                                                              --> no protected
 *                                                                              --> no access modifiers at all
 *  - ES2022 added: #privateField. But they skipped protected on purpose.
 *  - To achieve something like protected, JS developer use a convention "_" which means "don’t touch from outside". This avoids the need for protected entirely.
 *    "_" does not prevent access, preffered to be used only when true private (#) is not available.

 
 *  - Summary: JavaScript doesn’t need protected because it promotes behavior-based encapsulation instead of inheritance-based access control.
 
 */

