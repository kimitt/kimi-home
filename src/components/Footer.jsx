import { useEffect, useState } from "react";
import "./Footer.css";

const GC = "https://kimihome.goatcounter.com/counter";

/** 푸터: 미니홈피 카운터. GoatCounter 방문자 수 연동. */
export default function Footer() {
  const [today, setToday] = useState("-");
  const [total, setTotal] = useState("-");

  useEffect(() => {
    const d = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
    fetch(`${GC}/TOTAL.json?start=${d}`)
      .then((r) => r.json()).then((j) => setToday(j.count)).catch(() => {});
    fetch(`${GC}/TOTAL.json`)
      .then((r) => r.json()).then((j) => setTotal(j.count)).catch(() => {});
  }, []);

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
        TODAY <b>{today}</b> · TOTAL <b>{total}</b>
      </div>
      <p>방명록과 BGM은 backlog에 있습니다 · since 2026</p>
    </footer>
  );
}