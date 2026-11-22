import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchGitHubData } from "./usePortfolio";

describe("fetchGitHubData", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("shares concurrent requests and follows pagination for complete statistics", async () => {
    const user = {
      login: "portfolio-test-user",
      name: "Portfolio Test",
      bio: "",
      location: "",
      company: "",
      blog: "",
      twitter_username: null,
      public_repos: 2,
      followers: 1,
      following: 0,
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/portfolio-test-user",
      created_at: "2020-01-01T00:00:00Z",
    };
    const repos = [
      { name: "first", stargazers_count: 3, forks_count: 1, language: "TypeScript" },
      { name: "second", stargazers_count: 5, forks_count: 2, language: "Python" },
    ];
    vi.mocked(fetch)
      .mockResolvedValueOnce({ ok: true, json: async () => user } as Response)
      .mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ Link: '<https://api.github.com/users/portfolio-test-user/repos?page=2>; rel="next"' }),
        json: async () => repos.slice(0, 1),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        headers: new Headers(),
        json: async () => repos.slice(1),
      } as Response);

    const [first, concurrent] = await Promise.all([
      fetchGitHubData("portfolio-test-user"),
      fetchGitHubData("portfolio-test-user"),
    ]);

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(concurrent).toBe(first);
    expect(first.stats?.totalStars).toBe(8);
    expect(first.stats?.totalForks).toBe(3);
    expect(first.repos).toHaveLength(2);
  });
});
