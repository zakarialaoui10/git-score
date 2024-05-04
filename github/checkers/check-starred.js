import axios from 'axios';
const check_starred=async (user, owner, repo, accessToken) =>{
    try {
        const response = await axios.get(`https://api.github.com/user/starred/${owner}/${repo}`, {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: 'application/vnd.github.v3.star+json'
            }
        });
        if (response.status === 204) {
            console.log(`${user} has starred ${owner}/${repo}`);
            return true;
        } else {
            console.log(`${user} has not starred ${owner}/${repo}`);
            return false;
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log(`${user} has not starred ${owner}/${repo}`);
            return false;
        } else {
            console.error(`Error checking if ${user} starred ${owner}/${repo}: ${error.message}`);
            throw error;
        }
    }
}

export{
    check_starred
}
// // Usage example
// const user = 'userX';
// const owner = 'ownerUsername';
// const repo = 'repoName';
// const accessToken = 'YOUR_GITHUB_ACCESS_TOKEN';

// check_starred(user, owner, repo, accessToken)
//     .then(starred => {
//         if (starred) {
//             console.log(`${user} has starred ${owner}/${repo}`);
//         } else {
//             console.log(`${user} has not starred ${owner}/${repo}`);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
