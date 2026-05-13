import { useState, useEffect } from 'react';
import portfolioData from './portfolio.json';

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  location: string;
  company: string;
  blog: string;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  topics: string[];
  updated_at: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { [key: string]: number };
}

export interface ProfileStats {
  repos: number;
  stars: number;
  forks: number;
  followers: number;
  years: number;
  topLanguages: string[];
}

export interface Profile {
  name: string;
  displayName?: string;
  title: string;
  tagline: string;
  bio: string[];
  location: string;
  status: string;
  avatar?: string;
  stats?: ProfileStats;
  social?: { label: string; href: string; icon: string }[];
}

interface Config {
  githubUsername: string;
  fallback: {
    profile: Profile;
  };
}

const config = portfolioData.config as Config;
const fallback = config.fallback.profile;

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export async function fetchGitHubData(username: string): Promise<{
  user: GitHubUser | null;
  repos: GitHubRepo[] | null;
  stats: GitHubStats | null;
  error: string | null;
}> {
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };

    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!userRes.ok) {
      throw new Error(`User not found: ${userRes.status}`);
    }
    const user: GitHubUser = await userRes.json();

    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=30`,
      { headers }
    );
    const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

    const stats: GitHubStats = {
      totalRepos: user.public_repos,
      totalStars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
      totalForks: repos.reduce((sum, r) => sum + r.forks_count, 0),
      topLanguages: repos.reduce((acc, repo) => {
        if (repo.language) {
          acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
      }, {} as { [key: string]: number }),
    };

    return { user, repos, stats, error: null };
  } catch (error) {
    return {
      user: null,
      repos: null,
      stats: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export function useGitHubData() {
  const [userState, setUserState] = useState<FetchState<GitHubUser>>({
    data: null,
    loading: true,
    error: null
  });
  const [reposState, setReposState] = useState<FetchState<GitHubRepo[]>>({
    data: null,
    loading: true,
    error: null
  });
  const [statsState, setStatsState] = useState<FetchState<GitHubStats>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadData = async () => {
      const { user, repos, stats, error } = await fetchGitHubData(config.githubUsername);

      if (error) {
        setUserState({ data: null, loading: false, error });
        setReposState({ data: null, loading: false, error });
        setStatsState({ data: null, loading: false, error });
        return;
      }

      if (user) setUserState({ data: user, loading: false, error: null });
      if (repos) setReposState({ data: repos, loading: false, error: null });
      if (stats) setStatsState({ data: stats, loading: false, error: null });
    };

    loadData();
  }, []);

  return {
    user: userState.data,
    userLoading: userState.loading,
    repos: reposState.data,
    reposLoading: reposState.loading,
    stats: statsState.data,
    statsLoading: statsState.loading,
    error: userState.error || reposState.error || statsState.error,
    fallback
  };
}

export function useMergedProfile(): Profile {
  const { user, userLoading, stats, statsLoading } = useGitHubData();

  // Always return profile with stats, even while loading (use fallback values initially)
  const defaultProfile: Profile = {
    ...fallback,
    stats: {
      repos: fallback.stats?.repos || 4,
      stars: fallback.stats?.stars || 15,
      forks: fallback.stats?.forks || 3,
      followers: fallback.stats?.followers || 100,
      years: fallback.stats?.years || 3,
      topLanguages: fallback.stats?.topLanguages || ['React', 'Django', 'TypeScript']
    }
  };

  if (userLoading || statsLoading) {
    return {
      ...defaultProfile,
      avatar: `https://github.com/${config.githubUsername}.png`
    };
  }

  if (!user || !stats) {
    return {
      ...defaultProfile,
      avatar: `https://github.com/${config.githubUsername}.png`
    };
  }

  const createdDate = new Date(user.created_at);
  const yearsAgo = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365));

  const topLangs = Object.entries(stats.topLanguages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang]) => lang);

  return {
    name: user.name || user.login,
    title: user.bio?.split('\n')[0] || fallback.title,
    tagline: user.bio?.split('\n')[1] || fallback.tagline,
    bio: user.bio ? [user.bio] : fallback.bio,
    location: user.location || fallback.location,
    status: 'Open to projects',
    avatar: user.avatar_url,
    stats: {
      repos: stats.totalRepos,
      stars: stats.totalStars,
      forks: stats.totalForks,
      followers: user.followers,
      years: yearsAgo,
      topLanguages: topLangs
    },
    social: (portfolioData as any).social || []
  };
}

// Export hooks for manual usage
export function usePortfolio() {
  return portfolioData;
}

export function useCTA() {
  const data = portfolioData as any;
  return data.cta || { primary: { text: 'Explorar Stack', href: '#stack' }, secondary: { text: 'Ver Proyectos', href: '#projects' } };
}

export function useSocial() {
  return (portfolioData as any).social || [];
}

export function usePhilosophy() {
  return (portfolioData as any).philosophy || [];
}

export function useTech() {
  return (portfolioData as any).tech || { frontend: [], backend: [], tools: [] };
}

export function useTerminalCommands() {
  return (portfolioData as any).terminal?.commands || {};
}

export function useProjects(): GitHubRepo[] {
  const { repos } = useGitHubData();
  if (!repos) return [];
  return repos.filter(repo => !repo.name.startsWith('.') && !repo.name.includes('.github'));
}

export function useTechFromGitHub(): string[] {
  const { stats } = useGitHubData();
  if (!stats) return [];
  return Object.entries(stats.topLanguages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([lang]) => lang);
}

export function useContactConfig() {
  return (portfolioData as any).contact || {
    email: 'contact@riverflow.dev',
    subject: 'Nuevo mensaje desde tu portfolio',
    successMessage: '¡Mensaje enviado! Te responderé pronto.',
    errorMessage: 'Algo salió mal. Intenta de nuevo.'
  };
}