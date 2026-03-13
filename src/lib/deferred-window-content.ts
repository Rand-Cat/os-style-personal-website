export const DEFERRED_WINDOW_IDS = [
  "jike",
  "read-easy",
  "vibary",
  "atten",
  "interlude",
  "molday",
  "onesnap",
  "tubenitro",
  "new-portal",
  "deepchat",
  "dogcheck",
  "existence",
  "sekai"
] as const;

export type DeferredWindowId = (typeof DEFERRED_WINDOW_IDS)[number];

const deferredWindowIdSet = new Set<string>(DEFERRED_WINDOW_IDS);

export const isDeferredWindowId = (value: string): value is DeferredWindowId =>
  deferredWindowIdSet.has(value);

export const getDeferredWindowContentPath = (id: DeferredWindowId) =>
  `/desktop-window-content/${id}/`;
