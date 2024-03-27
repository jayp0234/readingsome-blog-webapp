import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// // Import the necessary plugins
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import nodePolyfills from 'rollup-plugin-node-polyfills';

// export default defineConfig({
//   plugins: [
//     react(),
//     // Add any additional plugins here
//   ],
//   resolve: {
//     alias: {
//       // Define aliases for modules
//     },
//   },
//   build: {
//     rollupOptions: {
//       plugins: [
//         // Polyfill Node.js globals like `process` or `Buffer` and add support for some Node modules
//         nodePolyfills(),
//       ],
//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       // Enable Node.js global polyfills for development mode
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           process: true,
//           buffer: true,
//         }),
//       ],
//     },
//   },
// });