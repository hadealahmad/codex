import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { ThemeProvider } from "next-themes";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}');

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = pages[`./Pages/${name}.jsx`] || pages[`./Pages/${name}.tsx`];
        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }
        return page();
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <App {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
