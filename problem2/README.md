# Currency Swap Application

This project is a React-based web application that allows users to simulate swapping between different cryptocurrencies. It uses real-time price data to calculate exchange rates and estimate swap amounts.

## Features

- Select from a list of cryptocurrencies to swap from and to
- Real-time calculation of estimated swap amounts
- Responsive design that works on desktop and mobile devices
- Integration with live price data from an external API

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Query for data fetching

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository
2. Navigate to the 'Problem2' folder
2. Install dependencies:
npm install
3. Start the development server:
npm run dev
4. Open your browser and visit `http://localhost:5173` to view the application.

![image](https://github.com/user-attachments/assets/94f31d5c-986c-4507-9238-af16329f06fd)


## Usage

1. Select the currency you want to swap from in the "From" dropdown.
2. Enter the amount you want to swap in the "Amount to send" field.
3. Select the currency you want to swap to in the "To" dropdown.
4. The estimated amount you will receive will be calculated automatically.

## API Reference

This application uses the following API endpoint for price data:
- `https://interview.switcheo.com/prices.json`

This application uses the following repository for currency logos:
- `https://github.com/Switcheo/token-icons/tree/main/tokens`
