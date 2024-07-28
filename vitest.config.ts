import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: 'frontend/student-placement-platform/src/tests/setup.ts'
    }
})