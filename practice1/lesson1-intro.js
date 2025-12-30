// ================= Topics: Constructors, Static, Instance ==========================
// Understanding Default Constructor
class Employee {
    constructor() {
        console.log("Employee object created");
    }
}

// creating object
const emp1 = new Employee();
const emp2 = new Employee();


// Understanding Parameterized Constructors
class User {
    constructor(name, age, gender) {
        this.name = name; // note: this refers to the current object. 
        this.age = age;
        this.gender = gender;
    }
}

const user1 = new User("Sheldon", 31, "Male");
const user2 = new User("Penny", 27, "Female");


/* NOTES:
 * 1. Constructor runs automatically when an object is created.
 *    - It has to have the exact name "constructor"
 *    - We never call it manually. 
 *    - Even if you don’t write a constructor while creating a class, JS automatically provides a default empty constructor.
 *
 * 2. Constructor ensures:
 *    - Object starts in an initial state
 *    - Required data can be provided at creation time. 
 *    - Using console.log inside constructor is OK for learning,but in real design, constructor should initialize state, not log.
 *
 * 3. JavaScript allows only ONE constructor per class definition.
 *    - There is no constructor overloading like C++
 *    - Parameterized constructor replaces the default one
 * 
 * 4. What happens if parameters are missing?
 *    - JavaScript does NOT enforce constructor parameters. 
 *    - JS does not throw errors. Missing values become undefined 
 * 
 */

// ================== Methods in Classes ==============================
class SuperHero {
    // parameterized constructor
    constructor(name, power, age) {
        this._name = name;     // internal property (by convention)
        this.power = power;
        this._age = age;       // internal property (by convention)

        /*
         NOTE:
         - Prefixing with "_" is a NAMING CONVENTION only.
         - It does NOT provide real privacy in JavaScript.
         - It simply signals to other developers:
           "This property is internal and should not be accessed directly."
        */
    }

    // ================= Instance Method (Behavior) =================
    introduce() {
        console.log(
            `Hi, I'm ${this._name}. I can ${this.power}. I am ${this._age} years old.`
        );
    }

    //  Getter 
    get age() {
        return this._age;
    }

    get name() {
        return this._name;
    }

    // Setter 
    set age(value) {
        if (value <= 0) {
            throw new Error("Invalid age");
        }
        this._age = value;
    }

    set name(value) {
        if (!value) {
            throw new Error("Name cannot be empty");
        }
        this._name = value;
    }
}

// ================= Usage =================
let hero1 = new SuperHero("Ironman", "fly", 30);
let hero2 = new SuperHero("Hulk", "smash", 27);

hero1.introduce();
hero2.introduce();


/* NOTES : Methods and Getter/Setter

1. A class typically has two kinds of members:
   - State access → getters & setters
   - Behavior → instance methods
   These are NOT interchangeable.

2. Getters and setters:
   - `get` and `set` are special keywords in JavaScript.
   - They define accessor properties, not regular functions.
   - A getter and setter with the same name represent ONE property.
   - They allow controlled access to internal state.
   - They are useful for validation, transformation, and encapsulation.

3. Internal properties:
   - JavaScript does NOT enforce privacy using `_`.
   - The underscore (`_property`) is only a convention.
   - It indicates that the property is meant for internal use.
   - True privacy is achieved using `#privateFields` or closures.

4. Design rules:
   - Getters should return values, not perform actions.
   - Setters should validate and update state, not contain business logic.
   - Instance methods represent behavior (actions / verbs).
   - Avoid accessing the same property name inside its own getter/setter
     to prevent infinite recursion.

5. Best Practice:
   - Use getters/setters for state management.
   - Use instance methods for behavior.
   - Keep constructors focused on initialization only.

 */




// =========================================== Static vs Instance ===========================================
// This concept is necessary specially when we deal with singleton design patterns later on.


/**
 * - Let's consider a class, it has a property called totalCount
 *   --> If we create an instance of this class (basically an object, obj1),
 *       that object can access that property. So far, so good.
 *
 *   --> Now, user creates another object of this class, obj2.
 *       This object will also have its own copy of totalCount (if totalCount is NOT static).
 *
 *   --> Since (obj1 !== obj2) due to reference difference:
 *       # Any change made by obj1 in totalCount will NOT be reflected in obj2
 *       # Because each object maintains its own independent state
 *
 *   --> That’s why we use `static`
 *       # A static property belongs to the CLASS itself
 *       # All objects share the SAME static property
 *       # Static properties do NOT belong to individual objects
 */


/**
 * IMPORTANT CLARIFICATION ABOUT STATIC:
 *
 * - `static` does NOT mean "private"
 * - `static` means:
 *      --> The property belongs to the class, not to objects
 *
 * - Access rules:
 *      --> Static property → accessed using ClassName.property
 *      --> Instance property → accessed using this.property
 *
 * - Objects CANNOT access static properties directly
 *      ❌ obj.totalCount
 *      ✅ Counter.totalCount
 */


// ================= WITHOUT static =================
class Counter {
    constructor() {
        this.totalCount = 0;   // instance property (each object has its own)
        this.totalCount++;
        this.id = this.totalCount;
    }
}

const c1 = new Counter();
console.log("id1:", c1.id); // 1

const c2 = new Counter();
console.log("id2:", c2.id); // 1

const c3 = new Counter();
console.log("id3:", c3.id); // 1



// ============================== using "static" ================================
class NewCounter {
    static newTotalCount = 0; // Shared among ALL objects of this class

    constructor() {
        NewCounter.newTotalCount++;  // Increment shared class-level counter

        // Assign unique id to each object using static counter
        this.id = NewCounter.newTotalCount;
    }
}


const counter1 = new NewCounter();
console.log("id1:", counter1.id); // 1 

const counter2 = new NewCounter();
console.log("id2:", counter2.id); // 2 

const counter3 = new NewCounter();
console.log("id3:", counter3.id); // 3 



/**
 *  - "static" is about class-level responsibility, not just sharing.
 *  - "static" is NOT limited to “sharedValue” or counters.
 *     --> We can use" :
 *        > variables, 
 *        > functions, 
 *        > objects, 
 *        > data structures, 
 *        > configs,  
 *        > registries, 
 *        > factories, 
 *        > APIs, 
 *        > caches,
 *        > constants. 
 * 
 *    --> So below is an example of a class with real-world app–level categories with syntax-only templates. *  
 */


// ========================== STATIC – COMPLETE JS SYNTAX REFERENCE ==========================

class AppSystem {

    // 1️⃣ Static constants / configuration (class-level)
    static API_URL = "";
    static TIMEOUT = 0;
    static ENV = "";

    // 2️⃣ Static shared state / counters / flags

    static requestCount = 0;
    static isInitialized = false;

    // 3️⃣ Static objects / maps / registries
    static routeMap = {};
    static permissionMap = {};
    static serviceRegistry = new Map();

    // 4️⃣ Static cache / storage
    static cacheStore = new Map();

    // 5️⃣ Static utility / helper methods
    static formatData(input) {
        // implementation later
    }

    static parseResponse(response) {
        // implementation later
    }

    // 6️⃣ Static validation / policy methods
    static validateInput(data) {
        // implementation later
    }

    static checkAccess(role) {
        // implementation later
    }

    // 7️⃣ Static factory methods (LLD / Design Patterns)
    static createService(type) {
        // implementation later
    }

    // 8️⃣ Static API / service wrapper
    static apiClient = null;

    static sendRequest(config) {
        // implementation later
    }

    // 9️⃣ Static singleton-style access
    static instance = null;

    static getInstance() {
        // implementation later
    }

    // 🔟 Static feature flags
    static featureFlags = {};


    // 1️⃣1️⃣ Static metadata / schema / versioning
    static schema = {};
    static version = "";


    // 1️⃣2️⃣ Instance-level properties (for contrast)
    constructor() {
        this.id = null;
        this.state = null;
    }

    // Instance methods (NOT static)

    updateState() {
        // implementation later
    }

    reset() {
        // implementation later
    }
}

