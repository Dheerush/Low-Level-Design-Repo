// ============================= Polymorphism ===================================

// ================================ Example 1 ==================================
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


// ====================================== Example 1 ===============================================
class Payment {
    pay(amount) {
        throw new Error("pay() must be implemented by the child")
    }
}

class CreditCardPayment extends Payment {
    pay(amount) {
        if (amount <= 0) throw new Error("Invalid Amount");
        console.log(`Credit Card Payment done: Rs.${amount}`)

    }
}
class UPIPayment extends Payment {
    pay(amount) {
        if (amount <= 0) throw new Error("Invalid Amount");
        console.log(`UPI Payment done: Rs.${amount}`)
    }
}
class CashPayment extends Payment {
    pay(amount) {
        if (amount <= 0) throw new Error("Invalid Amount");
        console.log(`Cash Payment done: Rs.${amount}`)
    }
}

function processPayment(paymentMethod, amount) {
    paymentMethod.pay(amount);
}

const creditCard = new CreditCardPayment();
const upi = new UPIPayment();
const cash = new CashPayment();

processPayment(creditCard, 100);
processPayment(upi, 100);
processPayment(cash, 100);


// Example 3: Polymorphism WITHOUT inheritance (JS reality). This is important because JS is duck-typed. Polymorphism in JS is behavior-based, not class-based.


const razorpay = {
    pay(amount) {
        console.log(`Razorpay payment of Rs.${amount}`);
    }
};

// STILL WORKS
processPayment(razorpay, 100);


/**  
 Q1 : Why does this work even though razorpay:
      - does NOT extend Payment; as we have not created it as a child
      - is NOT a child class
      - is NOT an object of Payment
      - should have thrown an error?

 Ans:
 i)   Unlike Java or C++, JavaScript does NOT check whether `razorpay` is an `instanceof Payment`. There is NO class-based type checking at runtime.

 ii)  JavaScript is a DYNAMICALLY TYPED and DUCK-TYPED language. This means JS does not care about:
       - which class an object belongs to
       - whether inheritance exists
       - whether it extends a parent class

 iii) JS only checks ONE thing at runtime: Does the object have the method that is being called? In this case: `pay()`

 iv)  Since `razorpay` has a `pay()` method, the call processPayment(razorpay, amount) works without any error.

 v)   The error inside `Payment.pay()` is NOT thrown because:
      - `Payment.pay()` is NEVER called
      - JS directly calls `razorpay.pay()`

 vi)  This behavior is called DUCK TYPING: “If an object looks like a Payment and behaves like a Payment, JavaScript treats it as a Payment.”
      - Duck typing means an object is considered valid based on the methods it has, not the class it belongs to. If an object has the methods I need, I don’t care what class it belongs to.
      - The famous phrase: "If it looks like a duck and quacks like a duck, it’s a duck".
        This allows flexible designs but requires defensive checks or TypeScript interfaces for safety.

 vii) Therefore, in JavaScript, polymorphism is BEHAVIOR-BASED, not CLASS-BASED.
 */






/** NOTES
 * - Polymorphism
 *   --> Poly: means many ---> many forms --> The method behavior changes depends on the object
 *   --> morphism: morphism means transforming one form into another
 *   --> Polymorphism means the SAME message (method call) can result in DIFFERENT behavior depending on the object receiving it. 
 *       meaning Same call → different behavior → based on object type
 * -  Polymorphism means the same method call can result in different behavior
 *   --> It allows methods to do different things based on the object it is acting upon.
 *   --> In JavaScript, polymorphism works in two primary ways:
 *       1. Method Overriding: A child class overrides a method of its parent class. Different behavior → runtime decision
 *       2. Method Overloading (simulated): A function behaves differently based on the number or type of its arguments.
 *          ==> JS does NOT support method overloading like Java/C++. JavaScript runs perfectly without method overloading.
 *          ==> But it is VERY useful: 
 *              ~ It improves: API usability, Readability, Developer experience (DX)
 * 
 */


