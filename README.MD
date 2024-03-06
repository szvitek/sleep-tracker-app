# Sleep tracker app

## Run the apps:

### Config:

backend:

create .env file in the frontend folder:
| env variable | example
| --- | --- |
|`MONGO_URI` | `mongodb+srv://...` |

frontend:

create .env file in the frontend folder:
| env variable | example
| --- | --- |
|`VITE_API_URL` | `http://localhost:3000` |

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

app is running on: http://localhost:3000/

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
- [x]: (backend): setup mongoose
- [x]: (backend): POST route for create new entry
- [ ]: (backend): GET route for populate the table
- [ ]: (backend): GET route for populate the chart
