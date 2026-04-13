# Payment Gateway Integration Library

A TypeScript library for integrating multiple payment gateways into your application.

## Features

- Support for multiple payment gateways
- Type-safe TypeScript implementation
- Easy integration with existing applications
- Modular architecture for easy maintenance

## Structure

The project is organized as follows:

```
├── src/
│   ├── index.ts                 # Main entry point
│   └── payment-gateways/
│       ├── index.ts            # Payment gateway registry
│       ├── pay0Pg.ts           # Payment gateway implementation
│       ├── tranzupiPg.ts       # Tranzupi payment gateway
│       ├── zapupiPg.ts         # Zapupi payment gateway
│       └── zenupiPg.ts         # Zenupi payment gateway
├── package.json                # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── vitest.config.ts           # Test configuration
└── README.md                  # This file
```

## Payment Gateways Supported

1. **Pay0** (pay0Pg.ts) - Primary payment gateway
2. **Tranzupi** (tranzupiPg.ts) - Tranzupi payment integration
3. **Zapupi** (zapupiPg.ts) - Zapupi payment integration
4. **Zenupi** (zenupiPg.ts) - Zenupi payment integration

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Import the payment gateway:

   ```typescript
   import { PaymentGateway } from "./src"
   ```

3. Configure and use your preferred payment gateway.

## Development

This project uses:

- **TypeScript** for type-safe development
- **Vitest** for testing
- **tsup** for building

## Testing

Run tests using:

```bash
npm test
```

## License

MIT License - Feel free to use and modify.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For more information, see the [`dev.md`](dev.md) file.
