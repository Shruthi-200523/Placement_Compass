# 🧭 Placement Compass

Placement Compass is a full-stack web application designed to help students organize and track their placement preparation in one place.

It provides dedicated modules for coding practice, aptitude preparation, company preparation, study planning, notes, and progress tracking.

---

## 🚀 Features

### 🔐 User Authentication
- User registration and login
- BCrypt password encryption
- JWT-based authentication
- Secure protected APIs
- User-specific data isolation

### 📊 Dashboard
- Target companies count
- Notes count
- Task completion progress
- Coding progress
- Aptitude question count
- Company preparation progress

### 🏢 Company Preparation
- View target companies
- Add companies to preparation
- Track preparation progress
- Maintain company-specific preparation information

### 💻 Coding Practice
- Add coding questions
- Track solved/unsolved questions
- Filter coding questions
- Monitor coding progress

### 🧠 Aptitude Preparation
- Practice aptitude questions
- Filter questions by topic
- Track attempted questions
- Add and manage questions

### 📅 Study Planner
- Create preparation tasks
- Mark tasks as completed
- Track task progress

### 📝 Notes
- Create notes
- Edit notes
- Delete notes
- Maintain personal preparation notes

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Axios
- React Router
- CSS

### Backend
- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- Gradle

### Database
- MySQL

### Development Tools
- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git
- GitHub
- MySQL Workbench

---

## 🏗️ System Architecture

```text
                    Placement Compass
                           |
             +-------------+-------------+
             |                           |
        React Frontend             Spring Boot Backend
          Vite :5173                    :8080
             |                           |
             |        Axios + JWT        |
             +---------------------------+
                         |
                    REST APIs
                         |
                    JPA / Hibernate
                         |
                       MySQL
                    :3306
