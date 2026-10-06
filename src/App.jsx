// ─────────────────────────────────────────
// 라우팅: window.location.hash 기반 (라이브러리 없음)
//
//   #/ 또는 해시 없음      → home
//   #/daily                → daily
//   #/notes                → notes
//   #/notes/{slug}         → 해당 글 상세 (view: "post")
//                            slug 는 notePosts 의 slug 와 매칭하고 decodeURIComponent 처리.
//                            없는 slug 면 notes 목록으로 떨어진다.
//   #/about                → about
//   그 외                  → home
//
// UTM은 해시 앞에 붙인다: /kimi-home/?utm_source=threads#/notes/슬러그
// ─────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import AddressBar from "./components/AddressBar";
import Profile from "./components/Profile";
import DiaryCard from "./components/DiaryCard";
import PostList from "./components/PostList";
import PostView from "./components/PostView";
import Footer from "./components/Footer";
import { dailyPosts, notePosts } from "./lib/content";

/** 현재 해시를 읽어 { view, selected } 로 바꾼다. */
function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [head, ...rest] = raw.split("/");

  if (head === "daily") return { view: "daily", selected: null };
  if (head === "about") return { view: "about", selected: null };
  if (head === "notes") {
    const slugPart = rest.join("/");
    if (!slugPart) return { view: "notes", selected: null };
    let slug = slugPart;
    try {
      slug = decodeURIComponent(slugPart);
    } catch {
      // 잘못 인코딩된 주소면 원문 그대로 매칭해 본다.
    }
    const post = notePosts.find((p) => p.slug === slug);
    return post ? { view: "post", selected: post } : { view: "notes", selected: null };
  }
  return { view: "home", selected: null };
}

/** 화면 전환 1건을 GA 로 보낸다. gtag 가 없으면 아무것도 안 한다. */
function sendRouteEvent({ view, selected }) {
  if (!window.gtag) return;
  if (view === "post" && selected) {
    window.gtag("event", "post_view", {
      post_slug: selected.slug,
      post_title: selected.title,
    });
  } else {
    window.gtag("event", "view_change", { view_name: view });
  }
}

export default function App() {
  const [route, setRoute] = useState(parseHash);
  const [dailyCount, setDailyCount] = useState(5);
  const didSendFirst = useRef(false);

  useEffect(() => {
    // 공유 링크로 글 상세에 바로 들어온 경우에도 첫 로드 1회는 보낸다.
    if (!didSendFirst.current) {
      didSendFirst.current = true;
      sendRouteEvent(parseHash());
    }

    const onHashChange = () => {
      const next = parseHash();
      setRoute(next);
      window.scrollTo(0, 0);
      sendRouteEvent(next);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const { view, selected } = route;

  const navigate = (v) => {
    window.location.hash = v === "home" ? "#/" : `#/${v}`;
  };
  const openPost = (post) => {
    window.location.hash = `#/notes/${encodeURIComponent(post.slug)}`;
  };

  return (
    <div className="wrap">
      <AddressBar view={view} onNavigate={navigate} />

      {view === "home" && (
        <>
          <Profile />
          {dailyPosts[0] && <DiaryCard post={dailyPosts[0]} />}
          <PostList title="notes / 일하며 배운 것" posts={notePosts.slice(0, 5)} onSelect={openPost} />
        </>
      )}

      {view === "daily" && (
        <>
          {dailyPosts.slice(0, dailyCount).map((p) => <DiaryCard key={p.slug} post={p} />)}
          {dailyCount < dailyPosts.length && (
          <button type="button" className="chip" onClick={() => setDailyCount(dailyCount + 5)}>
          더보기 ({dailyPosts.length - dailyCount}개 남음)
          </button>
          )}
        </>
      )}
      {view === "notes" && (
        <PostList title="notes / 전체 글" posts={notePosts} onSelect={openPost} />
      )}

      {view === "post" && selected && (
        <PostView post={selected} onBack={() => navigate("notes")} />
      )}

      {view === "about" && <Profile />}

      <Footer />
    </div>
  );
}
