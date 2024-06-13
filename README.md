
# Organization Management

Develop an API that returns all the Employee Information (hierarchy by position) under any given position in the organogram.

## Solving Approach

For this scenario, my approach begins by separating employees and their positions into different tables linked by relationships. Initially, I retrieve employees based on their positions. To optimize operations for efficiency and reliability, I store specific data in Redis. When a request is made, I first check Redis for the data. If found, it is promptly returned. Otherwise, the data is fetched from the database.

Additionally, I adhere to industry security standards throughout the implementation. Robust logging mechanisms are incorporated to facilitate the debugging of any issues encountered. 

To ensure comprehensive testing, I develop relevant test cases. Furthermore, I create a migration file to establish a new database table as required.
## API Reference

#### Get item

```http
  GET /api/v1/organizations/employees/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of position to fetch |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.development for development mode and .env.production for production mode

`DB_NAME`

`DB_USER`

`DB_PASS`

`HOST`

`SCHEMA`

`API_URL`

`JWT_TOKEN`

## Run Locally

Clone the project

```bash
  git clone https://github.com/jinnatul/organization-manager.git
```

Go to the project directory

```bash
  cd organization-manager
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Running Tests

Install dependencies

```bash
  npm install
```

To run tests, run the following command

```bash
  npm run test
```


## Tech Stack

**Server:** Node, Express

**Database:** PostgreSQL, Redis

**Unit Testing:** Jest

**Logging:** Winston
## FAQ

#### Do you use any testing frameworks?

Yes, I used Jest and wrote 3 test cases.

#### Have you implemented any logging systems to debug the system as it increases in complexity?

Yes, using Winston to write activity logs in day-wise split files and remove files after 14 days.

#### How can I deploy your system in production?

For production deployment, you need to change env file credentials and install **redis** in your system, or you can use a 3rd party service like Amazon ElastiCache and create a github action, or you can use Jenkins CI/CD or any other CI/CD process to deploy your system in production, and then you can use a load balancer for better performance. 

#### Are you sharing any seed data for the demo?

Yes, in the data folder, I share 2 models of SQL version backup data for better understanding.

#### Here have any API documentation?

Yes, [Click Here](https://github.com/jinnatul/organization-manager/blob/master/README.md)

#### Here have any API response demo?

Yes, [Click Here](https://github.com/jinnatul/organization-manager/blob/master/demo/response.png)
## Authors

- [@jinnatul](https://github.com/jinnatul)

