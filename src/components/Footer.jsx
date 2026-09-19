import "./Footer.css";

/** 푸터: 미니홈피 카운터 감성. 실제 카운터 연동은 backlog. */
export default function Footer() {
  return (
    <footer className="site-footer">
      <svg className="squig" viewBox="0 0 120 14" aria-hidden="true">
        <path
          d="M4 8 q10 -8 20 0 q10 8 20 0 q10 -8 20 0 q10 8 20 0 q10 -8 20 0"
          fill="none"
          stroke="var(--marker)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div className="counter">
        TODAY <b>3</b> · TOTAL <b>128</b>
      </div>
      <p>방명록과 BGM은 backlog에 있습니다 · since 2026</p>
    </footer>
  );
}
