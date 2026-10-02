import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: 'http://localhost:3100' },
  webServer: {
    command: 'npm run build && npm run start -- -p 3100',
    url: 'http://localhost:3100',
    reuseExistingServer: true,
    timeout: 300_000,
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        // 預設的軟體算繪跑全視窗 WebGL 會拖垮頁面，桌機改用 GPU
        launchOptions: { args: ['--use-angle=metal', '--enable-gpu'] },
      },
    },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
})
