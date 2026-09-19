import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" 로 두면 GitHub Pages 프로젝트 사이트(username.github.io/repo)에서도
// 경로 수정 없이 동작합니다.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
