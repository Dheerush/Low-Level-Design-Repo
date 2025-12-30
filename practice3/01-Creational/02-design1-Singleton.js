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
 *            1. Single Instance: Ensures only one object of the class exists in the JVM.
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


// ========================================= Example 1 =============================================





























/**
 *  - Different Ways to Implement Singleton Method Design Pattern
 *    1. Classic (Lazy Initialization)
 *    2. Thread-Safe (Synchronized)
 *    3. Eager Initialization (Static Block)
 *    4. Double-Checked Locking (Most Efficient)
 *    5. Static Inner Class (Best Java-Specific Way)
 *    6. Enum Singleton
 */














































