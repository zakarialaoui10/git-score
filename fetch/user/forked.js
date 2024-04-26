import axios from 'axios';

async function getUserRepositories(username, includeForks = true,source = true, sortBy = null) {
    try {
        let repositories = [];
        let page = 1;
        let hasNextPage = true;

        while (hasNextPage) {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
              headers: {
                  Authorization: `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`
              },
                params: {
                    per_page: 100, 
                    page: page
                }
              
            });
          let reposToAdd = response.data;
          if(!includeForks) reposToAdd=reposToAdd.filter(repo => !repo.fork);
          if(!source) reposToAdd=reposToAdd.filter(repo => repo.fork)
            repositories = repositories.concat(reposToAdd);
            if (response.headers.link) {
                const linkHeader = response.headers.link;
                hasNextPage = linkHeader.includes('rel="next"');
            } else {
                hasNextPage = false;
            }
            page++;
        }
        if (sortBy) {
            repositories.sort((a, b) => {
                if (sortBy === 'stars') {
                    return b.stargazers_count - a.stargazers_count;
                } else if (sortBy === 'last_updated') {
                    return new Date(b.updated_at) - new Date(a.updated_at);
                } else {
                    return 0;
                }
            });
        }
        return repositories.map(repo => repo.name);
    } catch (error) {
        throw error;
    }
}

// Test
const username = 'zakarialaoui10';
const includeForks = true; 
const includeSources = false;
const sortBy = 'stars'; 

getUserRepositories(username, includeForks,includeSources, sortBy)
    .then(repositories => {
        console.log(repositories);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
