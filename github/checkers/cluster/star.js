import { check_starred } from '../check-starred.js';
process.on('message', async (data) => {
    try {
        const { login, owner, repoName } = data;
        const result = await check_starred(login, owner, repoName);
        process.send(result);
    } catch (error) {
        process.send({ error: error.message });
    }
});