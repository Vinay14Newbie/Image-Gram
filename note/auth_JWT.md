A **JWT (JSON Web Token)** is a secure way to represent information between two parties, typically for **authentication**. It’s commonly used to confirm a user's identity in a system. Let’s break down how JWTs work for authentication using the example of a hotel, a customer, and a receptionist.

### JWT Basics in the Context of Authentication

Imagine you're at a hotel, and you’ve checked in at the front desk (reception) where the receptionist verifies your identity.

1. **Receptionist (Server) Issues a Keycard (JWT)**:
   - The receptionist verifies that you’re a legitimate guest by checking your ID, reservation, etc.
   - After verification, they issue you a **keycard (JWT)**, which gives you access to your room and certain hotel facilities.

2. **Keycard as Proof of Authorization (JWT)**:
   - The keycard represents your **authentication** in the hotel. It contains encoded information that says you’re a guest with access to specific rooms and facilities.
   - This keycard is only valid while you’re checked in, and it’s not easily forgeable.

3. **Using the Keycard for Access (JWT Authentication)**:
   - When you want to access your room or other hotel areas, you use your keycard at each entry point.
   - The card reader (server) checks the card’s validity and the permissions encoded within it, and if everything checks out, you’re granted access.

4. **Automatic Access Without Re-verifying**:
   - With the keycard, you don’t have to go back to the front desk every time you need to access a room. It’s **stateless**—the receptionist doesn’t need to remember who you are or recheck your ID every time.
   - Similarly, JWTs allow for stateless authentication. The server doesn’t need to keep track of each user; the JWT itself contains all the necessary information to verify access.

### Breaking Down JWT in Authentication Terms

1. **Logging In (Checking In at the Hotel)**:
   - A user provides their **credentials** (like showing ID at the front desk). The server (receptionist) **authenticates** the user by verifying these credentials.
   - After a successful check-in, the server creates a **JWT** containing the user’s information, signed with a secret key, and sends it back to the user.

2. **JWT Token Structure**:
   - A JWT has three parts: **Header**, **Payload**, and **Signature**.
     - **Header**: Specifies the type of token (JWT) and the hashing algorithm.
     - **Payload**: Contains the user’s data (e.g., user ID, role, permissions).
     - **Signature**: A hashed combination of the header, payload, and a **secret key** to ensure the token’s integrity.
   - Example JWT might look like this: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6Imd1ZXN0In0.KXjv-Ps_z3kjnfw5k9gwUd9w8M1zyFFhBzb`

3. **Token as a Keycard**:
   - The JWT token is like a **keycard** that the user can present to gain access. The user includes this token in the **Authorization header** of each request to the server.

4. **Accessing Resources (Entering Rooms)**:
   - When the user (guest) wants to access a resource (room), they present the JWT token (keycard) to the server.
   - The server verifies the token’s **signature** and checks the user’s **permissions** encoded in the payload (like a keycard reader checking room access).
   - If valid, the server allows access to the resource (lets the user into the room). If the token is invalid or expired, the server denies access.

### Example Code for JWT Authentication in a Web Application

1. **Generating a JWT on Login (Receptionist Issues Keycard)**:
   - When a user logs in, the server generates a JWT with user information and sends it back.
   ```js
   const jwt = require('jsonwebtoken');

   // Function to generate JWT
   function generateToken(user) {
       const payload = { userId: user.id, role: user.role }; // e.g., "guest" or "admin"
       const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // expires in 1 hour
       return token;
   }
   ```

2. **Sending the JWT with Each Request (Presenting the Keycard)**:
   - The client includes the JWT in the **Authorization header** of each request.
   ```js
   // Request with JWT in the Authorization header
   fetch('/api/rooms', {
       method: 'GET',
       headers: {
           Authorization: `Bearer ${token}`
       }
   });
   ```

3. **Verifying JWT on Each Request (Server Verifies Keycard)**:
   - The server verifies the token, checks permissions, and grants or denies access.
   ```js
   const jwt = require('jsonwebtoken');

   // Middleware to authenticate JWT
   function authenticateToken(req, res, next) {
       const authHeader = req.headers['authorization'];
       const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

       if (!token) return res.sendStatus(401); // No token, unauthorized

       jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
           if (err) return res.sendStatus(403); // Invalid token, forbidden
           req.user = user; // Attach user info to request
           next(); // Proceed to the requested resource
       });
   }
   ```

### Summary

In this hotel analogy:
- **Receptionist**: Represents the server, which authenticates users and issues JWTs.
- **Keycard (JWT)**: A token representing the user's identity and access level.
- **Room Access (Protected Resources)**: Users present the token on each request to access specific resources.
- **Keycard Reader (JWT Verification)**: Each protected resource verifies the JWT before granting access.

JWTs provide a **stateless, secure way** for clients to authenticate without needing to constantly re-verify identity. This structure is efficient, secure, and ensures that users only need to authenticate once to gain ongoing access.