import { check_contribution } from "../check-contribution";
process.on('message', async (data) => {
    try {
        const { login, owner, repoName } = data;
        const result = await check_contribution(login, owner, repoName);
        process.send(result);
    } catch (error) {
        process.send({ error: error.message });
    }
});