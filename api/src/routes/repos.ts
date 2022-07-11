import axios from 'axios';
import { Router, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export const repos = Router();

type Repository = typeof import('../../data/repos.json')[number];

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  let reposFromGithub: Repository[] = [];
  try {
    // Fetch Repos from API
    const resp = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );

    reposFromGithub = resp.data;
    // Fetch Repos from file location and convert it to JSobject
    const data: Repository[] = JSON.parse(
      readFileSync(
        resolve(__dirname, '..', '..', 'data', 'repos.json')
      ).toString()
    );

    // Combine Both Sources and Perform filter based form === false
    const combined = [...reposFromGithub, ...data].filter(
      (item) => item.fork === false
    );
    res.json(combined);
  } catch (e) {
    res.sendStatus(500);
  }
});
