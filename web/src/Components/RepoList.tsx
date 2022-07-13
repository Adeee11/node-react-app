import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Folder } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { useData } from '../DataProvider';
import { useMemo, useState } from 'react';
import { uniq } from 'lodash';

export default function RepoList() {
  const navigate = useNavigate();
  const { repos } = useData();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const filteredRepos = useMemo(() => {
    if (!selectedLanguage) {
      return repos;
    }
    return repos.filter((item) => item.language === selectedLanguage);
  }, [repos, selectedLanguage]);
  const languages = useMemo(() => {
    const allLangs = repos.map((item) => item.language);
    return uniq(allLangs);
  }, [repos]);

  return (
    <Box>
      <Typography variant="h4" marginY={4}>
        List of Repositories
      </Typography>
      <List>
        {languages.length > 0 && (
          <ToggleButtonGroup
            color="primary"
            value={selectedLanguage}
            exclusive={true}
            onChange={(e, value) => setSelectedLanguage(value)}
          >
            {languages.map((lang) => (
              <ToggleButton key={lang} value={lang}>
                {lang}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
        {filteredRepos.map((repo) => (
          <ListItem key={repo.id}>
            <ListItemButton onClick={() => navigate(`/repo/${repo.id}`)}>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText
                primary={repo.name}
                secondary={`
                  Description: ${repo.description || '-'}
                  Language: ${repo.language}
                  Forks: ${repo.forks_count}
                `}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
