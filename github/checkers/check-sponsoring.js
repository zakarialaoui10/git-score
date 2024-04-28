import { get_sponsoring } from "../getters/user/sponsoring.js";
/**
 * Checks if a user is sponsored by another user.
 * 
 * @param {string} sponsored - The username of the user being checked if sponsored.
 * @param {string} sponsor - The username of the user who might be sponsoring.
 * @returns {Promise<boolean>} A promise that resolves to true if the user is sponsored by the sponsor, false otherwise.
 * @throws {Error} If an error occurs during the process.
 */
const is_sponsored_by=(sponsored,sponsor)=>{
    return new Promise(async (resolve, reject) => {
        try {
            const sponsoring = await get_sponsoring(sponsor);
            const sponsorFound = sponsoring.find(user => user = sponsored);
            if (sponsorFound) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
 }
export{
    is_sponsored_by
}