// CASE 1: Pulic Class --> default
class User {
    // paramertized constructor
    constructor(name, age, weight) {
        this._name = name;
        this._age = age;
        this._weight = weight;
    }

    introduce() {
        console.log(`Hi, the user name is ${this._name}, whose age is ${this._age} and weighs around ${this._weight} kgs`)
    }

    activity() {
        console.log("Sleeping...")
    }
}

const user1 = new User("Dheeru", 29, 80);;
user1.introduce();

// CASE 2: Private Class
class Employee {
    // private fields
    #id;
    #salary;

    constructor(id, name, salary, experience) {
        this.#id = id;
        this.name = name;
        this.#salary = salary; // If a class member is declared as #private, you MUST use # every time you access it — even inside the same class. Not just during declaration, but every read and write.
        this.experience = experience;
    }

    // Public Method
    fetchDetails() {
        console.log(`${this.name} has ${this.experience} years of experience`)
    };


    // Getter for private field
    get salary() {
        return this.#salary; //Private property can be Accessible ONLY inside the class but we must use # to access that. 
    }

    set salary(value) {
        if (value < 0) throw new Error("Salary must be positive");
        this.#salary = value;
    }
}

let emp1= new Employee(101, "dheeru", 1000, 4);
console.log("name is: ", emp1.name); // name is public it should be accessible
console.log("salary is: ", emp1.#salary); // NOT ACCESSIBLE --> will give syntax error: SyntaxError: Private field '#salary' must be declared in an enclosing class 
console.log("salary is: ", emp1.salary); // here we are getting salary via the getter not directly accessing the salary property




/* ================= ACCESS MODIFIERS =================

1. JavaScript is not classical OOP like Java/C++:
   - It does not have explicit keywords like public/protected/private.
   - All class members are public by default.
   - Privacy is achieved using language features, not keywords.

2. Public members:
   - Accessible from anywhere.
   - Default behavior in JavaScript classes.
   - Includes public fields and methods.

3. Private members:
   - Declared using `#` prefix.
   - Accessible ONLY inside the class.
   - Enforced by the JavaScript engine.
   - Cannot be accessed or modified externally.

4. Protected members:
   - JavaScript does NOT support protected access.
   - Usually simulated using `_property` convention.
   - Not enforced, only for developer communication.

===================================================== */


