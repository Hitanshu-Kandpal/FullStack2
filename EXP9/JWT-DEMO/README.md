# JWT Authentication Demo

A Spring Boot application demonstrating JWT (JSON Web Token) authentication for secure API access.

## Description

This project implements a basic JWT authentication system using Spring Boot and Spring Security. Users can login to obtain a JWT token, and access protected endpoints using that token. The application uses MySQL for data storage and JJWT for token management.

## Features

- User login with JWT token generation
- Protected API endpoints
- MySQL database integration
- Basic JWT validation

## Tech Stack

- **Backend**: Spring Boot 4.0.5
- **Security**: Spring Security, JJWT 0.11.5
- **Database**: MySQL
- **Build Tool**: Maven
- **Java Version**: 21

## Project Structure

```
JWT-DEMO/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/AML_2A/JWT_DEMO/
│   │   │       ├── controller/
│   │   │       │   └── AuthController.java
│   │   │       ├── model/
│   │   │       │   └── User.java
│   │   │       ├── repository/
│   │   │       │   └── UserRepository.java
│   │   │       ├── service/
│   │   │       │   └── AuthService.java
│   │   │       ├── security/
│   │   │       │   └── JwtUtil.java
│   │   │       ├── config/
│   │   │       │   └── SecurityConfig.java
│   │   │       └── JwtDemoApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/AML_2A/JWT_DEMO/
│               └── JwtDemoApplicationTests.java
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/login` | Login and get JWT token | `username` and `password` as form params |

### Protected Endpoints

| Method | Endpoint | Description | Headers |
|--------|----------|-------------|---------|
| GET | `/api/hello` | Access protected hello message | `Authorization: Bearer <jwt_token>` |

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd JWT-DEMO
   ```

2. **Configure Database**
   - Create a MySQL database named `jwt_demo`
   - Update `src/main/resources/application.properties` with your database credentials if needed:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/jwt_demo
   spring.datasource.username=root
   spring.datasource.password=root
   ```

3. **Build the project**
   ```bash
   ./mvnw clean install
   ```

4. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on `http://localhost:8080`

## Usage

### Using Postman

1. **Login to get JWT token**
   - Method: POST
<<<<<<< HEAD
   - URL: `http://localhost:8080/api/login`
   - Body: Form-data with `username` and `password`
=======
   - URL: `http://localhost:8080/api/hello`
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "password": "password123",
       "email": "test@example.com"
     }
     ```

2. **Login to get JWT token**
   - Method: POST
   - URL: `http://localhost:8080/api/login`
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "password": "password123"
     }
     ```
>>>>>>> f2f5dde182d4bbdd846499760440f0898f9a3302
   - Response will contain the JWT token

2. **Access protected endpoints**
   - Method: GET
   - URL: `http://localhost:8080/api/hello`
   - Headers:
     - `Authorization: Bearer <your_jwt_token>`

## Screenshots

### 1. User Registration
![User Registration](screenshots/registration.png)

### 2. JWT Login + Token Response
![JWT Token Response](screenshots/jwt_response.png)

## Dependencies

- Spring Boot Starter Web
- Spring Boot Starter Security
- Spring Boot Starter Data JPA
- MySQL Connector/J
- JJWT API, Impl, Jackson
- Spring Boot Starter Test

## Security Configuration

The application uses Spring Security with JWT. Currently, all requests are permitted (for simplicity), but JWT utilities are in place for token generation and validation. Password encoding is configured with BCrypt.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

