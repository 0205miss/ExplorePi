export default function manifest() {
    return {
      name: 'ExplorePi',
      short_name: 'ExplorePi',
      description: 'A novel, improved, and mobile friendly block explorer for the Pi blockchain made by Pioneers for Pioneers. New interface for Pi Blockchain Explore',
      start_url: '/',
      display: 'standalone',
      background_color: '#D6DBDC',
      theme_color: '#0D193E',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        },
      ],
    }
  }