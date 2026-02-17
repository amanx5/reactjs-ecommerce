import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	build: {
		outDir: path.resolve('../server/uiBuild'),
	},

	plugins: [react()],

	// server: {
	//  // add proxy to prevent CORS error and also forward "/api" and "/images" requests to backend server
	//   proxy: { // not needed now as backend server itself is serving UI
	//     '/api': {
	//       target: 'http://localhost:3000'
	//     },
	//     '/images': {
	//       target: 'http://localhost:3000'
	//     },
	//   }
	// },

  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
})
