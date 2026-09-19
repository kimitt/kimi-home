import Window from "./Window";
import "./DiaryCard.css";

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d)) return dateStr;
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}요일`;
}

/**
 * 일상 기록 카드: 손글씨 날짜 + 사진(선택) + 짧은 글.
 * 사진은 public/photos/ 에 넣고 프론트매터에 photo: /photos/파일명 으로 지정.
 * 낙서를 얹은 사진(폰 마크업으로 그린 것)을 그대로 올리는 걸 권장.
 */
export default function DiaryCard({ post }) {
  return (
    <Window title={`daily / ${post.title}`} quiet>
      <p className="hand diary-date">{formatDate(post.date)}</p>
      {post.photo && (
        <>
          <img className="diary-photo" src={post.photo} alt={post.caption || post.title} />
          {post.caption && <p className="hand diary-cap">↑ {post.caption}</p>}
        </>
      )}
      {!post.photo && post.caption && (
        <p className="hand diary-cap diary-cap-empty">{post.caption}</p>
      )}
      <div className="diary-text" dangerouslySetInnerHTML={{ __html: post.html }} />
    </Window>
  );
}
