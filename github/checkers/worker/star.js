import { parentPort } from 'worker_threads';
import { check_starred } from '../check-starred.js';
parentPort.on('message', async ({login,owner,repoName}) => {
    try {
        const result = await check_starred(login,owner,repoName);
        parentPort.postMessage(result);
    } catch (error) {
        parentPort.postMessage({ error: error.message });
    }
});
