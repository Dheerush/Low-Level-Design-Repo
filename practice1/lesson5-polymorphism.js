// ============================= Polymorphism ===================================

// ============================= Example 1 =============================
// Parent
class Bird {
    constructor(name) {
        this.name = name;
    }

    // Common behavior
    eat() {
        console.log(`${this.name} is eating`);
    }

    sleep() {
        console.log(`${this.name} is sleeping`);
    }

    fly() {
        console.log(`${this.name} is flying`);
    }
}

// Child Class 
class Penguin extends Bird {
    constructor(name) {
        super(name);
    }

    // Method Overriding: Overriding the fly behavior
    fly() {
        console.log(`${this.name} cannot fly, but it can swim 🐧`);
    }

    swim() {
        console.log(`${this.name} is swimming`);
    }
}



// ======================= Usage =======================
const sparrow = new Bird("Sparrow");
const penguin = new Penguin("Penguin");

// Same method call
sparrow.fly();   // Sparrow is flying
penguin.fly();   // Penguin cannot fly, but it can swim 🐧

// Common behavior still works
penguin.eat();   // Penguin is eating
penguin.sleep(); // Penguin is sleeping

// NOTE : Although it is good for understanding, but this design is flawed. This violates Liskov Substitution Principle (LSP) which will study later.



// We have done method overriding, now lets' learn about method overloading through a new example
// Method overloading = same method name, different ways to call it
// In lesson 1: we saw that we could only create 1 constructor, there can not be 2 constructors (default and parameterized); 








/** NOTES
 * - Polymorphism
 *   --> Poly: means many
 *   --> morphism: morphism means transforming one form into another
 * - Polymorphism means the same function with different signatures is called many times. 
 *   --> It allows methods to do different things based on the object it is acting upon.
 *   --> In JavaScript, polymorphism works in two primary ways:
 *       1. Method Overriding: A child class overrides a method of its parent class. Different behavior → runtime decision
 *       2. Method Overloading (simulated): A function behaves differently based on the number or type of its arguments.
 *          ==> JS does NOT support method overloading like Java/C++. JavaScript runs perfectly without method overloading.
 *          ==> But it is VERY useful: 
 *              ~ It improves: API usability, Readability, Developer experience (DX)
 * 
 */










