/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@staysphere/domain-types', '@staysphere/ui-kit', '@staysphere/validation-schemas'],
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
