import dataJ from "@/data/qna/lab-questions.json";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kodeinkgp.in";

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/compiler`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pds`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pds/lab`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pds/theory`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/teams`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dekodex`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const questionRoutes = [];
  Object.entries(dataJ).forEach(([chapterKey, chapterArray]) => {
    if (Array.isArray(chapterArray)) {
      chapterArray.forEach((ch) => {
        if (ch.type === "lab" && ch.Subtopics) {
          Object.entries(ch.Subtopics).forEach(([subTopicKey, qList]) => {
            if (Array.isArray(qList)) {
              qList.forEach((_, ind) => {
                questionRoutes.push({
                  url: `${baseUrl}/pds/lab/${chapterKey}/${subTopicKey}/${ind}`,
                  lastModified: new Date(),
                  changeFrequency: "monthly",
                  priority: 0.8,
                });
              });
            }
          });
        }
      });
    }
  });

  return [...staticRoutes, ...questionRoutes];
}
