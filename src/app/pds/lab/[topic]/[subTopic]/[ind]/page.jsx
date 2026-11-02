import dataJ from "@/data/qna/lab-questions.json";
import LabQuestion from "@/app/pds/lab/LabQuestion";

function formatName(str) {
  return (str || "")
    .replace(/([a-z])([A-Z0-9])|([A-Z])([0-9])/g, "$1$3 $2$4")
    .replace(/\bAnd\b/g, "and");
}

function getProblem(topic, subTopic, indStr) {
  const ind = parseInt(indStr, 10);
  if (!topic || isNaN(ind)) return null;

  let arr = [];
  if (topic === "labTest") {
    Object.values(dataJ).forEach((chapterArray) => {
      chapterArray.forEach((chapter) => {
        if (chapter.type === "lab" && chapter.Subtopics) {
          Object.values(chapter.Subtopics).forEach((qList) => {
            arr = arr.concat(qList);
          });
        }
      });
    });
  } else {
    const chapterArray = dataJ[topic];
    if (Array.isArray(chapterArray)) {
      const chapter = chapterArray[0];
      const qList = chapter?.Subtopics?.[subTopic];
      if (Array.isArray(qList)) {
        arr = qList;
      }
    }
  }

  const item = arr[ind];
  if (!item) return null;
  return {
    question: item.Question || "",
    solution: item.Answer || "",
    rating: item.rating || "Medium",
    index: ind,
  };
}

export function generateStaticParams() {
  const params = [];
  Object.entries(dataJ).forEach(([chapterKey, chapterArray]) => {
    if (Array.isArray(chapterArray)) {
      chapterArray.forEach((ch) => {
        if (ch.type === "lab" && ch.Subtopics) {
          Object.entries(ch.Subtopics).forEach(([subTopicKey, qList]) => {
            if (Array.isArray(qList)) {
              qList.forEach((_, ind) => {
                params.push({
                  topic: chapterKey,
                  subTopic: subTopicKey,
                  ind: String(ind),
                });
              });
            }
          });
        }
      });
    }
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { topic, subTopic, ind: indStr } = await params;
  const ind = parseInt(indStr, 10);
  const problem = getProblem(topic, subTopic, indStr);

  const formattedTopic = formatName(topic);
  const formattedSubTopic = formatName(subTopic);
  const problemNum = isNaN(ind) ? 1 : ind + 1;

  const rawSnippet = (problem?.question || "")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const snippet = rawSnippet.length > 155 ? `${rawSnippet.slice(0, 155)}…` : rawSnippet;

  const title = `${formattedSubTopic} Problem #${problemNum} – ${formattedTopic} | PDS Lab IIT Kharagpur`;
  const description = snippet
    ? `${snippet} – Solve with verified C code and run in our in-browser WebAssembly compiler.`
    : `Practice CS10001 PDS Lab problem #${problemNum} for ${formattedTopic} (${formattedSubTopic}) at IIT Kharagpur with verified C/C++ solution and compiler.`;

  return {
    title,
    description,
    keywords: [
      "PDS Lab IIT Kharagpur",
      "CS10001",
      "CS11001",
      "C programming question",
      formattedTopic,
      formattedSubTopic,
      `Problem ${problemNum}`,
      "C code solution",
      "online C compiler",
      "KodeinKGP",
      "IIT Kharagpur lab problem",
    ],
    alternates: {
      canonical: `/pds/lab/${topic}/${subTopic}/${indStr}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/pds/lab/${topic}/${subTopic}/${indStr}`,
      siteName: "KodeinKGP",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }) {
  const { topic, subTopic, ind: indStr } = await params;
  const ind = parseInt(indStr, 10);
  const problem = getProblem(topic, subTopic, indStr);

  const formattedTopic = formatName(topic);
  const formattedSubTopic = formatName(subTopic);
  const problemNum = isNaN(ind) ? 1 : ind + 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${formattedSubTopic} Problem #${problemNum}: ${formattedTopic}`,
    description: problem?.question ? problem.question.slice(0, 200).replace(/[\r\n]+/g, " ") : "",
    articleBody: problem?.question || "",
    proficiencyLevel: problem?.rating || "Medium",
    programmingLanguage: "C",
    educationalLevel: "Undergraduate",
    inLanguage: "en",
    isPartOf: {
      "@type": "Course",
      name: "Programming and Data Structures (PDS)",
      courseCode: "CS10001",
      provider: {
        "@type": "CollegeOrUniversity",
        name: "IIT Kharagpur",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "KodeinKGP",
      url: "https://kodeinkgp.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Search engine crawler content for instant indexing of question text */}
      <article className="sr-only">
        <h1>
          {formattedTopic} – {formattedSubTopic} – Problem #{problemNum}
        </h1>
        <p>IIT Kharagpur CS10001 / CS11001 Programming and Data Structures Lab Question Archive</p>
        <div>Difficulty: {problem?.rating || "Medium"}</div>
        <section>
          <h2>Problem Statement</h2>
          <p>{problem?.question}</p>
        </section>
      </article>

      <LabQuestion />
    </>
  );
}
