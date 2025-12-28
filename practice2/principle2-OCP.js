// ========================== Principle 2: OCP: ===========================

/**
 * Open–Closed Principle (OCP):
 * Software entities should be:
 *  - Open for extension
 *  - Closed for modification
 *
 * We achieve this using:
 *  - Abstraction
 *  - Polymorphism
 */

// ======================= Example 1: ❌ OCP VIOLATION =======================
class Employee {
    constructor(type, salary) {
        this.type = type;
        this.salary = salary;
    }

    calculateBonus() {
        if (this.type === "Developer") {
            return this.salary * 0.2;
        }

        if (this.type === "Manager") {
            return this.salary * 0.3;
        }

        if (this.type === "Tester") {
            return this.salary * 0.15;
        }

        // NEW EMPLOYEE TYPE?
        // → MODIFY THIS METHOD ❌
    }
}

const emp1 = new Employee("Developer", 50000);
const emp2 = new Employee("Manager", 80000);

console.log(emp1.calculateBonus()); // 10000
console.log(emp2.calculateBonus()); // 24000

/** Why the above example violates OCP ?
 *  1. Adding a new role = modifying calculateBonus()
 *  2. High risk of bugs
 *  3. Breaks existing logic
 *  4. Tight coupling
 */


// ======================= Example 2: ✔️ OCP Adherence  =======================
// In this example: We separate the changing behavior (bonus calculation) from the Employee(basically New Employee) class
// Abstract base
class BonusCalculator {
    calculate(salary) {
        throw new Error("Must implement calculate()");
    }
}

// Concrete strategies
class DeveloperBonus extends BonusCalculator {
    calculate(salary) {
        return salary * 0.2;
    }
}

class ManagerBonus extends BonusCalculator {
    calculate(salary) {
        return salary * 0.3;
    }
}

class TesterBonus extends BonusCalculator {
    calculate(salary) {
        return salary * 0.15;
    }
}

class HRBonus extends BonusCalculator {
    calculate(salary) {
        return salary * 0.18;
    }
}

class NewEmployee {
    constructor(salary, bonusCalculator) {
        this.salary = salary;
        this.bonusCalculator = bonusCalculator;
    }

    calculateBonus() {
        return this.bonusCalculator.calculate(this.salary);
    }
}

const emp = new NewEmployee(50000, new HRBonus());
console.log(emp.calculateBonus()); // 9000



// ======================= Example3: ✔️ OCP Compliant =======================
// Abstract Base Class
class PaymentProcessor {
    constructor() {
        // Prevent direct instantiation (abstract class simulation)
        if (new.target === PaymentProcessor) {
            throw new Error("PaymentProcessor is abstract and cannot be instantiated");
        }
    }

    // Abstract method (contract)
    processPayment(amount) {
        throw new Error("processPayment() must be implemented by child classes");
    }
}


// Credit Card Payment
class CreditCardPaymentProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing Credit Card payment of Rs. ${amount}`);
    }
}

/**
 * Now let's say we want to add PayPal support, we have 2 options
 * - Option 1: Modify the existing PaymentProcessor class --> ❌ VIOLATES the OCP
 * - Option 2: create a new class called PayPalPaymentProcessor that inherits from the parent (PaymentProcessor class)  
 * */


// So we will go with Option 2: Creating a new class --: Adhering to OCP
// UPI Payment
class UPIPaymentProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing UPI payment of Rs. ${amount}`);
    }
}


/**
 * OCP does NOT mean that we must always create a new class for every new feature.
 * It means we should avoid modifying existing, stable logic when adding new behavior.
 */

