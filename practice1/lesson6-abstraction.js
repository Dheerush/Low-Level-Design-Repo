// ============================= Abstraction =============================

// Abstract-like Base Class
class BankAccount {
    #amount;

    constructor(amount, time) {
        this.#amount = amount; // encapsulated
        this.time = time;      // public (can be read by child)
    }

    // Controlled access to private data (protected-style)
    getAmount() {
        return this.#amount;
    }

    // Abstract method (contract)
    calculateInterest() {
        throw new Error("calculateInterest() must be implemented by child classes");
    }
}

// ============================= Child Class 1 =============================

class LoanAccount extends BankAccount {
    constructor(amount, time) {
        super(amount, time);
    }

    // Method Overriding
    calculateInterest() {
        const rate = 10; // 10%
        return (this.getAmount() * rate * this.time) / 100;
    }
}

// ============================= Child Class 2 =============================

class FixedDepositAccount extends BankAccount {
    constructor(amount, time) {
        super(amount, time);
    }

    // Method Overriding
    calculateInterest() {
        const rate = 4.5; // 4.5%
        return (this.getAmount() * rate * this.time) / 100;
    }
}

// ============================= Polymorphic Function =============================

function findInterest(account) {
    console.log("Interest:", account.calculateInterest());
}

// ============================= Usage =============================

const loanAccount = new LoanAccount(1000, 2);
const fdAccount = new FixedDepositAccount(1000, 2);

findInterest(loanAccount); // Interest: 200
findInterest(fdAccount);   // Interest: 90



/** NOTES
 * - Abstraction:
 *   --> In JavaScript, Abstraction can be defined as the concept of hiding the inner complex workings of an object and exposing only the essential features to the user.
 *   --> Abstraction means showing what an object can do, not how it does it. Abstraction answers “WHAT”, not “HOW”
 * - --> The JavaScript does not provide built-in support for implementing the abstraction like the other programming language gives. 
 *       However we can implement abstraction in JavaScript using functions, objects, closures, and classes.
 * 
 */


