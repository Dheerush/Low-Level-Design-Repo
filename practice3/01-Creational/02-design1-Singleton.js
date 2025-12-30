// ============================================ Singleton Pattern ===========================================


/** Introduction to Singleton Pattern
 * Singleton = Only ONE instance (object) of a class for the entire application.
 *  - Analogy: 
 *    --> Electricity Meter in a house, there should be only 1, if everyone installs their own meter → chaos. That’s exactly what Singleton enforces in code.
 * 
 *  - ❌ Without Singleton
 *        --> let connection1 = new dbConnection()
 *        --> let connection2 = new dbConnection()
 *        console.lof(connection1===connection2) ; // false; as both are different due to reference
 * 
 *    --> Sometimes, having more than one object is dangerous or wasteful. 
 *        Examples: 
 *         1. Logging Systems : Maintain a consistent logging mechanism across an application.
 *         2. Configuration Managers : Centralize access to configuration settings.
 *         3. Database Connections : Manage a single point of database access.
 *         4. Thread Pools : Efficiently manage a pool of threads for concurrent tasks.
 *         5. Cache Managers, Print Spoolers (Single Printer Queue) and Runtime Environments ( java.lang.Runtime is a singleton)
 * 
 *    - ✔️ With Singleton 
 *         --> No matter how many times we try to create it,
 *            1. Single Instance: Ensures only one object of the class exists in the application runtime
 *            2. Global Access Point: Provides a centralized way to access the instance.
 *            3. Lazy or Eager Initialization: An Instance can be created at class load time (eager) or when first needed (lazy).
 *            4. Thread Safety: Can be designed to work correctly in multithreaded environments.
 *            5. Resource Management: Useful for managing shared resources like configurations, logging or database connections.
 *            6. Flexibility in Implementation: Can be implemented using eager initialization, lazy initialization, double-checked locking or an inner static class.
 * 
 * 
 *  - ❌ When NOT to use Singleton?
 *        --> Regular business objects
 *        --> User entities
 *        --> Data models that should be independent
 * 
 * 
 *  - Q. Why not just use global variables?
 *        --> No control over creation
 *        --> Hard to test
 *        --> No encapsulation
 *      Singleton gives controlled global access
 * 
 */


// ========================================= Example 1: ❌ NOT a Singleton (VIOLATES the rule) =============================================
class DBConnection {
    constructor() {
        console.log("New DB connection created");
    }
}

const conn1 = new DBConnection();
const conn2 = new DBConnection();

console.log(conn1 === conn2); // false 
console.log("")

// every time we crate a new object we need to create a new connection as well;
// What's wrong with it--> Anyone can create unlimited objects and then we have 'n; number of connections.




// =================================== Example 2: ⚠️ JS-specific Singleton (WORKS, but NOT ideal)  ========================================
class NewDBConnection {
    constructor() {
        // check if the instance alredy exists
        if (NewDBConnection.instance) {
            return NewDBConnection.instance;
        }

        this.connection = "Connected to DB" + Math.random();
        NewDBConnection.instance = this;
    }

    query(sql) {
        console.log(`Executing: ${sql}`);
        console.log(`Executing: ${sql}`);
    }
}

let newConn1 = new NewDBConnection();
let newConn2 = new NewDBConnection();
console.log("Are new connections same: ", newConn1 === newConn2 ? "Yes, they are the same" : "No, they are different"); // they are same
console.log("")

/**
 * Why does this Singleton work without using `static`?
 *
 * - In JavaScript, classes are functions, and functions are objects.
 * - We can attach properties directly to the class (e.g., NewDBConnection.instance).
 * - This effectively creates a class-level shared property, similar to `static`.
 *
 * Why does returning from constructor work?
 * - In JavaScript, if a constructor returns an object explicitly,
 *   that object becomes the result of the `new` expression.
 *
 * Is this a good practice?
 * ❌ Not recommended for production systems.
 *
 * Reasons:
 * - Constructor has hidden control flow.
 * - `new` keyword becomes misleading.
 * - Harder to test and maintain.



 * Preferred approach (which we will do in example 3): 
 * 1. The "Explicit" Intent (Readability)
 *    --> Allows the use of private fields (#instance) so outside code can't reset your Singleton
 *    --> Standardization: It follows the classic "Gang of Four" structure where the instance is a static member of the class.
 * 2. Modern Private Fields (#)
 *    --> If the property is "Public." Anyone can break your Singleton from outside. To fix this, we use Static Private Fields.
 *        Again reminder, static does not make the property private.
 *    --> 
 */




// ================================= Example 3: ✅ PROPER Singleton (BEST PRACTICE)  ======================================
class ProperDBConnection {
    static #instance;

    constructor() {
        if (ProperDBConnection.#instance) {
            // Option 1: Silent return (Developer friendly)? is it a good practice
            // return ProperDBConnection.#instance; 

            // Option 2: Throw Error (Strict LLD - Recommended to enforce getInstance)
            throw new Error("Cannot instantiate Singleton. Use getInstance()");
        }
        this.connection = "Connected to DB";
        ProperDBConnection.#instance = this;
    }

    static getInstance() {
        if (!ProperDBConnection.#instance) {
            // We bypass the 'if' check inside the constructor by 
            // being the FIRST one to call it.
            ProperDBConnection.#instance = new ProperDBConnection();
        }
        return ProperDBConnection.#instance;
    }
}

const properDbConnect1 = ProperDBConnection.getInstance();
const properDbConnect2 = ProperDBConnection.getInstance();

console.log("Are proper connections same: ", properDbConnect1 === properDbConnect2 ? "Yes, both the same" : "No, they are different"); // they are same
//properDbConnect1.#instance = null; // This will now throw an error because #instance is private

console.log("")

// ======================================= Example 4 =========================================
/**
 * Real-World Example: Configuration Manager (Singleton)
 * Goal: Ensure every module in the app reads from the SAME settings object.
 */
class ConfigManager {
    // Static Private Instance

    static #instance; // static means Attached to the CLASS, not the OBJECT. This persists in memory
    #settings;

    constructor() {
        // Prevent direct instantiation: If an instance already exists in the Static memory, throw an error.
        if (ConfigManager.#instance) {
            throw new Error("Use ConfigManager.getInstance() instead of new");
        }
        // Initialization: This block runs ONLY ONCE in the entire app's life.
        this.#settings = {
            dbUrl: "mongodb://localhost:27017",
            apiKey: "SECRET_123",
            version: "1.0.0"
        };


        // Store this first-ever created object into the Static pointer.
        ConfigManager.#instance = this;


    }

    static getInstance() {
        // Lazy Initialization: If the static instance is empty, create it NOW. Otherwise, just return the one we already have.
        if (!ConfigManager.#instance) {
            ConfigManager.#instance = new ConfigManager();
        }
        return ConfigManager.#instance;
    }
    // Business Logic Methods
    get(key) {
        return this.#settings[key];
    }

    set(key, value) {
        this.#settings[key] = value;
    }
}

// ============================== USAGE ==============================

const configA = ConfigManager.getInstance();
configA.set("version", "1.1.0");

const configB = ConfigManager.getInstance();
console.log(configB.get("version"));      // "1.1.0"
console.log(configA === configB);          // true




/** NOTE: 
 *  1. The Instance: Represents the "Single Source of Truth." Its goal is to hold the unique memory address of the first object created so it can be shared across the entire app.
 *     - Imagine 3 different parts of our code (User A, User B, and User C) all trying to get the configuration.
 *       --> User A calls getInstance()  ==>  "Is the box empty? Yes. Create object, put it in the box, and give it to A. [In technical terms, we are giving User C a Reference (a memory pointer) to the existing object] .
 *       --> "User B calls getInstance() ==>  "Is the box empty? No. Give User B the exact same object that is already in the box.
 *       --> "User C calls getInstance() ==>  "Is the box empty? No. Give User C the exact same object."
 *  
    2. Static + Instance: By combining 'static' with the instance variable, we ensure this specific object lives on the Class itself. This guarantees that no matter how many  objects we try to create, they all point to this same static memory location.
*/





/**
 *  ====================================== Different Ways to Implement Singleton Method Design Pattern ====================================
 *  STRATEGY: 
 *  --> In JavaScript, we focus on Lazy vs. Eager initialization.
 *  --> In LLD Theory (Java/C++), we focus on Thread-Safety and Concurrency.
 * 
 * 
 *  1. Classic Lazy Initialization (The Standard Way)
 *     --> Creation: Object is created only when requested (via getInstance).
 *     --> JS Context: This is our standard implementation using '#instance'.
 *     --> Pros: Saves memory if the instance is never used.
 * 
 * 
 *  2. Eager Initialization (The "Always Ready" Way)
 *     --> Creation: Object is created immediately when the class/script loads.
 *     --> JS Context: static #instance = new Singleton();
 *     --> Pros: No overhead during runtime calls; simplest thread-safety.
 * 
 * 
 *  3. Thread-Safe / Synchronized (Multi-Threaded Theory)
 *     --> Problem: In languages like Java, two threads might enter 'if(!instance)' simultaneously.
 *     --> Solution: Uses a 'synchronized' lock to force threads to wait their turn.
 *     --> JS Context: Not applicable due to JS's Single-Threaded Event Loop.
 * 
 * 
 *  4. Double-Checked Locking (Optimized Theory)
 *     --> Problem: Synchronizing the whole method is slow.
 *     --> Solution: Check if null -> Lock -> Check again. This ensures thread-safety with high performance.
 *     --> Note: Essential to know for LLD interviews to prove you understand "Race Conditions.
 * 
 * 
 *  5. Static Inner Class (The "Bill Pugh" Singleton)
 *     --> Context: Java-specific. Uses the JVM's class-loading mechanism to create the instance. 
 *     --> Pros: Thread-safe without requiring locks/synchronization.
 * 
 * 
 *  6. Enum Singleton
 *     --> Context: Often cited as the "Best Way" in Java.
 *     --> Pros: Prevents reflection attacks and serialization issues out of the box.
 * 
 * 
 *  ⚠️ INTERVIEW TIP:
 *      --> Many interviewers use Singleton to test if you understand Concurrency.
 *      --> If asked about Concurrency in JS:
 *          # Mention that while JS is single-threaded, "Race Conditions" can still happen with
 *          # ASYNC operations (e.g., two parallel 'await' calls both trying to initialize a DB connection).
 *          # In such cases, we still need logic to ensure only one connection is opened.
 * 
 */

