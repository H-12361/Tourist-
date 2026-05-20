Tourist Listing Web Application

A full-stack Tourist Listing web application built using Node.js, Express, MongoDB, and EJS (Server Side Rendering).

This is my first complete full-stack project where I learned how real applications work from backend to frontend using SSR with proper authentication, validation, and role-based access control.

 
 ** What I Learned **
Through this project, I learned and implemented:

Server Side Rendering using EJS
How data flows from backend to frontend
MVC structure in Express
MongoDB integration using Mongoose
Authentication using sessions and cookies
Role Based Access Control (RBAC)
Conditional rendering in UI based on logged-in user
Form validations and error handling
Secure use of .env for secrets
Git & GitHub best practices
🛠️ Tech Stack
Backend: Node.js, Express.js
Frontend (SSR): EJS, Bootstrap
Database: MongoDB, Mongoose
Authentication: express-session, cookies
Other Packages: dotenv, method-override, express-validator
✨ Key Features
🔐 Authentication
User Registration & Login
Session management
🗂️ Tourist Listings (CRUD)
Create, Read, Update, Delete listings
Data rendered dynamically using EJS from server
✅ Validations
Proper server-side form validations
Error messages for invalid inputs
👤 Role Based Access Control (Important Feature)
Edit and Delete buttons are only visible to the owner of the listing
No other user can edit or delete someone else's listing
Implemented using conditional checks in EJS and middleware in routes
🧠 Server Side Rendering (SSR)
Pages rendered from backend data using EJS templates
Learned how to pass data from routes → controllers → views
📁 Project Structure (MVC)
models/
views/
routes/
controllers/
public/
⚙️ Environment Variables

Create a .env file in root:

MONGO_URL=your_mongodb_connection
SESSION_SECRET=your_secret_key

▶️ Run Locally
npm install
npm start

Open:

http://localhost:3000
📌 Learning Outcome

This project helped me understand:

Real-world full stack development
Authorization & security in web apps
Clean and maintainable project structure
Practical implementation of SSR with EJS
🙌 Conclusion

This project is a major milestone in my journey as a full-stack developer. It helped me move from theory to real practical implementation.
