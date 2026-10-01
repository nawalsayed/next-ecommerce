# ShopSphere

ShopSphere is a demo online store for discovering products, brands, and categories, with a locally saved cart and a demo checkout.

## Features

- Home page with featured products, categories, and brands
- Product, brand, and category listings
- Product details with an image gallery
- Shopping cart saved in the browser
- Demo checkout with shipping details and Cash on Delivery or demo card selection
- Order confirmation with a demo order summary

## Tech stack

- Next.js 15.5.2 with the App Router
- React 19.1.0 and TypeScript 5
- Tailwind CSS 4
- Radix UI, class-variance-authority, clsx, and tailwind-merge
- Swiper 12 for product image galleries
- lucide-react icons

Product, brand, and category data comes from the RouteMisr e-commerce API.

## Screenshots

Add screenshots to `docs/screenshots/` and update these placeholders:

![ShopSphere home page](docs/screenshots/home.png)

![ShopSphere products page](docs/screenshots/products.png)

![ShopSphere checkout page](docs/screenshots/checkout.png)

## Getting started

### Requirements

- Node.js compatible with Next.js 15
- npm

### Install dependencies

```bash
npm install
```

### Environment variables

No environment variables are required by the current project.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run lint
npm run build
npm start
```

## Demo checkout

Checkout is for demonstration only. No real payment is processed. The demo card fields are used only for client-side format validation and are not stored or sent to a payment service. Demo orders are saved in the browser's local storage.

## Future improvements

- User authentication
- Order history
- Real payment processing
- Saved favorites
