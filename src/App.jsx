import { useState } from "react";
import AddressBar from "./components/AddressBar";
import Profile from "./components/Profile";
import DiaryCard from "./components/DiaryCard";
import PostList from "./components/PostList";
import PostView from "./components/PostView";
import Footer from "./components/Footer";
import { dailyPosts, notePosts } from "./lib/content";

export default function App() {
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState(null);
  const [dailyCount, setDailyCount] = useState(5);

  const openPost = (post) => {
    setSelected(post);
    setView("post");
    window.scrollTo(0, 0);
  };
  const navigate = (v) => {
    setSelected(null);
    setView(v);
    window.scrollTo(0, 0);
    if (window.gtag) window.gtag('event', 'view_change', { view_name: v });
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
