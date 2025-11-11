import { ExpoConfig, ConfigContext } from 'expo/config';

/**
 * Expo app configuration
 * - Basic app metadata (name, version, icons)
 * - Platform settings (iOS/web)
 * - Plugins (image-picker permissions)
 * - `extra` holds env variables (e.g., IMGBB_API_KEY)
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  // App identity
  name: 'volunteam',
  slug: 'volunteam',
  version: '1.0.0',
  orientation: 'portrait',

  // App icons/splash
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#031A62',
  },

  // OTA updates: 0 = use cached bundle immediately
  updates: {
    fallbackToCacheTimeout: 0,
  },

  // Include all assets in bundle
  assetBundlePatterns: ['**/*'],

  // iOS config
  ios: {
    supportsTablet: true,
  },

  // Web config
  web: {
    favicon: './assets/favicon.png',
  },

  // Plugins and their permissions text (shown to users)
  plugins: [
    [
      'expo-image-picker',
      {
        photosPermission: 'The app accesses your photos to let you add them to events.',
        cameraPermission: 'The app accesses your camera to let you add pictures to events.',
      },
    ],
  ],

  // Extra values available at runtime (read via Constants.expoConfig.extra)
  extra: {
    eas: {
      // EAS project link (used by builds/updates)
      projectId: '954f3b8e-1155-4f8f-8601-a2b3126da39e',
    },
    // Read from environment; do not hardcode secrets here.
    IMGBB_API_KEY: process.env.IMGBB_API_KEY,
  },
});
