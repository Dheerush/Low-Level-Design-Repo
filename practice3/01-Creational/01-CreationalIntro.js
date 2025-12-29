// =========================================================================== Creational Design Patterns ================================================================================


/** Creational Design Patterns
 *  - Analogy:
 *    --> Without Creational Patterns: You (the client) have to go into the kitchen, find the ingredients, know the recipe, turn on the stove, and cook the burger yourself. If the recipe changes, you have to learn a new one.
 *    --> With Creational Patterns: You just tell the waiter, "I want a burger." You don't care how the chef makes it, what brand of stove they use, or how they source the meat. The creation is hidden from you. You just get the result.
 * 
 *  - Creational Design Patterns focus on the process of object creation or problems related to object creation.
 *    --> For example: Instead of you manually typing const car = new Car() everywhere in your code (which makes your code rigid), creational patterns provide a "middleman" or a specific structure to handle that creation for you.
 *        # To avoid "Hard Coding": If you use new ClassName() everywhere, your code becomes tightly coupled. If the class name changes or requires new parameters, you have to change it in 100 places.
 *        # Control: Sometimes you only want one instance of a class (Singleton).
 *        # Complexity: Some objects are very complex to build (Builder). Creational patterns hide that complexity.
 * 
 *    --> They help in making a system independent of how its objects are created, composed, and represented.
 *    --> This reduces direct dependencies on concrete classes and promotes dependency inversion.
 *    --> There are 2 main themes in these patterns:
         i)  They keep information about the specific classes used in the system hidden.
         ii) They hide the details of how instances of these classes are created and assembled.


 

 *   - Real-Life Use Cases
 *     --> Database Connections: You don't want to open a new connection to your database every time a user clicks a button. You use a Singleton to reuse one connection.
 *     --> Cross-Platform Apps: If you are building an app for both iOS and Android, you use a Factory to create "UI Buttons." The factory decides whether to create an "Android Button" or an "iOS Button" based on the OS.
 *     --> Game Development: When spawning 1,000 enemies, you might use a Prototype to clone an existing enemy instead of building each one from scratch, saving memory
 *     --> UI Themes: If the app is in "Dark Mode," the Abstract Factory ensures every button, scrollbar, and text box created is the "Dark" version.
 *     --> Network Requests or PC Assemblies: Building a complex object with 10+ optional parameters (like a customized HTTP Request with headers, body, auth, and timeout).
 * 
 * 
 * 
 *  - Categorization of Creational Patterns
 *    1. Singleton : Ensures only one instance exists.
 *    2. Factory Method: Provides an interface for creating objects but allows subclasses to alter the type.
 *    3. Abstract Factory: Creates "families" of related objects (e.g., a "Dark Mode" set of UI tools).
 *    4. Builder: Steps through a complex creation process (e.g., building a Custom Pizza).
 *    5. Prototype:	Creates new objects by cloning an existing one.
 *    
 * 
 * 
 *  - Without Pattern (Tight Coupling):  You are forced to know the exact class names
 *    const dev1 = new Developer("John");
 *    const dev2 = new Designer("Sarah");
 * 
 * 
 *   // With Factory Pattern (Loose Coupling + Abstraction):
 *      class EmployeeFactory {
            static createEmployee(type, name) {
                if (type === 'developer') return new Developer(name);
                if (type === 'designer') return new Designer(name);
            }
        }

     // You only interact with the Factory
        const emp1 = EmployeeFactory.createEmployee('developer', 'John');
        onst emp2 = EmployeeFactory.createEmployee('designer', 'Sarah');
 * 
 * 
 * 
 * 
 *  * - When NOT ❌ to use Creational Patterns:
     --> For very simple objects with no future variation 
     --> When object creation is trivial and unlikely to change
     --> Overuse can lead to unnecessary abstraction
 
 * 
 *  ==> In short: Creational patterns separate the "what to create" from the "how to create".

 
  */



