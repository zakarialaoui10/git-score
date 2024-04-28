import { check_fork } from "../check-fork.js";
process.on('message', async (data) => {
    try {
        const { login, owner, repoName } = data;
        const result = await check_fork(login, owner, repoName);
        process.send(result);
    } catch (error) {
        process.send({ error: error.message });
    }
});