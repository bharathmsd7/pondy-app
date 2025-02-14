import { type NextConfig } from 'next';
import withPWA from '@ducanh2912/next-pwa';

const config: NextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

const pwaConfig = withPWA({
    dest: 'public',
});

export default pwaConfig(config);
