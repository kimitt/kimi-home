import "./Window.css";

/**
 * 창 프레임 컴포넌트. 모든 콘텐츠 카드의 껍데기입니다.
 * @param {string} title    타이틀바에 표시할 텍스트 (예: "profile.html")
 * @param {boolean} quiet   true면 옅은 파랑 타이틀바 (기본은 코발트)
 */
export default function Window({ title, quiet = false, children }) {
  return (
    <section className="win">
      <div className={quiet ? "win-bar quiet" : "win-bar"}>
        {title}
        <span className="win-controls" aria-hidden="true">
          <span>─</span>
          <span>□</span>
          <span>×</span>
        </span>
      </div>
      <div className="win-body">{children}</div>
    </section>
  );
}
