import { parentPort } from 'worker_threads';
import { is_sponsored_by } from '../../checkers/check-sponsoring.js';
// Receive data from the main thread
parentPort.on('message', async ({me,userX}) => {
    try {
        const sponsorResult = await is_sponsored_by(me,userX);
        parentPort.postMessage(sponsorResult);
    } catch (error) {
        parentPort.postMessage({ error: error.message });
    }
});
