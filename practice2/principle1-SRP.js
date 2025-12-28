// ========= Principle 1: SRP: Single Responsibility Principle ===================

/** Single Responsibility Principle (SRP):
- A class should have one and only one reason to change.
- SRP does NOT mean "only one method".
- It means "one responsibility / concern".

Benefits:
✔ Easier maintenance
✔ Better readability
✔ Lower risk of bugs
✔ Improved testability

LLD Insight:
- Business logic
- Calculation logic
- Communication logic
- Should NEVER live in the same class.

 */

// ❌ WRONG: Violates SRP
class OrderService {
    createOrder() {
        console.log("Order Created");
    }

    calculateDiscount() {
        console.log("Calculate Discount");
    }

    sendInvoiceEmail() {
        console.log("Send Invoice Email");
    }
}

/**
 * WHY THIS IS WRONG:
 * - createOrder()        → business logic (order creation)
 * - calculateDiscount()  → pricing / discount logic
 * - sendInvoiceEmail()   → communication / notification logic
 *
 * This class has MULTIPLE reasons to change:
 * 1. Order creation rules change
 * 2. Discount rules change
 * 3. Email format or provider changes
 *
 * ❌ Violates Single Responsibility Principle
 */

// Solution : Now we split responsibilities, not logic randomly.

// 1. Responsible ONLY for order-related operations
class OrderService {
    createOrder() {
        console.log("Order Created");
    }
}
// 2. Responsible ONLY for discount calculation
class DiscountService {
    calculateDiscount() {
        console.log("Discount Calculated");
    }
}

// 3. Responsible ONLY for sending emails
class EmailService {
    sendInvoiceEmail() {
        console.log("Invoice Email Sent");
    }
}

// Instead of dumping everything into one class, we coordinate --> we create an Orchestrator (Very Important LLD Concept)
// 
class OrderProcessor {
    constructor() {
        this.orderService = new OrderService();
        this.discountService = new DiscountService();
        this.emailService = new EmailService();
    }

    processOrder() {
        this.orderService.createOrder();
        this.discountService.calculateDiscount();
        this.emailService.sendInvoiceEmail();
    }
}


const orderProcessor = new OrderProcessor();
orderProcessor.processOrder();



