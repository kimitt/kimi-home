import Window from "./Window";
import "./PostView.css";

/** 글 상세 페이지 */
export default function PostView({ post, onBack }) {
  return (
    <Window title={`notes / ${post.title}`} quiet>
      <p className="post-meta">
        {post.date}
        {post.tags[0] && <span className="tag" style={{ marginLeft: 8 }}>{post.tags[0]}</span>}
      </p>
      <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
      <button type="button" className="chip back" onClick={onBack}>← 목록으로</button>
    </Window>
  );
}
