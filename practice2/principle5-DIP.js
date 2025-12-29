// ============================== Principle 5: Dependency Inversion Principle ===========================


/** Dependency Inversion Principle
 * - Principle: High-level modules should not depend on low-level modules, and both should depend on abstractions.
 * 
 * - In professional JavaScript/TypeScript development (like NestJS or Angular), this pattern is so common that they use Dependency Injection Containers to automatically pass these services into the constructors for you.
 * 
 * - Analogy: 
 *   # Think of a wall power outlet. The outlet doesn't care if you plug in a Lamp, a Laptop, or a Toaster. 
 *   # As long as the device has the right Plug (The Abstraction), it works. The outlet is the high-level module; the toaster is the low-level detail.
 * 
 * - What is inversion in DIY. What does it imply ?
 *    # Traditionally, the low-level tool (like a Database or API) dictates how the code is written. In DIP, we invert this. 
 *    # The High-Level logic defines the interface it needs. Now, the Low-Level tools must 'adapt' to the High-Level's needs. The High-Level now owns the relationship. 
 *    # By inverting the dependency, we protect the core. The core logic depends on a stable interface, so it never has to change when the 'details' change.
 */



// ================================ Example1: ❌ DIP Violated ==============================
// Low-level module (The Detail)
class StripePaymentProcessor {
    pay(amount) {
        console.log(`Paying Rs.${amount} via Stripe`);
    }
}

// High-level module (The Logic)
class Store {
    constructor() {
        this.paymentProcessor = new StripePaymentProcessor();
    }
    purchaseItem(price) {
        if (price <= 0) throw new Error("Invalid Amount");
        this.paymentProcessor.pay(price);
    }
}
// exection
const store1 = new Store();
store1.purchaseItem(100);


/** DIP Violated in the above example 
 *  1. Store is directly tied to Stripe. 
 *  2. If we want to switch to PayPal, Apple Pay, or if Stripe API changes, then we have to rewrite the Store class.
 * 
 * 
 *  FIX: 
 *  1. Instead of the Store creating its own tools, we inject the tool into the Store. 
 *  2. We ensure both the Store and the Processors follow the same "interface" (the abstraction).
 *  3. In the fix, the User (the one calling the code) decides what the Store uses. This is often called Inversion of Control (IoC).
 *  4. 
*/


// ✔️ fixing example 1 ---> DIP compliant
class NewStripePaymentProcessor {
    pay(amount) { console.log(`Stripe: Charged $${amount}`); }
}
class NewRazorpayPaymentProcessor {
    pay(amount) { console.log(`Razorpay: Charged $${amount}`); }
}
class NewApplePaymentProcessor {
    pay(amount) { console.log(`Apple pay: Charged $${amount}`); }
}
class NewStore {
    constructor(paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }

    purchaseItem(price) {
        this.paymentProcessor.pay(price);
    }
}

const newStripeTool = new NewStripePaymentProcessor();
const newRazorpayTool = new NewRazorpayPaymentProcessor();
const newApplePayTool = new NewApplePaymentProcessor();

const storeA = new NewStore(newStripeTool);
storeA.purchaseItem(100);

const storeB = new NewStore(newRazorpayTool);
storeB.purchaseItem(100);

const storeC = new NewStore(newApplePayTool);
storeC.purchaseItem(100);



// ================================ Example2: ❌ DIP Violated ==============================
// Scenario: Imagine we are building an app that sends alerts to users. Initially, your boss says, "Just send an Email." 

// low-level module
class EmailService {
    sendNotification(message) {
        console.log(`Sending Email: , ${message}`)
    }
}

// high level module
class AlertSystem {
    constructor(){
        this.service= new EmailService();
    }
    notify(message){
        this.service.sendNotification(message);
    }
}
// execution 
const alerts = new AlertSystem(); 
alerts.notify("Server is reaching 90% capacity: DIP violated example !");

/**
 * Why this is a dead end:
 * If the boss now says "Send an SMS for critical failures", 
 * we cannot do: new AlertSystem(new SMSService()) 
 * because the constructor is hard-coded to 'new EmailService()'.
 * We are stuck.
 */


//  FIXING Example 2
// --- Low-Level Modules (The Details) ---
class NewEmailService {
    sendNotification(message) {
        console.log(`[Email] Sending: ${message}`);
    }
}

class NewSMSService {
    sendNotification(message) {
        console.log(`[SMS] Sending: ${message}`);
    }
}

class NewWhatsAppService {
    sendNotification(message) {
        console.log(`[WhatsApp] Sending: ${message}`);
    }
}

// --- High-Level Module (The Logic) ---
class NewAlertSystem {
    // ✅ DIP FOLLOWED: We inject the dependency.
    // We depend on the 'abstraction' (the method name), not the specific class.
    constructor(notificationService) {
        this.notificationService = notificationService;
    }

    notify(message) {
        this.notificationService.sendNotification(message);
    }
}

// --- Execution (Wiring/Inversion of Control) ---
const emailAlerts = new NewAlertSystem(new NewEmailService());
emailAlerts.notify("Server is reaching 90% capacity!");


const urgentAlerts = new NewAlertSystem(new NewSMSService());
urgentAlerts.notify("Critical failure detected!");