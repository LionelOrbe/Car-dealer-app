module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 'off', // No es necesario importar React en Next.js
    'react/prop-types': 'off', // No necesitamos PropTypes en un proyecto TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Permite inferir tipos de retorno
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Advierte sobre variables no utilizadas
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Advierte sobre console.log, pero permite warn y error
    'jsx-a11y/anchor-is-valid': [ // Reglas específicas para Next.js Link
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/no-unescaped-entities': 'off', // Permite el uso de comillas en JSX sin escapar
    'react-hooks/rules-of-hooks': 'error', // Verifica las reglas de los Hooks
    'react-hooks/exhaustive-deps': 'warn', // Advierte sobre dependencias faltantes en useEffect
  },
  settings: {
    react: {
      version: 'detect', // Detecta automáticamente la versión de React
    },
  },
};

