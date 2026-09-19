import "./AddressBar.css";

const MENUS = [
  { id: "home", label: "홈" },
  { id: "daily", label: "기록" },
  { id: "notes", label: "노트" },
  { id: "about", label: "소개" },
];

/** 상단 주소창 + 내비게이션 */
export default function AddressBar({ view, onNavigate }) {
  return (
    <div className="addressbar">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1.5 7h11M7 1.5c-2 2-2 9 0 11M7 1.5c2 2 2 9 0 11" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="url">kimi.home</span>
      <nav>
        {MENUS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={view === m.id ? "here" : ""}
            onClick={() => onNavigate(m.id)}
          >
            {m.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
