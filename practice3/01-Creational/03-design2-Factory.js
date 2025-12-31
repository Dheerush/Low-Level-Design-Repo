// ==================================================================== Factory Method ====================================================================


/** Introduction to Factory Method
 *  - Definition: A creational design pattern that provides an INTERFACE for creating objects, but lets SUBCLASSES or a FACTORY decide which class to instantiate. Think of it as a blueprint for a production line.
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
 *   --> Imagine a company that makes Electronic Gadgets. 
 *        1. Product Interface (The Blueprint/Contract)
 *           > It is a set of rules. 
 *           > The company creates a document that says: "Any gadget we sell must have a powerOn() button and a getBatteryLevel() indicator." 
 *           > Why it's not a real object: You cannot use a "blueprint" to browse the internet. It’s just paper.
 *          
 * 
 *        2. Concrete Product (The Actual Gadget)
 *           > The assembly line follows the blueprint and builds a Smartphone and a Laptop.
 *             ~ Smartphone: Implements powerOn() (by holding a side button) and getBatteryLevel() (shows a % on screen).
 *             ~ Laptop: Implements powerOn() (by pressing a keyboard button) and getBatteryLevel() (shows an icon in the taskbar).
 *             ~ Difference: Both follow the "Contract," but they do the work differently.
 * 
 * 
 *        3. Creator (The Factory Management)
 *           > The company HQ (Headquarters) says: "We are a gadget company. We must have a department that produces a gadget."
 *           > What it is: They don't know which gadget yet; they just know they need a "Production Department." * 
 * 
 * 
 *        4. Concrete Creator (The Specific Branch)
 *          > The Smartphone Branch of the company.
 *          > What it does: When you ask this branch for a product, they use the new keyword: return new Smartphone().
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

/**Approach: 
 * - Before writing even a single line of code, we must understand:
 *    1. What problem Factory Method is solving ?
 *       --> The client should NOT decide which concrete object to create.
 *       --> The client should depend on ABSTRACTIONS, not CONCRETE CLASSES.
 *       --> Object creation should be DEFERRED to subclasses.
 *       --> In short:
 *           # Client: "If type is X, create object Y"  ❌
 *           # Client: "Give me something that follows this contract" ✅      
 * 
 * 
 * 
 *    2. What are its components ? Are they all mandatory ?
 *      -->  There are 4 main components, and while they all play a specific role, their "mandatory" status depends on how strictly you follow the formal pattern. 
 *      -->  We usually define them in this logical order provided below
 *      -->  In a strict, formal implementation,  all 4 are needed to maintain "Loose Coupling." However, in the real world (especially in JavaScript):
 * 
 *           1). Product Interface
 *             > Is it mandatory ? : No, In JS, we often "skip" the formal interface class and just ensure our objects have the same method names (like .process() or .render())
 *             > What it does ? 
 *                ~ This is an INTERFACE or ABSTRACT CLASS. It defines WHAT the object can do.
 *                ~ It does NOT know: who creates the object and when it is created.
 *                ~ Think of it as a CONTRACT. For example: "Any Payment must be able to pay(amount)". 
 *                ~ RULES : 
 *                   >> No implementation details
 *                   >> Only method signatures
 *             
 * 
 *           2). CONCRETE PRODUCT (ACTUAL IMPLEMENTATION) :
 *             > Is it mandatory ? : Yes,
 *             > What it does?              
 *               ~ These are the real objects created at runtime.
 *               ~ Each concrete product IMPLEMENTS the Product interface.
 *               ~ Each one has its own behavior
 *               ~ Example thinking: CreditCardPayment, UPIPayment, NetBankingPayment
 *               ~ RULES :
 *                 >> Implements Product. 
 *                 >> Contains real business logic 
 *                 >> Client should NEVER directly create these using `new`
 *             
 * 
 *           3). Creator (Abstract):
 *             > Is it mandatory ? : Often "Optional". We might just have a single Factory class if your logic isn't complex enough to need subclasses.
 *             > What it does ?
 *               ~ This is an ABSTRACT CLASS (or interface).
 *               ~ It DECLARES the factory method.
 *               ~ It does NOT decide which concrete product to create.
 *             > Important:
 *               ~ The creator works with Product (abstraction), NOT concrete classes.
 * 
 * 
 *           4). Concrete Creator
 *             > Is it mandatory ? : Mandatory for the "Factory Method" pattern. This is where the actual new keyword lives.
 *             > What it does ?
 *               ~ This is where ACTUAL object creation happens.
 *               ~ Each concrete creator overrides the factory method.
 *               ~ Each one returns a DIFFERENT concrete product.
 *             > Rules:
 *               ~ Extends Creator
 *               ~ Overrides factory method
 *               ~ Uses `new`, but ONLY here
 *             > Example thinking:
 *               ~ CreditCardPaymentFactory → creates CreditCardPayment
 *               ~ UPIPaymentFactory → creates UPIPayment
 
 * */


// Step1: Product (Abstraction)
class Payment {
    pay(amount) {
        throw new Error("pay() must be implemented by subclasses")
    }
}

// Step2: Concrete Products
class NewCreditCardPayment extends Payment {
    pay(amount) {
        console.log(`Payment done via New Credit Card: Rs.${amount}`)
    }
}

class NewUPIPayment extends Payment {
    pay(amount) {
        console.log(`Payment done via New UPI: Rs.${amount}`)
    }
}
class NewNetBanking extends Payment {
    pay(amount) {
        console.log(`Payment done via New Net Banking: Rs.${amount}`)
    }
}

// Step3: Creator (Factory Abstraction)
class PaymentFactory {
    createPayment() {
        throw new Error("createPayment() must be implemented by subclasses");
    }

    // This is the "Button" the client presses. 
    // It doesn't know WHICH payment it's using!
    processPayment(amount) {
        const payment = this.createPayment(); // FIX 1: Added () to call the method
        payment.pay(amount); // FIX 2: Corrected method name to .pay()
    }
}

// Step 4: Concrete Creators
class CreditCardPaymentFactory extends PaymentFactory { 
    createPayment() {
        return new NewCreditCardPayment();
    }
}

class NetBankingFactory extends PaymentFactory {
    createPayment() {
        return new NewNetBanking(); 
    }
}
class UPIPaymentFactory extends PaymentFactory {
    createPayment() {
        return new NewUPIPayment(); 
    }
}

// Client Execution
console.log("========== Example 3: Factory Method (GoF Standard) ==========");
const upiApp = new UPIPaymentFactory();
upiApp.processPayment(5000);

const cardApp = new CreditCardPaymentFactory();
cardApp.processPayment(2000);



/**
 * ✅ WHY Example3 IS THE REAL FACTORY METHOD ?* 
 * 1. Client depends on ABSTRACTIONS
 *    - Client never uses `new ConcretePayment()`
 *
 * 2. Open–Closed Principle (OCP) is FOLLOWED
 *    - To add PayPal:
 *        -> Create PayPalPaymentMethod
 *        -> Create PayPalPaymentFactory
 *        -> NO existing code is modified
 *
 * 3. Object creation is delegated to SUBCLASSES
 *    - This is the CORE of Factory Method
 *
 * 4. No messy if/else or switch
 *
 *
 * 🚨 INTERVIEW INSIGHT:
 *   --> Factory Method is NOT about removing `new`
 *   --> It is about MOVING `new` to the RIGHT PLACE
 */


