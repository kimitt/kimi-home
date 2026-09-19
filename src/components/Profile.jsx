import Window from "./Window";
import "./Profile.css";

/** 프로필 창. 소개 문구와 링크는 여기서 직접 수정. */
export default function Profile() {
  return (
    <Window title="profile.html">
      <h1 className="hero-title">
        만들고 실험하는 사람
        <svg className="ring" viewBox="0 0 260 70" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M18 38 C 10 12, 120 4, 200 10 C 255 15, 252 50, 190 60 C 110 71, 20 64, 14 44"
            fill="none"
            stroke="var(--tangerine)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </h1>
      <p className="hero-sub">
        데이터로 랜딩을 만들던 기획자에서 지금은 글로벌 시딩을 배우는 중.
        <br />
        일하며 배운 것과 그 사이의 일상을 기록합니다.
      </p>
      <div className="hero-links">
        <a className="chip" href="https://github.com/USERNAME" target="_blank" rel="noreferrer">GitHub</a>
        <a className="chip" href="https://www.threads.net/@USERNAME" target="_blank" rel="noreferrer">Threads</a>
        <a className="chip" href="https://github.com/USERNAME/brand-research-archive" target="_blank" rel="noreferrer">Brand Archive</a>
      </div>
    </Window>
  );
}
