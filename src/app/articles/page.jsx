import { getArticles } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";

// Pulls the latest posts from Medium; the page refreshes itself at most once an hour.
export const revalidate = 3600;

export const metadata = {
  title: "Articles | KodeinKGP",
  description: "Articles and engineering guides written by KodeinKGP members.",
};

export default async function ArticlesPage() {
  const data = await getArticles();
  return <ArticlesClient data={data} />;
}
