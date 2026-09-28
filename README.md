# Student Management REST API

Express.js REST API with in-memory data (no database).

## Run
```
npm install
npm start
```
Server: http://localhost:3000

## Endpoints
| Method | URL | Description | Success |
|---|---|---|---|
| GET | /students | List all students | 200 |
| GET | /students/:id | Get one student | 200 |
| POST | /students | Add student | 201 |
| PUT | /students/:id | Update student | 200 |
| DELETE | /students/:id | Delete student | 200 |

Errors: 400 (invalid id / body / JSON), 404 (student or route not found).

## Sample body (POST / PUT)
```json
{ "name": "Neha Singh", "age": 22, "course": "MCA" }
```
