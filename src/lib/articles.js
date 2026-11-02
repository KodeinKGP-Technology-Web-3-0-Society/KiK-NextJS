import staticArticles from "../data/articles/articles-list.json";

const FEED_URL = "https://medium.com/feed/@kodeinkgp";

// Medium post id = the trailing hex chunk of the URL slug (used to match feed items to saved ones).
const postId = (url = "") =>
  (url.split("?")[0].match(/([0-9a-f]{10,12})$/) || [])[1] || url.split("?")[0];

const decode = (s = "") =>
  s
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .trim();

const tag = (xml, name) =>
  (xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)) || [])[1];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const formatDate = (s) => {
  const d = new Date(s);
  return isNaN(d)
    ? s
    : `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};

function guessCategories(title, tags) {
  const t = `${title} ${tags.join(" ")}`.toLowerCase();
  if (
    /blockchain|web3|solidity|smart contract|consensus|ethereum|crypto|defi/.test(
      t
    )
  )
    return ["Blockchain", "Web3"];
  return ["AI", "ML"];
}

function parseFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => {
    const title = decode(tag(it, "title"));
    const link = decode(tag(it, "link")).split("?")[0];
    const html = decode(tag(it, "content:encoded") || "");
    const tags = [...it.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(
      (m) => decode(m[1])
    );
    const img = (html.match(/<img[^>]+src="([^"]+)"/) || [])[1] || "";
    // first real paragraph as the summary
    const para = (html.match(/<p>([\s\S]*?)<\/p>/g) || [])
      .map((p) => decode(p.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " "))
      .find((p) => p.length > 60);
    return {
      title,
      pubDate: formatDate(decode(tag(it, "pubDate"))),
      link,
      img,
      categories: guessCategories(title, tags),
      description: para
        ? para.length > 200
          ? para.slice(0, 197).trimEnd() + "…"
          : para
        : "",
    };
  });
}

/**
 * Latest articles: live from Medium (refreshed hourly), merged with the saved list.
 * Saved entries keep their curated image/categories/description; anything new on Medium
 * is added at the top automatically. If Medium can't be reached, the saved list is used.
 */
export async function getArticles() {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; KodeinKGP-site)" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Medium feed ${res.status}`);
    const live = parseFeed(await res.text());
    if (!live.length) throw new Error("Medium feed empty");

    const saved = new Map(staticArticles.map((a) => [postId(a.link), a]));
    const liveIds = new Set(live.map((a) => postId(a.link)));

    const merged = live.map((a) => {
      const s = saved.get(postId(a.link));
      return s
        ? {
            ...a,
            img: s.img,
            categories: s.categories,
            description: s.description,
            title: s.title,
          }
        : a;
    });
    // older posts that have dropped out of the 10-item feed
    staticArticles.forEach((a) => {
      if (!liveIds.has(postId(a.link))) merged.push(a);
    });
    return merged;
  } catch (err) {
    console.warn("[articles] using saved list:", err.message);
    return staticArticles;
  }
}
