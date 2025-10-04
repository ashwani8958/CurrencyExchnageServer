# Currency Exchange Server

A small Express server that fetches currency exchange rates and exposes two simple APIs to list available currencies and convert amounts between currencies.

## Features

- Fetches exchange rates from an external source (utility module).
- Exposes two endpoints under the `/exchange` path:
	- `GET /exchange/currencies` — returns the list of available currency codes.
	- `GET /exchange/convert` — converts an amount from one currency to another.
- Basic router-level logging for incoming requests and request validation middleware for `/convert`.

## Supported APIs

1) List available currencies

	- Endpoint: `GET /exchange/currencies`
	- Response: 200 OK with JSON array of currency codes (e.g. `["USD","EUR", ...]`).

2) Convert currency

	- Endpoint: `GET /exchange/convert`
	- Query parameters (all required):
		- `value` — numeric amount to convert (must be non-negative)
		- `currency` — 3-letter source currency code (e.g. `USD`)
		- `to_currency` — 3-letter target currency code (e.g. `EUR`)
	- Validation: requests with missing/invalid parameters return `400 Bad Request` with an `errors` array explaining the problem.
	- Successful response: `200 OK` with a JSON body containing `{ from, to, originalAmount, convertedAmount }`.

Example:

```
GET /exchange/convert?value=10&currency=USD&to_currency=EUR

Response 200:
{
	"from": "USD",
	"to": "EUR",
	"originalAmount": "10",
	"convertedAmount": "9.21"
}
```

## Install & Run

This project uses pnpm as package manager by default (see `package.json`). You can use npm if you prefer.

1) Install dependencies

```bash
pnpm install
# or
npm install
```

2) Start the server

```bash
# using the project start script (nodemon)
pnpm start
# or
npm run start

# or run directly with node
node index.js
```

The server listens on port `8090` by default. Endpoints are mounted under `/exchange` (for example `http://localhost:8090/exchange/currencies`).

## Notes

- Validation for `/exchange/convert` is implemented in `Middleware/validateConvert.js`.
- Router-level logs are printed to the console by `Routes/exchange.js`.
- For production use, consider adding proper error logging, rate limiting, caching, and using a robust schema validator (e.g. Joi or Zod).

The server listens on port `8090` by default and binds to `127.0.0.1` by default.

You can customize the host, port and the base path where exchange routes are mounted using a `.env` file (the project includes `.env.example`). The following environment variables are supported:

- `HOST` — IP address or hostname the server should bind to (default: `127.0.0.1`). Use `0.0.0.0` to listen on all interfaces.
- `PORT` — port number the server listens on (default: `8090`).

Example `.env` (copy from `.env.example`):

```
HOST=0.0.0.0
PORT=8090
```
## License
