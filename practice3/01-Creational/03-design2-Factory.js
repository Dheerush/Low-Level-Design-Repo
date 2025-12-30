// ==================================================================== Factory Method ====================================================================


/** Introduction to Factory Method
 *  - Definition: A creational design pattern that provides an INTERFACE for creating objects, but lets SUBCLASSES or a FACTORY decide which class to instantiate.
 *
 *
 *  - Core Idea: "DON’T create objects directly using `new` everywhere. DELEGATE object creation to a factory".
 *  - It promotes loose coupling by delegating object creation to a method, making the system more flexible and extensible.
 *    --> Subclasses override the factory method to produce specific object types.
 *    --> Supports easy addition of new product types without modifying existing code.
 *    --> Enhances maintainability and adaptability at runtime.
 *
 *
 *  - Analogy 1: Imagine you are at a bank. You want to withdraw Money.
 *    --> You interact with the interface. This just means you look at the Screen and use the Buttons.
 *        # You don't open the machine with a screwdriver to see the cash inside.
 *        # You don't care how many $20 bills or $50 bills are in which tray.
 *        # The "Interface" is the menu: You just tell it "I want $100."
 *
 *    --> Then machine handles the complex logic. It has to make decisions:
 *        # Decision A: "Does this person want small bills or large bills?"
 *        # Decision B: "Do I have enough $50s to give them, or should I give them five $20s?"
 *        # The "Logic" is the machine deciding how to put your request together.
 *
 *    --> Instantiate the currency object; "Instantiate" is just a fancy word for "Preparing the result."
 *        # Once the machine decides (Logic), it physically grabs the bills and stacks them.
 *        # If it decided on $50s, it "creates" a stack of two $50 bills.
 *        # If it decided on $20s, it "creates" a stack of five $20 bills.
 *        # To "Instantiate" means the machine finishes the job and hands you the physical money.
 *
 *    --> Imagine if the ATM didn't have a factory (No Factory Method):
 *        # You would have to walk up to the machine and manually tell it: "Please activate Motor #4 to pull two bills from Tray B, then spin the roller to push them out.
 *        # If the bank updated the machine and moved the bills to Tray C, your instructions would fail, and you'd get no money.
 *
 *    --> With the Factory (The ATM): The bank can change the motors, change the trays, or change the bills inside. As long as the "Withdraw" button on the screen still works, you don't have to change anything about how you use it.
 *
 *
 *
 * - Real World Use Cases
 *   --> Example 1: Web Browsers (e.g., Chrome, Firefox)
 *       # Browsers use factory methods to create different types of plugins or page renderers based on content type (e.g., PDF, HTML, Flash).
 *       # This allows flexible and extensible handling of various media. *
 *   --> Example 2: Android OS (Activity Instantiation)
 *       # In Android, activities are often created using factory methods internally to manage lifecycle and resource setup.
 *       # Developers override methods like onCreate() while the system handles object creation. *
 *   --> Example 3: Payment Gateways (e.g., Stripe, PayPal)
 *       # E-commerce platforms use factory methods to create different payment processors.
 *       # Based on user selection, the factory returns an instance of the correct payment service without changing client logic. *
 *   --> Example 4: Game Development (e.g., Unity, Unreal Engine)
 *       # Games use factory methods to spawn enemies, items, or NPCs dynamically based on game level or environment.
 *       # This decouples object creation from the game logic and enables easy scalability. *
 *   --> Example 5: Factories help create objects from serialized data, supporting various formats.
 *   --> Example 6: Used in JDBC for creating connections and in frameworks like Spring for managing beans.
 *   --> Example 7: Libraries like Swing and JavaFX use factories to create flexible UI components.
 *   --> Example 8: Tools like Log4j rely on factories to create configurable loggers.
 *
 *
 * - Components of Factory Method Design Pattern
 *   1. Product: Abstract interface or class for objects created by the factory.
 *   2. Concrete Product: The actual object that implements the product interface.
 *   3. Creator (Factory Interface/Abstract Class): Declares the factory method.
 *   4. Concrete Creator (Concrete Factory): Implements the factory method to create specific products.
 *
 *
 */

//let's see some basic example to get a hold of factory pattern , then we will move to Advance/Real life code examples
//  ========================================== Example 1: ❌ Without Factory Pattern ==========================================
class UPIPayment {
    pay(amount) {
        console.log(`Amount paid via UPI: Rs.${amount}`);
    }
}

class CreditCardPayment {
    pay(amount) {
        console.log(`Amount paid via Credit Card: Rs.${amount}`);
    }
}

class NetBankingPayment {
    pay(amount) {
        console.log(`Amount paid via Net Banking Rs.${amount}`);
    }
}


// Client-Code (Messy Part)
function processPayment(paymentMode, amount) {
    let paymentProcessor;
    if (paymentMode === 'credit') {
        paymentProcessor = new CreditCardPayment();
    } else if (paymentMode === 'upi') {
        paymentProcessor = new UPIPayment();
    } else if (paymentMode === 'netbanking') {
        paymentProcessor = new NetBankingPayment();
    } else {
        throw new Error("Invalid Payment Type")
    }

    // Business logic depends directly on concrete class
    paymentProcessor.pay(amount);
}

console.log("========== Example 1: Without Factory Method ============")
processPayment("credit", 1000);
processPayment("upi", 1000);
processPayment("netbanking", 1000);
console.log(""); // for break 

/** Why this is a BAD PRACTICE 
 * 1. Violating OCP: If tomorrow we add "PayPal", We MUST modify processPayment()
 * 2. Poor Scalability: More payment methods = Bigger if/else or switch
 * 3. Client knows TOO MUCH
 *    # It knows every concrete payment class.
 *    # It knows WHEN to create WHICH object
 *    > Recommended: The CLIENT should focus on "PROCESSING PAYMENT". NOT on "DECIDING WHICH PAYMENT OBJECT TO CREATE". 
 * 4. Tight Coupling: processPayment() is directly coupled to:  CreditCardPayment, UPIPayment and NetBankingPayment
 */




//  ==================== Example 2: Simple Factory (Better, but not the GoF "Pattern") ====================
// Factory that CENTRALIZES object creation
class SimplePaymentFactory {

    static createPayment(paymentMode) {
        if (paymentMode === "credit") return new CreditCardPayment();
        if (paymentMode === "upi") return new UPIPayment();
        if (paymentMode === "netbanking") return new NetBankingPayment();

        throw new Error("Invalid Payment Type");
    }
}



console.log("========== Example 2: Simple Factory ============")
// Client Code
const myPayment1 = SimplePaymentFactory.createPayment("upi")
myPayment1.pay(1500);
const myPayment2 = SimplePaymentFactory.createPayment("credit")
myPayment1.pay(1200);
const myPayment3 = SimplePaymentFactory.createPayment("netbanking")
myPayment1.pay(100);
console.log(""); // break

/**
 *  - This is better than example1. Why? 
 *    1. Client does NOT use `new`
 *    2. Object creation is centralized
 *    3. Cleaner client code
 * 
 * - Why it is still not a recommended practice and needs to be better ?
 *   1. Violates Open–Closed Principle : Adding PayPal still requires modifying SimplePaymentFactory
 *   2. Simple Factory knows ALL concrete classes
 *   3. NOT true Factory Method (GoF)
 *      # No abstraction
 *      # No subclass overriding factory method
 * 
 * - ⚠️ This is called Simple Factory" or "Static Factory
 *      # Common in real projects but But NOT an official GoF pattern
 * 
 */






//  ========================================== Example 3: With Factory Pattern ==========================================



