import axios from 'axios';
async function checkFollow(userX, userY) {
    try {
        const response = await axios.get(`https://api.github.com/users/${userX}/following/${userY}`);
        // If the request is successful, it means userX follows userY
        if (response.status === 204) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return false;
        } else {
            throw error;
        }
    }
}

// const userX = 'zakarialaoui10';
// const userY = 'hixvmx';
// checkFollow(userX, userY)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });
