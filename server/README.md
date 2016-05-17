#### Dependency Summary
| Package | Explanation |
| ------- | ----------- |
| bcryptjs | Encryption for user authentication |
| body-parser | Middleware for decoding JSON |
| bookshelf | Object Relational Mapper |
| cors | Allow cross origin requests | 
| express | Web framework that makes it easy to write secure, modular, and fast applications |
| knex | SQL query builder and connection API |
| lodash | Simplifies iterating over arrays, objects, and strings |
| mysql | Relational database API |
| passport, passport-* | User authentication |
| path | Handles and transforms file paths |
| require-dir | Automatically require all files in a directory |

#### Routes
| HTTP VERB | PATH | ACTION | RETURN VALUE |
| --------- | ---- | ------ | ------------ |
| GET | / | Retrieve root | String |
| GET | /* | Unregistered routes | Custom 404 page |
| GET | /api/users | Retrieve all users | JSON object |
| POST | /api/users | Create user | JSON object |
| GET | /api/users/:id | Retrieve user with specified ID | JSON object |
| PUT | /api/users/:id | Update user with specified ID | JSON object |
| DELETE | /api/users/:id | Remove user with specified ID | JSON object |

#### Notes
* Install knex globally 'npm install -g knex'
	* Create database schemas by running 'knex migrate:latest' from /server/
	* Remove database schemas by running 'knex migrate:rollback' from /server/
	* Migrations allow incremental updates to the database and are generated with 'knex migrate:make file_name'

#### Requirements
* Local MySQL installation with database 'myschema'