# Sleep tracker app

## Run the apps:

### Config:

backend:
provide a `MONGO_URI` env variable to connect to database

frontend:

create .env file in the frontend folder:
| env variable | example
| --- | --- |
|`VITE_API_URL` | http://localhost:3000 |

### backend (NestJS app):

```bash
$ cd backend
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### frontend (React vite app):

```bash
$ cd frontend
$ npm i

# development
$ npm run dev
```

app is running on: http://localhost:5173/

## Tasks:

- [x]: (frontend): build a form
- [ ]: (frontend): create a page with a table
- [ ]: (frontend): create a chart with echart
- [ ]: (backend): setup mongoose
- [ ]: (backend): POST route for create new entry
- [ ]: (backend): GET route for populate the table
- [ ]: (backend): GET route for populate the chart
