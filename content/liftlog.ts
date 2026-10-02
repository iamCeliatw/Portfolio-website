import type { Localized } from './types'

export const liftlog = {
  demoUrl: 'https://fitness-tracker-mu-umber.vercel.app/',
  repoUrl: 'https://github.com/iamCeliatw/fitness-tracker',
  tagline: { zh: '把每一組訓練，都變成看得見的進步。', en: 'Turn every set into progress you can see.' } as Localized,
  intro: {
    zh: '重訓記錄、飲食追蹤、體重趨勢、教練預約，一個涵蓋學員、教練、管理員三種角色的全端健身平台。',
    en: 'Workout logs, nutrition, weight trends and coach bookings: a full-stack fitness platform for members, coaches and gym owners.',
  } as Localized,
  stats: [
    { value: '5', label: { zh: '週開發', en: 'weeks to build' } },
    { value: '106', label: { zh: '個 commit', en: 'commits' } },
    { value: '34', label: { zh: '份功能規格', en: 'feature specs' } },
    { value: '21', label: { zh: '支 E2E 測試', en: 'E2E specs' } },
    { value: '3', label: { zh: '種語言', en: 'languages' } },
  ] as { value: string; label: Localized }[],
  roles: [
    {
      name: { zh: '學員', en: 'Member' },
      items: [
        { zh: '重訓記錄：動作、組數、重量、次數', en: 'Workout log: exercises, sets, weight, reps' },
        { zh: '飲食追蹤：每日熱量與蛋白質', en: 'Nutrition: daily calories and protein' },
        { zh: '體重、體脂、肌肉量趨勢圖', en: 'Weight, body fat and muscle trends' },
        { zh: '預約教練開放的時段', en: 'Book open coaching slots' },
      ],
    },
    {
      name: { zh: '教練', en: 'Coach' },
      items: [
        { zh: '學員本週訓練與飲食達標總覽', en: 'Weekly overview of each member' },
        { zh: '單次或每週重複開放時段，重疊自動跳過', en: 'One-off or weekly slots, overlaps skipped automatically' },
        { zh: '前後翻週查看排課與預約', en: 'Browse schedules week by week' },
        { zh: '核准或拒絕預約，逾時自動過期', en: 'Approve or reject bookings, with automatic expiry' },
      ],
    },
    {
      name: { zh: '管理員', en: 'Owner' },
      items: [
        { zh: '註冊即建館，8 碼邀請碼讓成員加入', en: 'Create a gym on sign-up, invite members with an 8-character code' },
        { zh: '調整角色、配對教練與學員', en: 'Change roles and pair coaches with members' },
        { zh: '管理內建動作庫', en: 'Manage the exercise library' },
        { zh: '稽核記錄：誰、何時、改了什麼', en: 'Audit log: who changed what, and when' },
      ],
    },
  ] as { name: Localized; items: Localized[] }[],
  screens: [
    { image: '/works/liftlog/landing.png', caption: { zh: '產品首頁', en: 'Landing page' } },
    { image: '/works/liftlog/member-dashboard.png', caption: { zh: '學員總覽：本週訓練、體重、熱量', en: 'Member dashboard: training, weight, calories' } },
    { image: '/works/liftlog/workout-log.png', caption: { zh: '訓練記錄：動作、組數、重量', en: 'Workout log: exercises, sets, weight' } },
    { image: '/works/liftlog/booking.png', caption: { zh: '課程預約：選擇教練的開放時段', en: 'Booking: pick an open coaching slot' } },
    { image: '/works/liftlog/coach-dashboard.png', caption: { zh: '教練總覽：學員狀態與本週行程', en: 'Coach dashboard: members and this week' } },
    { image: '/works/liftlog/admin-exercises.png', caption: { zh: '管理後台：動作庫管理', en: 'Admin: exercise library' } },
  ] as { image: string; caption: Localized }[],
  highlights: [
    {
      title: { zh: '預約狀態機', en: 'Booking state machine' },
      body: {
        zh: '待審核的過期時間在建立當下就凍結，取「現在加審核時限」和「開課前截止」較早的那個。重新預約會重用已結束的資料列，避開時段唯一性衝突。',
        en: 'A pending booking freezes its expiry at creation: the earlier of "now plus review window" and "class start minus cutoff". Rebooking reuses finished rows to avoid slot uniqueness conflicts.',
      },
    },
    {
      title: { zh: '雙層角色權限', en: 'Two layers of roles' },
      body: {
        zh: '系統層分 USER 與 ADMIN，組織層分 OWNER、ADMIN、COACH、MEMBER。路由由 middleware 保護，每支 API 再各自驗證身分並隔離使用者資料。',
        en: 'System roles USER and ADMIN, gym roles OWNER, ADMIN, COACH and MEMBER. Middleware guards routes, and every API verifies identity and isolates user data on its own.',
      },
    },
    {
      title: { zh: '資料庫 trigger 稽核', en: 'Audit by database trigger' },
      body: {
        zh: '關鍵資料表的新增、修改、刪除，由資料庫 trigger 自動記下內容與操作者，不靠應用程式記得寫 log。',
        en: 'Inserts, updates and deletes on key tables are recorded with their author by database triggers, not by application code remembering to log.',
      },
    },
    {
      title: { zh: 'Prisma 與 Supabase 的分工', en: 'Prisma and Supabase, split by job' },
      body: {
        zh: '開發環境封鎖資料庫連接埠，沒辦法直連。所以 Prisma 只負責 schema 與型別，執行時的查詢全部走 Supabase 的 HTTPS client。',
        en: 'The dev network blocks database ports, so Prisma only owns the schema and types, while every runtime query goes through the Supabase HTTPS client.',
      },
    },
  ] as { title: Localized; body: Localized }[],
  bookingStates: ['CONFIRMED', 'REJECTED', 'EXPIRED', 'CANCELLED'],
  flow: [
    { step: '/opsx:propose', body: { zh: '產出提案、設計、規格與任務', en: 'Draft the proposal, design, specs and tasks' } },
    { step: '/opsx:apply', body: { zh: '照任務實作，逐項打勾', en: 'Implement task by task' } },
    { step: '/opsx:archive', body: { zh: '歸檔變更，把差異同步回主規格', en: 'Archive the change and merge its delta into the specs' } },
  ] as { step: string; body: Localized }[],
  flowNote: {
    zh: '用 OpenSpec 做規格驅動開發，搭配 AI 協作。34 份功能規格都留在 repo 裡，每個設計決策都查得到。',
    en: 'Spec-driven development with OpenSpec and AI pairing. All 34 feature specs live in the repo, so every design decision can be traced.',
  } as Localized,
  demoAccounts: [
    { role: { zh: '學員', en: 'Member' }, email: 'demo-member@example.com' },
    { role: { zh: '教練', en: 'Coach' }, email: 'demo-coach@example.com' },
    { role: { zh: '管理員', en: 'Admin' }, email: 'demo-admin@example.com' },
  ] as { role: Localized; email: string }[],
  demoPassword: 'demo1234',
  stack: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'shadcn/ui', 'Supabase', 'Prisma 7', 'Playwright'],
}
