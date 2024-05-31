# Hotel Booking System

A backend application for hotel booking system where guests can create bookings and will be assigned to
appropriate rooms. Guests can register, login, logout, create a booking and so much more.

## Features

- Guests can perform basic authentication which include registration, login, logout, refresh access token.
- Guests, when only logged in, can create a new booking, get a booking or update a booking.
- Guests can get their account information only when logged in.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Typescript**: JavaScript with syntax for types.
- **Express**: Web framework for Node.js.
- **PostgreSQL**: SQL database.
- **Prisma**: ORM for managing database operations.
- **Docker**: Open-source software for deploying and running of containerized applications.
- **Redis**: NoSQL database management software.

## Prerequisites

- [Node.js](https://nodejs.org) (at least version 20.14.0)
- [pnpm](https://pnpm.io) (version 9.x)
- [Docker](https://docker.com)

## Installation

1.  Clone the repository
    ```sh
    git clone https://github.com/maliByatzes/hotel-booking-system
    cd hotel-booking-system
    ```

2.  Install the dependencies
    ```sh
    pnpm install
    ```

## Configuration

1.  Create a .env file int project's root directory and add all the requred environment
    variables, also you can change the values to your liking:
    ```env
    PORT=8000
    NODE_ENV=development
    DATABASE_URL="postgresql://admin:secret@localhost:5432/hoteldb?schema=public"
    POSTGRES_HOST=127.0.0.1
    POSTGRES_PORT=5432
    POSTGRES_USER=admin
    POSTGRES_PASSWORD=secret
    POSTGRES_DB=hoteldb
    TOKEN_SECRET_KEY=767e0ea4725fade20882c396f503f5ec1fb12fea94f6af92e300504aaf3c053fbda4cc6942a02b25db1a667bd7992c9637fd7e29aa304569d73cf13f57f9cbe1
    ```

2.  Create postgres and redis containers by running:
    ```sh
    make docker-up
    ```

3.  Run migrations:
    ```sh
    npx prisma migrate dev
    ```

4.  Run seed script to populate the database with data:
    ```sh
    npx prisma db seed
    ```

## Usage

1.  Run the application
    ```sh
    make server
    ```

2.  To view PostgreSQL database you can use any client, but I made us of [pgcli](https://pgcli.com).
    Follow the installation instructions on their website. You can use the tool like this:
    ```sh
    pgcli -h localhost -p 5432 -U admin -d hoteldb
    # When prompted for password use "secret"
    ```

The server should be running on `http://localhost:8000`.

## API Endpoints

### Authentication
- **POST**: `/api/v1/auth/register` - Register a new guest.
- **POST**: `/api/v1/auth/login` - Login a guest.
- **GET**: `/api/v1/refresh` - Refresh access token.
- **GET**: `/api/v1/logout` - Logout a guest

### Guest
- **GET**: `/api/v1/guest/me` - Get logged in guest's information.

### Booking
- **POST**: `/api/v1/booking/new` - Create a new booking.
- **GET**: `/api/v1/booking/:bookingId` - Get one booking by id.
- **PATCH**: `/api/v1/booking/:bookingId` - Update one booking.

### Example requests to added here

## Testing

UNDER DEVELOPMENT

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

maliByatzes - malib2027@gmail.com

Project Link - https://github.com/maliByatzes/hotel-booking-system
