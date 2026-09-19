# kimi.home

창 프레임 + 손글씨 컨셉의 개인 홈페이지. 글은 마크다운으로 쌓고, GitHub Pages로 배포한다.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
```

## 구조

```
src/
  styles/tokens.css     색·폰트 토큰 (색 조정은 이 파일만)
  styles/global.css     전역 스타일
  components/           창 단위 컴포넌트 (각자 css 동반)
    Window.jsx          창 프레임 (모든 카드의 껍데기)
    AddressBar.jsx      상단 주소창 + 내비게이션
    Profile.jsx         프로필 창 (소개 문구·링크 수정은 여기)
    DiaryCard.jsx       일상 기록 카드 (사진 + 세 줄)
    PostList.jsx        글 목록 창
    PostView.jsx        글 상세
    Footer.jsx          카운터 푸터
  content/
    daily/*.md          일상 기록 (파일명: YYYY-MM-DD.md)
    notes/*.md          일·아카이브 글
  lib/content.js        마크다운 로더 (프론트매터 파싱)
public/
  photos/               낙서 마크업 완료한 사진
  doodles/              직접 그린 낙서 에셋
```

## 글 쓰는 법

`src/content/notes/2026-10-01-제목.md` 형식으로 파일 추가:

```markdown
---
title: 글 제목
date: 2026-10-01
tags: [glossary]
photo: /photos/파일명.jpg   (선택, daily용)
caption: 사진 설명           (선택)
---

본문은 마크다운 그대로.
```

커밋하고 push하면 1~2분 뒤 사이트에 반영된다.

## 배포 (최초 1회 설정)

1. GitHub에 새 저장소 생성 후 이 폴더를 push
2. 저장소 Settings → Pages → Source 를 **GitHub Actions** 로 변경
3. 이후 main에 push할 때마다 자동 배포 (`.github/workflows/deploy.yml`)
4. 주소: `https://USERNAME.github.io/저장소명/`

## 해야 할 것

- [ ] `src/components/Profile.jsx` 의 링크 3개에서 USERNAME 을 실제 계정으로 교체
- [ ] 직접 그린 낙서 에셋을 `public/doodles/` 에 추가
- [ ] 첫 일상 기록 사진을 `public/photos/` 에 추가

## 동결 규칙 (10/1~)

이 저장소에서 허용되는 것: 마크다운 추가, 치명적 버그 수정.
기능 아이디어는 코드를 열지 말고 `backlog.md` 에 한 줄로 적을 것.
