# Password Manager

## Introduction

The Password Manager is a secure and convenient tool for storing and managing your online credentials. With an easy-to-use interface, it allows users to save their account information, including passwords, emails, and usernames. It features a robust password generator, a backup function that exports and imports credentials in JSON format, and a security check algorithm that assesses the overall safety by categorizing passwords as secure, duplicate, or insecure.

## Installation and Setup

### Client Setup

1. **Navigate to the client directory**:
   Open a terminal window and change into the client directory of the cloned repository.

2. **Install the necessary packages with npm**:

   ```sh
   npm install
   ```

   This will install all dependencies defined in the `package.json` file.

3. **Create a `.env` file** in the root of the client directory:
   This file will hold environment-specific variables.

4. **Add the following environment variable to the `.env` file**:

   ```env
   VITE_API_KEY=<Your_API_URL>
   ```

   Replace `<Your_API_URL>` with the URL of the backend server. For example:

   ```env
   VITE_API_KEY=http://localhost:8080
   ```

5. **Start the client application**:
   ```sh
   npm run dev
   ```
   This will start the development server for the client application, typically accessible at `http://localhost:5173`.

### Server Setup

1. **Navigate to the server directory**:
   In a new terminal window, navigate to the server directory within the cloned repository.

2. **Install the necessary packages with npm**:

   ```sh
   npm install
   ```

   Similar to the client setup, this command will install all dependencies required by the server.

3. **Create a `.env` file** in the root of the server directory:
   This file is where you will place your sensitive configuration settings, outside of your version control system.

4. **Add the following environment variables to the `.env` file**:

   ```env
   MONGO_URI=<Your_MongoDB_URI>
   SECRET_KEY=<Your_Secret_Key>
   ENCRYPTION_KEY=<Your_Encryption_Key>
   ```

   Replace the placeholders with your actual MongoDB URI, secret key for bcrypt, and encryption key. Here are example placeholders:

   ```env
   MONGO_URI=mongodb+srv://admin:password@cluster0.mongodb.net/Password-Manager?retryWrites=true&w=majority
   SECRET_KEY=p2ViEG3-b25uHX2X_D3v0lKlk4w
   ENCRYPTION_KEY=0hBxaxG3Y3opOn07MAPt2DIyfFkwFJlx
   ```

   **Important**: Ensure you use your real credentials and keys here. The encryption key must be exactly 32 bytes long.

5. **Start the server**:
   ```sh
   npm run dev
   ```
   This command runs the server, typically listening on `http://localhost:8080`.

After setting up both the client and the server, you can navigate to `http://localhost:5173` in your web browser to use the Password Manager locally.

---

## Client Application

### Dashboard Page

The Dashboard serves as the operational hub for the Password Manager, offering a comprehensive view of the user's password security and quick access to core functionalities.

#### Functionalities

- **Security Check Insights**: Displays an assessment of password strength across stored accounts and categorizes them for user review, highlighting secure, duplicate, and insecure passwords.
- **Password Generation Tool**: Provides a feature to create robust passwords, which users can customize based on their preferences for length and character types.
- **Backup Operations**: Facilitates the secure download and upload of password data in JSON format, with encryption options available for enhanced security.
- **Security Status Evaluation**: Presents a calculated security metric that reflects the collective strength of all stored passwords, aiming to incentivize users towards better password practices.

#### Implementation Notes

- The security status is dynamically calculated, giving users real-time feedback on their password health.
- Security checks are performed against each stored password, utilizing a backend algorithm that considers factors like complexity and uniqueness.
- The Password Generator offers customization options, allowing users to tailor the strength of generated passwords to their specific security needs.
- Backup functionality is integrated with both frontend and backend logic to handle data export and import securely, with attention to privacy and data integrity.
- The interface is designed for ease of use, with clear visual indicators for each category of password security and straightforward navigation to all features.

The Dashboard is crafted to be both informative and practical, guiding users toward optimal password security through its various tools and displays. It prioritizes user engagement with security practices, making it easy for users to understand and improve their online safety.

---

### Accounts Page

The Accounts page in the Password Manager is where users can manage their stored credentials. It includes functionalities for adding new accounts, editing existing ones, searching through saved accounts, and deleting them when necessary.

#### Functionalities

- **Add Account**: Users can add new account details by filling a form with the account name, username, email, and password. A success message is displayed after the account is successfully added.

- **Search**: A search bar allows users to filter through their saved accounts, making it easier to find the needed credentials.

- **Edit Account**: Editing can be initiated for each saved account. Users can modify any detail of their saved account information. An option to cancel editing is available which will revert the changes if the user decides not to save the edits.

- **Delete Account**: An account can be removed from the saved list after confirming the user's intent through a confirmation prompt.

- **Success and Error Handling**: While adding or editing accounts, success and error messages provide feedback to the user. It ensures users are informed about the outcome of their actions.

- **Loading State**: The interface reflects when an operation is in progress, enhancing the user experience by indicating that their request is being processed.

#### Implementation Notes

- The Accounts component utilizes the `useState` and `useEffect` hooks from React for managing state and side effects, respectively.
- A call to the backend API through `api.getAccounts` fetches the list of stored accounts.
- New account details are temporarily stored in component state until they are submitted to the backend with `api.addAccountToUser`.
- For editing, the component keeps track of the original account details to allow for cancellation.
- The `crypto.randomUUID()` function is used to generate unique identifiers for new accounts.
- Accounts are sorted alphabetically for display.
- Custom form components handle the UI for adding and editing account details.

---

### Sign In Page

The Sign In page is the gateway for users to access their Password Manager accounts. It facilitates the authentication process, ensuring that user access is secure and personalized.

#### Functionalities

- **Authentication**: Users can sign in using their email and password. The credentials are verified against the stored data in the backend.
- **Error Handling**: The page displays error messages if the sign in process encounters issues, such as incorrect credentials or server errors.
- **Loading State**: Reflects the loading state during the authentication process, providing visual feedback that the login request is being processed.
- **Navigation**: Upon successful authentication, users are redirected to the dashboard where they can access their saved accounts and other features.

#### Implementation Notes

- The `useState` hook is utilized for managing local form state, including the inputs for email and password.
- The `api.loginUser` function from `apiFacade` is called on form submission to authenticate the user against the backend.
- Authentication status is stored in local state and also persisted in `localStorage` for session management.
- The `Navigate` component from `react-router-dom` is used to redirect authenticated users to the dashboard.

### Sign Up Page

The Sign Up page provides new users with the ability to create an account for the Password Manager. It's designed to be intuitive, ensuring a smooth onboarding process.

#### Functionalities

- **Registration**: New users can register by providing a username, email, password, and password confirmation.
- **Password Validation**: The page includes a validation check to ensure that the password and confirm password fields match.
- **Error Handling**: Any issues during the sign up process, like mismatched passwords or server errors, are displayed to the user.
- **Loading State**: Indicates when the registration request is in progress, enhancing user experience by acknowledging that their submission is being processed.
- **Navigation**: Once registration is successful, the user is automatically authenticated and redirected to the dashboard.

#### Implementation Notes

- Local form state for the registration inputs is managed using the `useState` hook.
- The `api.registerUser` function from `apiFacade` is responsible for sending the new user's data to the backend.
- Successful registration results in the new user being automatically authenticated and their token stored in `localStorage`.
- As with the Sign In page, the `Navigate` component handles redirection post-authentication.

---

### User Profile Page

The User Profile page is a personal space for users to manage their account details within the Password Manager. This page is centered around user empowerment, allowing them to take charge of their personal information and security settings.

#### Functionalities

- **View and Edit Profile**: Users can view their current profile information and opt to edit details such as email and username.
- **Password Change**: There is an option to update the account password, with a check in place to ensure the new password and confirm password fields match.
- **Account Deletion**: For users who wish to remove their presence from the Password Manager, the page provides a delete account option after confirming the user's decision.
- **Logout**: A logout function is included for users to securely exit their account.
- **Feedback Messages**: After each action, the page provides appropriate success or error messages to inform the user of the outcome.

#### Implementation Notes

- The page makes use of the `useState` hook for managing state, including user information and loading states.
- The `useEffect` hook is employed to populate the user form with current information when the page loads.
- Password validation is performed to ensure the user's new password entries match before submission.
- Interaction with the backend API is handled through the `api.editUser` and `api.deleteUser` functions from `apiFacade`.
- Upon successful profile edit or account deletion, the user receives a confirmation message.
- The logout function clears the local session and updates the authentication state, ensuring a clean exit from the user's session.

The UserProfile page is built with user experience at its core, making account management straightforward and user-friendly. The process of updating profile details, changing passwords, and even deleting an account is designed to be intuitive and secure.

---

## Client API Facade Documentation

The `apiFacade.js` serves as an abstraction layer in the Password Manager client application, providing a simplified interface for interacting with the server's API. It encapsulates the API endpoints and offers a centralized method of managing all API calls.

### `apiFetch` function in `fetch.js`

- **Purpose**: Handles all HTTP requests to the server.
- **Parameters**:
  - `url`: The endpoint to which the request is made.
  - `options`: An object containing any custom settings that you want to apply to the request.
  - `token`: The authentication token for secure endpoints that require authorization.
- **Functionality**: The function appends the authorization token to the headers if provided, sends the request to the combined base URL and endpoint, handles the response, and parses the JSON data. It also catches and returns any errors encountered during the process.
- **Response Handling**: If the response is not OK, it parses and returns the error. Otherwise, it returns the JSON-parsed data.

### `api` object in `apiFacade.js`

The `api` object is a collection of functions that correspond to various features of the Password Manager. Each function wraps a call to the corresponding feature's service, passing through any required arguments such as `token` and `credentials`.

- **Account Methods**:

  - `getAccounts`: Retrieves the user's stored accounts.
  - `addAccountToUser`: Adds a new account with credentials to the user's stored accounts.
  - `editAccount`: Edits an existing account's details.
  - `deleteAccount`: Removes an account from the user's stored accounts.

- **User Methods**:

  - `getUser`: Fetches the current user's details.
  - `loginUser`: Authenticates the user and retrieves a token.
  - `registerUser`: Creates a new user account and returns a token.
  - `editUser`: Updates user profile information.
  - `deleteUser`: Deletes the user's account from the system.

- **Backup Methods**:

  - `downloadBackup`: Initiates a download of the user's encrypted backup data.
  - `downloadBackupDecrypted`: Initiates a download of the user's decrypted backup data.
  - `uploadBackup`: Uploads a backup data file to the user's account.

- **Security Methods**:
  - `getSecurityData`: Retrieves data used for the security check of the user's stored passwords.

This facade pattern in `apiFacade.js` not only makes the codebase easier to maintain but also simplifies the process for developers to use these API calls throughout the application. It ensures that any changes to endpoint logic only need to be updated in one place, rather than throughout all the components that might be using that endpoint.

---

---

## Server Application

### API Endpoints

---

### Authentication

#### POST /auth/signup

Registers a new user with the system. It requires a detailed payload that includes vital information such as username, email, and password. Validation rules are enforced to maintain data integrity and security.

##### Request Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

##### Validation Rules

- `username`: Must be alphanumeric and between 3 to 20 characters in length.
- `email`: Valid email format, including support for `.com`, `.net`, `.de` domains.
- `password`: Should be 8 to 30 characters long, containing at least one lowercase letter, one uppercase letter, one number, and one special character.

##### Responses

- `201 Created`: User registration successful, returns a token.
- `403 Forbidden`: Email or username already exists.
- `400 Bad Request`: Input validation failure.
- `500 Internal Server Error`: Server-side error.

#### POST /auth/signin

Authenticates a user and generates a token for session management. This endpoint requires the user's email and password.

##### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

##### Logic Flow

1. **Email and Password Verification**: First, it checks if there's a user registered with the provided email. If found, it then verifies the password.
2. **Token Generation**: Upon successful authentication, a JWT token is generated using the user's ID and the secret key from the environment variables.

3. **Error Handling**: If no user is found with the given email, or if the password does not match, appropriate error responses are returned.

##### Responses

- `201 Created`: Login successful, returns a token.
- `404 Not Found`: No user found with the provided email.
- `401 Unauthorized`: Incorrect password.
- `500 Internal Server Error`: Server-side error.

---

### User Profile Management

#### GET /me

Retrieves the profile information of the authenticated user. This endpoint is secured, requiring a valid token for access.

##### Responses

- `200 OK`: Successfully retrieves user profile information, excluding sensitive details like password.
- `401 Unauthorized`: If the token is missing or invalid.
- `500 Internal Server Error`: Server-side error.

#### PUT /me

Updates the authenticated user's profile information. Allows changes to email, username, and password. This endpoint employs validation and checks to ensure email and username uniqueness.

##### Request Body

```json
{
  "email": "string (optional)",
  "username": "string (optional)",
  "password": "string (optional)"
}
```

##### Validation Rules

- Same as for `/auth/signup`.
- Password change will trigger rehashing.

##### Responses

- `200 OK`: Profile updated successfully, returns a new token.
- `403 Forbidden`: Email or username already exists elsewhere.
- `404 Not Found`: User not found.
- `400 Bad Request`: Validation errors for input data.
- `500 Internal Server Error`: Server-side error.

#### DELETE /me

Permanently deletes the authenticated user's account. This action is irreversible and requires token authentication.

##### Responses

- `200 OK`: Account deletion successful.
- `404 Not Found`: User not found, likely already deleted or never existed.
- `401 Unauthorized`: If the token is missing or invalid.
- `500 Internal Server Error`: Server-side error.

Each of these endpoints plays a crucial role in user account management, offering the functionalities of viewing, updating, and deleting user profile information. Security is ensured through the use of JWT tokens for authentication and authorization, alongside Joi validation for data integrity.

---

### Account Management

Account management allows users to securely store, retrieve, edit, and delete account information. This functionality is accessible through a set of endpoints, each requiring user authentication.

#### GET /me/accounts

Retrieves all accounts associated with the authenticated user. The passwords are decrypted before being sent to the user for security.

##### Responses

- `200 OK`: Returns a list of accounts with decrypted passwords.
- `500 Internal Server Error`: If any account's password is not properly encrypted.

#### POST /me/accounts

Adds a new account to the authenticated user's stored accounts. The password for the account is encrypted before storage.

##### Request Body

```json
{
  "name": "string",
  "username": "string (optional)",
  "password": "string",
  "email": "string (optional)"
}
```

##### Responses

- `200 OK`: Account successfully added.
- `404 Not Found`: User not found.
- `400 Bad Request`: Input validation failure.
- `500 Internal Server Error`: Server-side error or encryption failure.

#### PUT /me/accounts/:accountId

Updates an existing account associated with the authenticated user. The account's password is re-encrypted before updating the account information.

##### Request Body

```json
{
  "name": "string (optional)",
  "username": "string (optional)",
  "password": "string (optional)",
  "email": "string (optional)"
}
```

##### Responses

- `200 OK`: Account successfully updated.
- `404 Not Found`: User or account not found.
- `400 Bad Request`: Input validation failure.
- `500 Internal Server Error`: Server-side error or encryption failure.

#### DELETE /me/accounts/:accountId

Removes a specified account from the authenticated user's stored accounts.

##### Responses

- `200 OK`: Account successfully deleted.
- `404 Not Found`: User or account not found.
- `500 Internal Server Error`: Server-side error.

Each endpoint employs `verifyToken` middleware for authentication and, where applicable, `validateJoi` for input validation. Encryption and decryption ensure that account passwords are securely managed, providing users with a safe and reliable way to handle their sensitive account information.

---

### Backup Management

Backup management in the Password Manager enables users to securely download and upload their account data, ensuring data portability and recovery capabilities. These functionalities are accessible via dedicated API endpoints, each requiring user authentication.

#### GET /me/backup

Allows users to download an encrypted backup of their account data. This backup includes all user data except for the user's password.

##### Responses

- `200 OK`: Sends a JSON string of encrypted user data.
- `404 Not Found`: User not found.
- `500 Internal Server Error`: Server-side error.

#### GET /me/backup/decrypted

Enables users to download a decrypted backup of their account data, providing a plain text version of their account information, including decrypted passwords for convenience.

##### Responses

- `200 OK`: Sends a JSON string of decrypted user data.
- `404 Not Found`: User not found.
- `500 Internal Server Error`: Errors related to decryption failures or server-side issues.

#### POST /me/backup

Facilitates the uploading of a backup file to restore or update the user's account data. This endpoint expects a JSON payload containing the user's account data.

##### Request Body

```json
{
  "backup": "stringified JSON data"
}
```

##### Validation

- The backup data must conform to a predefined schema, validating the structure and content of the uploaded data.

##### Responses

- `200 OK`: Backup successfully uploaded and user data updated.
- `400 Bad Request`: Parsing errors or validation failures of the backup data.
- `404 Not Found`: User not found.
- `500 Internal Server Error`: Errors related to data saving or server-side issues.

Each of these endpoints utilizes the `verifyToken` middleware to ensure that the user is authenticated, and where applicable, `validateJoi` middleware for validating the structure of the uploaded backup data. The use of encryption and decryption ensures that sensitive data like account passwords are handled securely during the backup and restore processes.

---

### Password Security Analysis

The Password Manager provides an essential feature for analyzing the security of stored passwords. This functionality assesses each password's strength, identifies insecure passwords, and detects duplicates. The results help users improve their password hygiene by highlighting areas that need attention.

#### GET /me/analyze-passwords

Executes a comprehensive analysis of the passwords stored by the authenticated user. It decrypts each password, evaluates its security, and checks for duplicates.

##### Responses

- `200 OK`: Returns a detailed report of the password analysis, including counts of secure, insecure, and duplicate passwords, along with the names of accounts associated with insecure or duplicate passwords.
- `500 Internal Server Error`: Errors related to decryption failures or server-side issues.

##### Analysis Report Structure

```json
{
  "accountsTotal": "number of accounts analyzed",
  "securePasswords": "count of passwords deemed secure",
  "insecurePasswords": "count of passwords deemed insecure",
  "duplicatePasswords": "count of duplicate passwords found",
  "insecurePWArr": ["list of account names with insecure passwords"],
  "duplicatePWArr": ["list of account names with duplicate passwords"]
}
```

##### Security Criteria

- **Secure Passwords**: Meet specific criteria, such as length and complexity, deemed necessary for a strong password.
- **Insecure Passwords**: Fail to meet the security criteria, posing a higher risk of being compromised.
- **Duplicate Passwords**: Identical passwords used across multiple accounts, increasing the risk if one account is compromised.

This feature is crucial for maintaining high standards of account security. By periodically analyzing passwords, users can proactively address vulnerabilities, ensuring their digital assets remain protected against common threats.

---

### Models

### User Model Documentation

The User model is a crucial component of the Password Manager, representing user entities within the system. It leverages MongoDB, a NoSQL database, through Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js. This model is used to store and manage user-specific data, including credentials and associated account information.

#### Schema Definition

The `userSchema` defines the structure of the user document within MongoDB. Here's a breakdown of the schema fields:

- **username**: Stores the unique username for the user. It is a required field, meaning every user must have a username.

  - Type: `String`
  - Required: `true`

- **email**: Holds the user's email address. It's essential for authentication purposes and is also a required field.

  - Type: `String`
  - Required: `true`

- **password**: Contains the user's hashed password. The password is stored in a hashed format for security reasons, ensuring that plaintext passwords are never stored in the database.

  - Type: `String`
  - Required: `true`

- **accounts**: An array that stores information about the various accounts (e.g., social media, email, etc.) that the user has added to the Password Manager. Each entry in this array contains details about a specific account, including the account name, username, encrypted password, and any other relevant information.
  - Type: `Array`
  - Required: `false` (A user can exist without having added any accounts.)

#### Model Export

The schema is compiled into a model with the name `"User"`, making it accessible throughout the application for performing CRUD operations related to user documents in the MongoDB database.

#### Usage

This model is used in various parts of the application, such as in authentication processes (sign-up, sign-in), user profile management (view, update, delete), and account management (add, update, delete accounts). It allows for efficient data manipulation and retrieval, ensuring that user data is handled securely and performantly.

---

### Middlewares

Middlewares play a crucial role in the Password Manager application, enhancing the expressiveness and security of the API by preprocessing requests, handling authentication, and managing errors. Here's an overview of the core middlewares utilized within the application:

#### verifyToken

The `verifyToken` middleware is responsible for validating JWT tokens provided in the request headers. This ensures that protected routes are only accessible to authenticated users.

- **Functionality**: Extracts the token from the `authorization` header and verifies it using the secret key. If verified, the middleware extracts the user ID from the token payload and attaches it to the request object, allowing subsequent middleware or route handlers to access the authenticated user's ID.
- **Error Handling**: If the token is missing, invalid, or expired, it responds with an `Unauthorized` error.

#### validateJoi

The `validateJoi` middleware is used for validating request bodies against predefined Joi schemas. This ensures that the data provided by the client meets the application's requirements before any operation is performed.

- **Functionality**: Accepts a Joi schema as a parameter and validates the request body against it. It's capable of providing context-aware validation, such as distinguishing between sign-up and other requests.
- **Error Handling**: Returns a `Validation Error` if the data fails to meet the schema requirements. It also checks if there's any data to validate and returns an error if the request body is empty.

#### errorHandler

The `errorHandler` middleware is a centralized error handling mechanism for the application. It ensures that all errors are caught and handled uniformly.

- **Functionality**: Captures any errors thrown during the request lifecycle and formats them into a consistent response structure. This includes errors thrown manually or by other middlewares and route handlers.
- **Error Response**: Constructs a response that includes the error message, a custom error type and code (if provided), and the HTTP status code. If no specific status code is provided with the error, it defaults to `500 Internal Server Error`.

### Usage in the Application

These middlewares are applied across various routes and endpoints within the application:

- **verifyToken** is used to protect routes that require user authentication, ensuring that only authenticated users can access certain functionalities such as fetching user accounts or updating profile information.

- **validateJoi** is applied to routes that accept user input, such as sign-up, sign-in, and account management endpoints. It ensures the integrity and format of the data received before processing it.

- **errorHandler** is typically placed at the end of the middleware chain to catch and handle any errors that occur during the processing of a request, providing a uniform error response structure to the client.

By incorporating these middlewares, the Password Manager application enhances its security, data integrity, and error handling capabilities, leading to a more robust and user-friendly API.

---

### Utility Functions Documentation

The Password Manager application incorporates several utility functions designed to streamline asynchronous flow control, enhance security through encryption, standardize error handling, and validate password strength.

#### asyncHandler

This utility function is a higher-order function designed to wrap asynchronous route handlers, providing a clean way to handle rejected promises without the need for repetitive try-catch blocks.

- **Functionality**: It takes an asynchronous function as an input and returns a new function that resolves the promise returned by the asynchronous function. If the promise is rejected, it passes the error to the next middleware in the chain, typically the error handling middleware.

#### Encryption Utilities: `encrypt` and `decrypt`

These functions utilize Node.js's built-in `crypto` module to securely encrypt and decrypt data using the AES-256-CBC encryption algorithm.

- **`encrypt(text)`**: Encrypts a given piece of text using a predefined secret key (32 bytes long) and a randomly generated initialization vector (IV). Returns an object containing the IV and the encrypted data, both encoded as hex strings.

- **`decrypt(text)`**: Decrypts data that was encrypted using the `encrypt` function. It takes an object containing the IV and encrypted data (both as hex strings), converts them back into their original binary formats, and returns the decrypted plaintext.

- **Environment Dependency**: Both functions rely on an environment variable `ENCRYPTION_KEY` for the secret key, which must be exactly 32 bytes in length to ensure security.

#### ErrorResponse

This class extends the native JavaScript `Error` class, allowing for the creation of error objects with additional properties such as `statusCode`, `errorType`, and `errorCode`. It enables more detailed error reporting and handling throughout the application.

- **Constructor Parameters**:
  - `message`: A descriptive message about the error.
  - `statusCode`: The HTTP status code associated with the error.
  - `errorType`: A short description of the error type, helping to categorize the error.
  - `errorCode`: A custom code that further specifies the error, useful for debugging and client-side error handling.

#### isPasswordSecure

A utility function to assess the security of a given password based on several criteria, ensuring that user passwords meet a minimum security standard.

- **Criteria**:

  - Minimum length of 8 characters.
  - At least one uppercase letter.
  - At least one lowercase letter.
  - At least one digit.
  - At least one special character.

- **Functionality**: Returns a boolean indicating whether the password meets all the listed criteria, aiding in both validation during user registration and recommendations for secure password practices.

Together, these utilities enhance the functionality and security of the Password Manager, providing essential services like secure data handling, streamlined asynchronous control flow, standardized error reporting, and password security validation.
