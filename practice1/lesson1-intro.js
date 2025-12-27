// ================= Constructors =================
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
 *    - We never call it manually. 
 *    - Even if you don’t write a constructor while creating a class, JS automatically provides a default empty constructor.
 *
 * 2. Constructor ensures:
 *    - Object starts in an initial state
 *    - Required data can be provided at creation time. 
 *    - Using console.log inside constructor is OK for learning,but in real design, constructor should initialize state, not log.
 *
 * 3. JavaScript allows only ONE constructor per class.
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










