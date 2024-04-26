import axios from 'axios';


// Function to check if userX has starred a repository
async function checkStarred(owner, repo, userX) {
    try {
        const response = await axios.get(`https://api.github.com/users/${userX}/starred/${owner}/${repo}`, {
            headers: {
                Authorization: ``
            }
        });

        // If the request is successful, it means userX has starred the repository
        if (response.status === 204) {
            console.log(`${userX} has starred ${owner}/${repo}`);
            return true;
        } else {
            console.log(`${userX} has not starred ${owner}/${repo}`);
            return false;
        }
    } catch (error) {
        // If the request fails, it means userX has not starred the repository
        if (error.response && error.response.status === 404) {
            console.log(`${userX} has not starred ${owner}/${repo}`);
            return false;
        } else {
            throw error;
        }
    }
}

// Replace 'owner', 'repo', and 'userX' with the appropriate values
const owner = 'zakarialaoui10';
const repo = 'ziko.js';
const userX = 'mouadziani';

checkStarred(owner, repo, userX)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
