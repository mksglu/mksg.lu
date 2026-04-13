interface ProjectStats {
  githubStars: number;
  npmDownloads: number;
  hnPoints: number;
}

const DEFAULTS: ProjectStats = {
  githubStars: 2000,
  npmDownloads: 7000,
  hnPoints: 548,
};

async function fetchWithFallback<T>(
  url: string,
  extract: (data: T) => number,
  fallback: number
): Promise<number> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return fallback;
    const data = (await res.json()) as T;
    return extract(data) || fallback;
  } catch {
    return fallback;
  }
}

export async function getContextModeStats(): Promise<ProjectStats> {
  const [githubStars, npmDownloads, hnPoints] = await Promise.all([
    fetchWithFallback<{ stargazers_count: number }>(
      "https://api.github.com/repos/mksglu/claude-context-mode",
      (d) => d.stargazers_count,
      DEFAULTS.githubStars
    ),
    fetchWithFallback<{ downloads: number }>(
      "https://api.npmjs.org/downloads/point/2025-01-01:2099-12-31/context-mode",
      (d) => d.downloads,
      DEFAULTS.npmDownloads
    ),
    fetchWithFallback<{ points: number }>(
      "https://hn.algolia.com/api/v1/items/47193064",
      (d) => d.points,
      DEFAULTS.hnPoints
    ),
  ]);

  return { githubStars, npmDownloads, hnPoints };
}

export function formatStat(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K+`;
  return `${n}+`;
}
