# Search Text Normalizer

Text normalization utilities for different languages to improve search accuracy by normalizing text variations.

## Installation

```bash
npm install search-text-normalizer
```

## Usage

```javascript
const { normalizeText } = require('search-text-normalizer');

// Generic normalization
normalizeText('Hello, World!'); // "hello world"

// Language-specific normalization
normalizeText('مَرْحَباً بِالعَالَم', 'ar'); // "مرحبا بالعالم" (Arabic)
normalizeText('שָׁלוֹם עוֹלָם', 'he'); // "שלומ עולמ" (Hebrew)
normalizeText('Γεῖα σου κόσμε', 'el'); // "γεια σου κοσμε" (Greek)
normalizeText('Café résumé', 'la'); // "cafe resume" (Latin)
normalizeText('ܫܠܵܡܵܐ ܥܵܠܡܵܐ', 'sy'); // "ܫܠܡܐ ܥܠܡܐ" (Syriac)
```

### TypeScript

```typescript
import { normalizeText, SupportedLanguage } from 'search-text-normalizer';

const text: string = normalizeText('Hello, World!');
const arabicText: string = normalizeText('مرحبا', 'ar' as SupportedLanguage);
```

## Supported Languages

- `ar` - Arabic (removes diacritics, normalizes character variants)
- `he` - Hebrew (removes vowel points, normalizes final letters)
- `el` - Greek (removes accents, normalizes sigma)
- `la` - Latin (removes diacritics from accented characters)
- `sy` - Syriac (removes vowel points and punctuation marks)

## Features

- Removes diacritics and vowel points
- Normalizes character variants and punctuation
- Converts to lowercase and trims whitespace
- TypeScript support with full type definitions
- Zero dependencies for production use
- Comprehensive test suite with Jest

## Development

```bash
npm run build         # Generate TypeScript declarations
npm test              # Run tests
npm run test:coverage # Run with coverage
npm run test:watch    # Watch mode
```

## License

MIT
