const { normalizeText } = require('./index');

describe('Text Normalizer', () => {
  describe('Generic Normalization', () => {
    test('should convert text to lowercase', () => {
      expect(normalizeText('HELLO WORLD')).toBe('hello world');
      expect(normalizeText('Hello World')).toBe('hello world');
    });

    test('should normalize punctuation marks', () => {
      expect(normalizeText('Hello... World!!!')).toBe('hello world');
      expect(normalizeText('Hello«World»')).toBe('hello world');
      expect(normalizeText('Hello(World)')).toBe('hello world');
      expect(normalizeText('Hello[World]')).toBe('hello world');
      expect(normalizeText('Hello-World')).toBe('hello world');
      expect(normalizeText('Hello:World?')).toBe('hello world');
      expect(normalizeText('¡Hello¿World')).toBe('hello world');
    });

    test('should normalize multiple spaces', () => {
      expect(normalizeText('Hello    World')).toBe('hello world');
      expect(normalizeText('  Hello  World  ')).toBe('hello world');
    });

    test('should handle empty and null inputs', () => {
      expect(normalizeText('')).toBe('');
      expect(normalizeText(null)).toBe(null);
      expect(normalizeText(undefined)).toBe(undefined);
      expect(normalizeText(123)).toBe(123);
    });
  });

  describe('Arabic Normalization', () => {
    test('should remove Arabic diacritics (Tashkeel)', () => {
      expect(normalizeText('مَرْحَباً', 'ar')).toBe('مرحبا');
      expect(normalizeText('الْحَمْدُ لِلَّهِ', 'ar')).toBe('الحمد لله');
    });

    test('should normalize different forms of Alef', () => {
      expect(normalizeText('آمن', 'ar')).toBe('امن');
      expect(normalizeText('أحمد', 'ar')).toBe('احمد');
      expect(normalizeText('إبراهيم', 'ar')).toBe('ابراهيم');
      expect(normalizeText('اسم', 'ar')).toBe('اسم');
      expect(normalizeText('ٱلله', 'ar')).toBe('الله');
    });

    test('should normalize different forms of Yeh', () => {
      expect(normalizeText('يوم', 'ar')).toBe('يوم');
      expect(normalizeText('على', 'ar')).toBe('علي');
      expect(normalizeText('شيء', 'ar')).toBe('شيء');
    });

    test('should normalize Waw with Hamza', () => {
      expect(normalizeText('مؤمن', 'ar')).toBe('مومن');
    });

    test('should remove Tatweel (elongation)', () => {
      expect(normalizeText('الرحمـــــان', 'ar')).toBe('الرحمان');
    });

    test('should normalize Arabic punctuation', () => {
      expect(normalizeText('السلام، عليكم؛ ورحمة الله؟', 'ar')).toBe('السلام عليكم ورحمة الله');
    });
  });

  describe('Hebrew Normalization', () => {
    test('should remove Hebrew vowel points (Nikud)', () => {
      expect(normalizeText('שָׁלוֹם', 'he')).toBe('שלומ');
      expect(normalizeText('עוֹלָם', 'he')).toBe('עולם');
    });

    test('should handle בן־אדם specifically', () => {
      expect(normalizeText('בן־אדם', 'he')).toBe('בנאדמ');
    });

    test('should remove cantillation marks', () => {
      expect(normalizeText('בְּרֵאשִׁ֖ית', 'he')).toBe('בראשית');
    });

    test('should normalize final letters', () => {
      expect(normalizeText('מלך', 'he')).toBe('מלכ');
      expect(normalizeText('שלום', 'he')).toBe('שלומ');
      expect(normalizeText('רוח', 'he')).toBe('רוח');
      expect(normalizeText('יוסף', 'he')).toBe('יוספ');
      expect(normalizeText('ארץ', 'he')).toBe('ארצ');
    });

    test('should handle Maqqef (Hebrew hyphen)', () => {
      expect(normalizeText('אל־מול', 'he')).toBe('אל מול');
    });

    test('should normalize Hebrew punctuation', () => {
      expect(normalizeText('שלום׃ עליכם׀', 'he')).toBe('שלומ עליכם');
    });
  });

  describe('Greek Normalization', () => {
    test('should convert to lowercase', () => {
      expect(normalizeText('ΚΟΣΜΟΣ', 'el')).toBe('κοσμοσ');
    });

    test('should remove accents and breathing marks', () => {
      expect(normalizeText('Γεῖα σου κόσμε', 'el')).toBe('γεια σου κοσμε');
      expect(normalizeText('ἀγάπη', 'el')).toBe('αγαπη');
      expect(normalizeText('εἰρήνη', 'el')).toBe('ειρηνη');
    });

    test('should normalize final sigma', () => {
      expect(normalizeText('κόσμος', 'el')).toBe('κοσμοσ');
      expect(normalizeText('λόγος', 'el')).toBe('λογοσ');
    });

    test('should normalize Greek punctuation', () => {
      expect(normalizeText('Γεια σου· κόσμε;', 'el')).toBe('γεια σου κοσμε');
    });
  });

  describe('Latin Normalization', () => {
    test('should normalize accented characters', () => {
      expect(normalizeText('café', 'la')).toBe('cafe');
      expect(normalizeText('résumé', 'la')).toBe('resume');
      expect(normalizeText('naïve', 'la')).toBe('naive');
      expect(normalizeText('piñata', 'la')).toBe('pinata');
    });

    test('should handle uppercase accented characters', () => {
      expect(normalizeText('CAFÉ', 'la')).toBe('cafe');
      expect(normalizeText('RÉSUMÉ', 'la')).toBe('resume');
    });

    test('should normalize various Latin diacritics', () => {
      expect(normalizeText('àáâãäå', 'la')).toBe('aaaaaa');
      expect(normalizeText('èéêë', 'la')).toBe('eeee');
      expect(normalizeText('ìíîï', 'la')).toBe('iiii');
      expect(normalizeText('òóôõöø', 'la')).toBe('oooooo');
      expect(normalizeText('ùúûü', 'la')).toBe('uuuu');
    });

    test('should handle special characters', () => {
      expect(normalizeText('ç', 'la')).toBe('c');
      expect(normalizeText('Ç', 'la')).toBe('c');
      expect(normalizeText('ñ', 'la')).toBe('n');
      expect(normalizeText('Ñ', 'la')).toBe('n');
    });
  });

  describe('Syriac Normalization', () => {
    test('should remove Syriac vowel points', () => {
      expect(normalizeText('ܫܠܵܡܵܐ', 'sy')).toBe('ܫܠܡܐ');
    });

    test('should remove Syriac punctuation and marks', () => {
      expect(normalizeText('ܫܠܡܐ܀ ܥܠܡܐ܁', 'sy')).toBe('ܫܠܡܐ ܥܠܡܐ');
    });

    test('should normalize Syriac text completely', () => {
      const syriacText = 'ܫܠܵܡܵܐ܀ ܥܵܠܡܵܐ܁';
      expect(normalizeText(syriacText, 'sy')).toBe('ܫܠܡܐ ܥܠܡܐ');
    });
  });

  describe('Language Detection and Fallback', () => {
    test('should use generic normalization for unknown languages', () => {
      expect(normalizeText('Hello World', 'unknown')).toBe('hello world');
      expect(normalizeText('HELLO WORLD', 'fr')).toBe('hello world');
    });

    test('should apply generic normalization after language-specific normalization', () => {
      expect(normalizeText('مَرْحَباً... بِالعَالَم!!!', 'ar')).toBe('مرحبا بالعالم');
      expect(normalizeText('שָׁלוֹם... עוֹלָם!!!', 'he')).toBe('שלומ עולם');
    });

    test('should handle mixed scripts with generic normalization', () => {
      const mixedText = 'Hello مرحبا שלום';
      expect(normalizeText(mixedText)).toBe('hello مرحبا שלום');
    });
  });

  describe('Edge Cases', () => {
    test('should handle whitespace-only strings', () => {
      expect(normalizeText('   ', 'ar')).toBe('');
      expect(normalizeText('\t\n', 'he')).toBe('');
    });

    test('should handle strings with only punctuation', () => {
      expect(normalizeText('...!!!', 'ar')).toBe('');
      expect(normalizeText('،؛؟', 'ar')).toBe('');
    });

    test('should handle very long strings', () => {
      const longText = 'Hello World '.repeat(1000);
      const normalized = normalizeText(longText);
      expect(normalized).toBe('hello world '.repeat(1000).trim());
    });

    test('should handle strings with only diacritics', () => {
      expect(normalizeText('َُِّْ', 'ar')).toBe('');
      expect(normalizeText('ֵֶַָֹֻ', 'he')).toBe('');
    });
  });

  describe('Performance and Consistency', () => {
    test('should be consistent across multiple calls', () => {
      const text = 'مَرْحَباً بِالعَالَم';
      const result1 = normalizeText(text, 'ar');
      const result2 = normalizeText(text, 'ar');
      expect(result1).toBe(result2);
    });

    test('should handle empty language parameter gracefully', () => {
      expect(normalizeText('Hello World', '')).toBe('hello world');
      expect(normalizeText('Hello World', null)).toBe('hello world');
    });
  });
});
