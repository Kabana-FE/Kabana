import type { Config } from 'tailwindcss';
// 에니메이션을 지금은 쓰진 않는데 나중에 쓸수도 있을거 같아서 우선은 두고 안쓰게되면 이 파일을 삭제할게요.
const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
