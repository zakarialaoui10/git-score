import axios from 'axios';
const check_follow=async (userX, userY)=>{
    try {
        const response = await axios.get(`https://api.github.com/users/${userX}/following/${userY}`);
        return response.status === 204;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return false;
        } else {
            throw error;
        }
    }
}
export {
    check_follow
}
// const userX = 'zakarialaoui10';
// const userY = 'hixvmx';
// check_follow(userX, userY)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.error('Error:', error.message);
//     });
