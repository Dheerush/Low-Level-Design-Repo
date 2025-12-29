//================== Principle 4: Interface Segregation Principle (ISP) ======================

/** Interface Segregation Principle (ISP)
 *  - "Do not force any client to implement an interface which is irrelevant to them".
 *  - Larger interfaces should be split into smaller ones. By doing so, we can ensure that implementing classes only need to be concerned about the methods that are of interest to them.
 * 
 *  -  Goal: To focus on avoiding fat interface and give preference to many small client-specific interfaces
 * 
 *  -  Analogy:
 *     # Suppose if you enter a restaurant and you are pure vegetarian. The waiter in that restaurant gave you the menu card which includes vegetarian items, non-vegetarian items, drinks, and sweets. 
 *     # In this case, as a customer, you should have a menu card which includes only vegetarian items, not everything which you don't eat in your food. Here the menu should be different for different types of customers. 
 *     # The common or general menu card for everyone can be divided into multiple cards instead of just one. Using this principle helps in reducing the side effects and frequency of required changes.
 *
 *  - ISP is NOT the same as SRP:
 *    # SRP focuses on "one reason to change"
 *    # ISP focuses on "not forcing unnecessary behavior on clients"
 */


// ================================== Example1: ❌ Violating ISP ================================================
// Base Class
class SmartDevice {
    print() { console.log("Printing document..."); }

    fax() { console.log("Faxing document..."); }

    scan() { console.log("Scanning document..."); }
}

// Child class
class MultiFunctionPrinter extends SmartDevice { }

class OldSchoolPrinter extends MultiFunctionPrinter {
    fax() { throw new Error("OldSchoolPrinter cannot fax!"); }
    scan() { console.log("OldSchoolPrinter cannot scan!"); }
};

// executing the class
const basicPrinter = new OldSchoolPrinter();
basicPrinter.print(); // Works
basicPrinter.fax();   // 💥 Crashes the app unexpectedly!
basicPrinter.scan();   // 💥 Crashes the app unexpectedly!


/** NOTE: 
 * - Problem: OldSchoolPrinter is forced to inherit fax and scan. It shouldn't even HAVE these methods available to be called.
 * - THE FIX: 
 *   --> Since JavaScript doesn't have interface as a keyword (like TypeScript or Java), we follow ISP by using Composition or Mixins
 *       i.e We break the "Fat" SmartDevice into small, functional pieces.
 */


// 1. Define small, specific behaviors (The "Small Menus")
const canPrint = {
    print() { console.log("Printing document..."); }
};

const canFax = {
    fax() { console.log("Faxing document..."); }
};

const canScan = {
    scan() { console.log("Scanning document..."); }
};

// 2. Build classes by only taking what is needed
// to avoid conflict, OldSchoolPrinter -> BasicSchoolPrinter, MultiFunctionPrinter -> ModernMultiFunctionPrinter 
class BasicSchoolPrinter {
    constructor() {
        // Only take the print behavior
        Object.assign(this, canPrint);
    }
}

class ModernMultiFunctionPrinter {
    constructor() {
        // Take everything
        Object.assign(this, canPrint, canFax, canScan);
    }
}

// 3. Execution
const printer1 = new BasicSchoolPrinter();
printer1.print();
console.log("Does printer1 have fax?", !!printer1.fax); // false - Clean!

const printer2 = new ModernMultiFunctionPrinter();
printer2.print();
printer2.fax();
printer2.scan();


//================================  Example 2 =======================================
class Phone {
    makeCall() { console.log("Making a call..."); }
    clickPicture() { console.log("Clicking a picture..."); }
    playGame() { console.log("Playing Game..."); }
    watchMovie() { console.log("Watching a movie..."); }
}

class LandlinePhone extends Phone {
    // ❌ VIOLATION: Landline is forced to implement things it doesn't do.
    clickPicture() { throw new Error("Landline cannot click picture"); }
    playGame() { throw new Error("Landline cannot play games"); }
    watchMovie() { throw new Error("Landline cannot watch movies"); }
}

// PROBLEM: We have made Phone a fat interface, It assumes every "Phone" is a modern "Smart Phone." ---> ❌ ISP violated
// The Fix: Interface Segregation (using Composition): To follow ISP, we should split the "Fat" interface into smaller, specific feature sets. In JavaScript, we use composition (assigning behaviors) to give each class only what it needs.

// 1. Define small, specific Feature Sets (Interfaces)
const canMakeCall = {
    makeCall() { console.log("Connecting voice call..."); }
};

const canTakePhotos = {
    clickPicture() { console.log("Capturing photo..."); }
};

const canPlayMedia = {
    playGame() { console.log("Loading game..."); },
    watchMovie() { console.log("Streaming movie..."); }
};

// 2. The Landline: Only needs the calling feature
class Landline {
    constructor() {
        Object.assign(this, canMakeCall);
    }
}

// 3. The Smartphone: Needs everything
class SmartPhone {
    constructor() {
        Object.assign(this, canMakeCall, canTakePhotos, canPlayMedia);
    }
}

// ================= TEST =================
const myHomePhone = new Landline();
const myIPhone = new SmartPhone();

myHomePhone.makeCall(); // ✅ Works
// myHomePhone.clickPicture(); // ❌ Undefined! (This is good! No hidden errors)

myIPhone.makeCall();     // ✅ Works
myIPhone.clickPicture(); // ✅ Works

