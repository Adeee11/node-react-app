import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Folder } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { useData } from '../DataProvider';

export default function RepoList() {
  const navigate = useNavigate();
  const { repos } = useData();
  return (
    <Box>
      <Typography variant="h4" marginTop={4}>
        List of Repositories
      </Typography>
      <List>
        {repos.map((repo) => (
          <ListItem key={repo.id}>
            <ListItemButton onClick={() => navigate(`/repo/${repo.id}`)}>
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary={repo.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
