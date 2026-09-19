import Window from "./Window";
import "./PostList.css";

/** 노트 목록 창. onSelect(post)로 글 페이지 이동. */
export default function PostList({ title, posts, onSelect }) {
  return (
    <Window title={title} quiet>
      {posts.length === 0 ? (
        <p className="post-empty">아직 글이 없어요. src/content 에 마크다운을 추가해 보세요.</p>
      ) : (
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <span className="t">
                <a
                  href={`#${p.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect(p);
                  }}
                >
                  {p.title}
                </a>
              </span>
              {p.tags[0] && <span className="tag">{p.tags[0]}</span>}
              <span className="d">{p.date.slice(5).replace("-", ".")}</span>
            </li>
          ))}
        </ul>
      )}
    </Window>
  );
}
