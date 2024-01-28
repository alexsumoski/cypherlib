/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
        domains: ['images.ctfassets.net'],
    },
    extend: {
        keyframes: {
          wave: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-100%)' },
          },
        },
        animation: {
          wave: 'wave 1.5s infinite ease-in-out',
          'wave-delay-200': 'wave 1.5s infinite ease-in-out 200ms',
          'wave-delay-400': 'wave 1.5s infinite ease-in-out 400ms',
        },
    },
}
