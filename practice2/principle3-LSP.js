// ============================= Principle 3: LSP ===============================

/** Liskov's Substitution Principle
 * - If a class promises certain behavior, then every child class must honor that promise.
 *   Child classes should be substitutable for their parent without breaking the correctness of the program. Substitution means: an object of a child class should be usable
 * - If a function works correctly with a parent class, it must also work correctly with any of its child classes — without changing the expected behavior. If it cannot, inheritance should NOT be used.
 * - LSP is NOT saying:
 *   --> You can use child classes anywhere blindly.
 *   --> As long as code runs, it’s fine  
 */


// ========== Example 1: Example 1: ❌ LSP VIOLATION =====================================
// Base Class
class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    // Setter
    setLength(value) {
        this.length = value
    }
    setWidth(value) {
        this.width = value
    }

    // Getter
    get area() {
        return this.length * this.width;
    }
}


class Square extends Rectangle {
    // For a square, length===width, So when someone sets length (setLength) as 5, both length and width will be changed. Same thing goes for set width
    setLength(value) {
        this.length = value;;
        this.width = value; // Side effect: changes width too
    }
    setWidth(value) {
        this.length = value;;
        this.width = value; // Side effect: changes length too
    }
}
// This function doesn't know about Squares; it only knows how Rectangles should behave.
function resizeRectangle(rect) {
    // A developer looking at the Rectangle class assumes that setting width DOES NOT change length.
    rect.setLength(5);
    rect.setWidth(10);

    console.log(`--- Testing ${rect.constructor.name} ---`);
    console.log(`Dimensions: ${rect.length} x ${rect.width}`);
    console.log(`Calculated Area: ${rect.area}`);

    // LOGICAL EXPECTATION:
    // If length is 5 and width is 10, area MUST be 50.
    if (rect.area === 50) {
        console.log("✅ Success: The object behaves like a Rectangle.");
    } else {
        console.error("❌ LSP VIOLATION: The object failed the substitution test!");
        console.log("Reason: Setting the width unexpectedly changed the length.");
    }
    console.log("\n");
}

// Test 1: Using the parent class
const genericRect = new Rectangle(2, 3);
resizeRectangle(genericRect);

// Test 2: Using the child class
// This is where substitution happens. 
// We are passing a Square where a Rectangle was expected.
const problematicSquare = new Square(2, 2);
resizeRectangle(problematicSquare);




//================================= FIX: fixing the example 1==========================


/** PROBLEM : 
 * - In the Reactangle class, we can see that "length" and "width" are independent entities, changing one does not affect other. So this was a behaviour that was promised. But in the Square Class, "length" and "width" are affected if any of them gets changed.
 * - The problem is not that Square’s code is wrong, but it is that "Square cannot honor Rectangle’s promises." 
 * - Mathematically: Square is a Rectangle, but Behaviorally: Square is NOT a Rectangle. And in software design, inheritance is about behavior.
 * So when Square pretends to be a Rectangle (via inheritance), it lies.
 * - The function "resizeRectangle" was meant for Rectangle and guarantees Rectangle but 
 * - LSP is violated when a child class has to “cheat” to remain valid.
 *  */

// Base Class
class Shape {
    get area() {
        throw new Error("Method 'get area()' must be implemented.");
    }
}

// Rectangle class already defined above, so using the name"Rect" for Rectangle
class Rect extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }

    setLength(value) { this.length = value; }
    setWidth(value) { this.width = value; }

    get area() {
        return this.length * this.width;
    }
}

class Sqr extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }

    setSide(value) {
        this.side = value;
    }

    get area() {
        return this.side * this.side;
    }
}


function printArea(shape) {
    console.log(`--- Testing ${shape.constructor.name} ---`);
    console.log(`Calculated Area: ${shape.area}`);
    console.log("✅ Success: This function works for any Shape without assumptions.\n");
}

const myRect1 = new Rect(5, 10);
const mySquare1 = new Sqr(5);

printArea(myRect1);   // Works perfectly
printArea(mySquare1); // Works perfectly

