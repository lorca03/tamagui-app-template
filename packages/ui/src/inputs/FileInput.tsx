// Wrapper para resolver correctamente los archivos específicos de plataforma
// En web (Next.js), exportamos desde .web.tsx
// En native (Expo/Metro), Metro resolverá automáticamente .native.tsx
export * from './FileInput.web'
