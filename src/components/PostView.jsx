import { useEffect, useRef } from "react";
import Window from "./Window";
import "./PostView.css";

/** 클립보드 복사 (구형 브라우저 폴백 포함) */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

/** 글 상세 페이지 */
export default function PostView({ post, onBack }) {
  const bodyRef = useRef(null);

  // 마크다운 렌더 후: 코드 블록에 복사 버튼, 표에 가로 스크롤 래퍼 추가
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    body.querySelectorAll("pre").forEach((pre, i) => {
      if (pre.parentNode.classList.contains("code-wrap")) return; // 개발 모드 이중 실행 방지
      const wrap = document.createElement("div");
      wrap.className = "code-wrap";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "복사";
      btn.addEventListener("click", async () => {
        const ok = await copyText(pre.innerText.replace(/\n$/, ""));
        btn.textContent = ok ? "복사됨!" : "다시 시도";
        setTimeout(() => { btn.textContent = "복사"; }, 1500);
        if (ok && window.gtag) {
          window.gtag("event", "code_copy", { post_slug: post.slug, block_index: i });
        }
      });
      wrap.appendChild(btn);
    });

    body.querySelectorAll("table").forEach((table) => {
      if (table.parentNode.classList.contains("table-wrap")) return;
      const wrap = document.createElement("div");
      wrap.className = "table-wrap";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }, [post]);

  return (
    <Window title={`notes / ${post.title}`} quiet>
      <p className="post-meta">
        {post.date}
        {post.tags[0] && <span className="tag" style={{ marginLeft: 8 }}>{post.tags[0]}</span>}
      </p>
      <div
        key={post.slug}
        ref={bodyRef}
        className="post-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <button type="button" className="chip back" onClick={onBack}>← 목록으로</button>
    </Window>
  );
}
