// These are type stubs for Repo JSON
/* eslint-disable @typescript-eslint/naming-convention */

export interface IRepository {
  id: number;
  fork: boolean;
  name: string;
  description: string;
  language: string;
  forks_count: string;
  created_at: string;
  markdown?: string;
  latest_commit?: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
}
