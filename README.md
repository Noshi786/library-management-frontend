# Library Management System - React Frontend

A single-page React application built on top of an Object-Oriented JavaScript domain model. The application lets users browse library items, select members, borrow and return items, calculate dynamic late fees, and add new catalog items using polymorphic domain structures.

---

## 1. Project Overview
This application serves as a browser UI for managing a library system without external backend databases or HTTP APIs. The `Library` instance resides in the browser's memory. It demonstrates:
- **React Fundamentals:** State lifting, props flow, controlled inputs, conditional rendering, and dynamic list mapping.
- **OOP Architecture:** Polymorphism, abstract class guards, encapsulation, and the Open/Closed Principle.

---

## 2. Setup and Running

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm

### Installation & Execution
```bash
# Clone the repository
git clone [https://github.com/](https://github.com/)<your-username>/library-management-frontend.git
cd library-management-frontend

# Install dependencies
npm install

# Run the domain verification script (Node.js test)
node scripts/domain-check.js

# Start the Vite development server
npm run dev

3. Project Structure
library-management-frontend/
├── node_modules/              # Project dependencies
├── public/                    # Public static assets
├── scripts/
│   └── domain-check.js        # Standalone Node.js script testing OOP domain logic
├── src/
│   ├── assets/                # Static media assets (images, icons, etc.)
│   ├── components/            # Reusable UI React components
│   │   ├── AddItemForm.jsx    # Form component to add new items dynamically
│   │   ├── FilterControls.jsx # Controls for filtering library items
│   │   ├── ItemCard.jsx       # Card view displaying individual item details
│   │   └── StatsHeader.jsx    # Header component displaying library statistics
│   ├── data/                  # Data registry and initial seed data
│   ├── models/                # Domain class hierarchy (Pure JS / OOP)
│   ├── utils/                 # Utility helper functions
│   ├── App.css                # Component-level layout styles for App
│   ├── App.jsx                # Root container component holding global state & handlers
│   ├── index.css              # Global styles
│   └── main.jsx               # React entry point mounting <App/> to the DOM
├── .gitignore                 # Git ignore file for tracking exclusions
├── design.txt                 # Initial design and requirements documentation
├── eslint.config.js           # ESLint linting configuration
├── index.html                 # Entry HTML file mounting the React app root
├── package-lock.json          # Exact dependency lockfile
├── package.json               # ES Module configuration and scripts
└── README.md                  # Project documentation and guide

4. Components Table
ComponentPropsLocal StateDescriptionAppNoneitems, members, selectedMemberId, noticeRoot component managing shared domain state.AddItemFormonAddItemForm input fieldsForm for dynamically creating new items based on registered types.FilterControlsfilter, onFilterChangeNoneFilter buttons (all, available, borrowed) to filter catalog list.ItemCarditem, canBorrow, onBorrowshowDetailsDisplays item attributes, availability, and expandable polymorphic details.StatsHeadertotalItems, availableItems, borrowedItemsNoneDisplays real-time summary statistics for the library catalog.

5. State vs Props
State Ownership (Rules R4 & R5): State is kept as local as possible. Shared state (e.g., active catalog items, registered members, and active selectedMemberId) lives inside App.jsx.

Lifting State Up: ItemCard or AddItemForm cannot process transactions independently. Actions are dispatched up to App.jsx handlers via callback props (onBorrow, onAddItem).

Immutability: State updates pass freshly generated snapshot arrays returned by library.listAllItems() to enforce React re-rendering without mutating state directly.

6. Data Flow & Experiment Result
Borrow Data Flow Lifecycle
User clicks the Borrow button on an ItemCard.

ItemCard triggers onBorrow(itemId) callback passed down from App.

App.jsx invokes library.borrowItem(selectedMemberId, itemId) inside a try/catch block.

On success, refreshFromLibrary() fetches new array instances (listAllItems(), listMembers()) and updates state setters.

React receives new state references and re-renders the UI components with updated statuses.

refreshFromLibrary() Experiment Result
Experiment Observation: When commenting out refreshFromLibrary() after a successful borrow action, the item's internal memory state updated in JavaScript, but the UI screen did not change. The item still appeared as "Available" until another state change manually triggered a re-render.

7. Domain Model Changes
LibraryItem (Abstract Guard): Throws an error if instantiated directly using new.target === LibraryItem.

Abstract Contracts: Added required polymorphic signatures: getType(), getDetails(), and getLateFeePerDay().

calculateLateFee(daysLate): Implemented concrete validation in LibraryItem that validates numeric inputs and calculates total fee based on getLateFeePerDay().

Magazine Class: Added new LibraryItem subclass with a 7-day loan period and $0.25/day fee.

Title Validation: Enforced non-empty string title validation across constructors.

8. Polymorphism and Abstraction Q&A
Where would your UI have needed an if or switch on the item type if polymorphism did not exist? Which methods removed the need?

Without polymorphism, ItemCard would require if/switch checks on type to determine fee rates and display attributes. getDetails(), getLateFeePerDay(), and getType() removed this need by encapsulating type-specific logic within the model classes.

What is the "contract" that ItemCard depends on? List the methods.

ItemCard expects every item to implement: getId(), getTitle(), getYear(), getType(), isAvailable(), getLoanDays(), getLateFeePerDay(), and getDetails().

Why do both getDescription() and getDetails() exist?

getDescription() provides a single formatted string suited for plain terminal logging. getDetails() returns structured key-value arrays ({ label, value }) suited for UI rendering and layout building.

calculateLateFee() is written once in LibraryItem, while getLateFeePerDay() is written in every subclass. Why is this a good split?

This follows the Template Method Pattern. The base class controls common execution steps and validation logic (calculateLateFee), while subclasses supply the varying parameter (getLateFeePerDay).

What did the extension test show about the cost of adding a new type? Compare it with a design where ItemCard checks the type.

Adding a new type required zero changes to UI components. In a type-checking design, every component dealing with items would require manual if/switch updates, risking regressions.

Give one example of abstraction and one example of encapsulation from this project, and explain the difference between them.

Abstraction: LibraryItem defining getDetails() contract hides the internal structure of subclass attributes from ItemCard.

Encapsulation: Private #items array inside Library accessible only via public methods (listAllItems, borrowItem).

Difference: Abstraction hides complex logic behind simple interfaces; Encapsulation restricts direct access to internal object state.

9. Extension Test
Added Item Class: AudioBook extending LibraryItem.

Design Choice: Inherited directly from LibraryItem because audiobooks have distinct digital media attributes (Narrator, Duration) and specific loan period rules distinct from print books.

Git Diff Verification Output (git diff --stat):
 src/models/LibraryItem.js |  35 +++++-
 
  10. Limitations
Data Persistence: The application operates strictly in browser memory. Reloading or refreshing the page resets all state back to initial seed data.