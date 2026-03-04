import { jikePosts } from "./jike-posts.generated";

export interface JikeRepost {
  author: string;
  content: string;
}

export interface JikePost {
  id: string;
  createdAt: string;
  dateLabel: string;
  year: number;
  author: string;
  topic: string;
  link: string;
  content: string;
  excerpt: string;
  pictures: string[];
  pictureCount: number;
  repost: JikeRepost | null;
}

export interface JikeTopicSummary {
  id: string;
  name: string;
  count: number;
}

export interface JikePostWithAnchor extends JikePost {
  topicAnchorId?: string;
}

const posts = jikePosts as JikePost[];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function linkifyMarkdown(value: string) {
  return value.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_, label, href) => `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`
  );
}

function linkifyPlainUrls(value: string) {
  return value.replace(
    /(^|[\s(>])((https?:\/\/[^\s<]+))/g,
    (_, prefix, href) => `${prefix}<a href="${href}" target="_blank" rel="noreferrer">${href}</a>`
  );
}

export function renderJikeContent(text: string) {
  const escaped = escapeHtml(text);
  const markdownLinked = linkifyMarkdown(escaped);
  const urlLinked = linkifyPlainUrls(markdownLinked);
  return urlLinked.replace(/\n/g, "<br />");
}

export const jikePostsArchive = posts;

export const jikeTopicSummaries: JikeTopicSummary[] = Array.from(
  posts.reduce((map, post) => map.set(post.topic, (map.get(post.topic) || 0) + 1), new Map<string, number>())
)
  .map(([name, count]) => ({ name, count }))
  .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, "zh-CN"));
export const jikeTopics = jikeTopicSummaries.map((topic, index) => ({
  ...topic,
  id: `topic-${index + 1}`
}));

const topicIdByName = new Map(jikeTopics.map((topic) => [topic.name, topic.id]));
const seenTopicIds = new Set<string>();

export const jikePostsByYear = Array.from(
  posts.reduce((map, post) => {
    const group = map.get(post.year) || [];
    const topicAnchorId = topicIdByName.get(post.topic);
    group.push({
      ...post,
      topicAnchorId:
        topicAnchorId && !seenTopicIds.has(topicAnchorId)
          ? (seenTopicIds.add(topicAnchorId), topicAnchorId)
          : undefined
    });
    map.set(post.year, group);
    return map;
  }, new Map<number, JikePostWithAnchor[]>())
)
  .sort((left, right) => right[0] - left[0]);

const seenFeedTopicIds = new Set<string>();

export const jikeArchiveFeed: JikePostWithAnchor[] = posts.map((post) => {
  const topicAnchorId = topicIdByName.get(post.topic);
  return {
    ...post,
    topicAnchorId:
      topicAnchorId && !seenFeedTopicIds.has(topicAnchorId)
        ? (seenFeedTopicIds.add(topicAnchorId), topicAnchorId)
        : undefined
  };
});

export const jikeArchiveStats = {
  totalPosts: posts.length,
  totalTopics: jikeTopics.length,
  totalYears: new Set(posts.map((post) => post.year)).size,
  postsWithPictures: posts.filter((post) => post.pictureCount > 0).length,
  repostCount: posts.filter((post) => post.repost).length,
  latestDate: posts[0]?.dateLabel ?? "",
  earliestDate: posts[posts.length - 1]?.dateLabel ?? ""
};
