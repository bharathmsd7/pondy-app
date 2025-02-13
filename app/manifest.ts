import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
    return {
        "name": "Pondy App",
        "short_name": "PondyApp",
        "description": 'Pondicherry Tourism app',
        "start_url": '/',
        "theme_color": "#000000",
        "background_color": "#ffffff",
        "display": "standalone",
        "icons": [
          {
            "src": "/icons/web-app-manifest-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/icons/web-app-manifest-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
}