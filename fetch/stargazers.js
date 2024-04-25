import fetch from 'node-fetch';

async function getAllStargazers(owner, repo) {
  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/stargazers`;
  const perPage = 100; // Number of stargazers per page
  let page = 1;
  let stargazerUsernames = [];

  try {
    while (true) {
      const url = `${baseUrl}?per_page=${perPage}&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.length === 0) {
        break; // No more stargazers to fetch
      }

      const usernames = data.map(stargazer => stargazer.login);
      stargazerUsernames = stargazerUsernames.concat(usernames);
      page++;
    }

    return stargazerUsernames;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

// Usage
const owner = 'zakarialaoui10';
const repo = 'ziko.js';

getAllStargazers(owner, repo)
  .then(stargazerUsernames => {
    console.log('Total stargazers:', stargazerUsernames.length);
    console.log('Stargazer usernames:', stargazerUsernames);
    // Do something with the stargazer usernames array
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
