import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `
      $primary-color: #0070f3;
      $secondary-color: #ff6347;
      $font-primary: 'Arial', sans-serif;
      $font-secondary: 'Georgia', serif;
      $base-font-size: 16px;
    `,
  },
};

export default nextConfig;
