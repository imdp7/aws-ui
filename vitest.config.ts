/// <reference types="vitest" />
import { defineConfig } from 'vite';

// https://vitest.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
});
