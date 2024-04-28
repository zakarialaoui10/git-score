import { get_repos } from "../getters/user/repos.js";
/**
 * Retrieve weights schema for a user
 * @async
 * @param {string} login - The user's login name.
 * @param {Object} options - Additional options.
 * @param {boolean} [options.includeForks=false] - Whether to include forked repositories.
 * @param {boolean} [options.includeSources=true] - Whether to include the source repositories.
 * @returns {Promise<{ 
 * follow : number , 
 * sponsor : number , 
 * repos : { 
 *  name : string,
 *  weights : {
 *    star : 1,
 *    fork : 1,
 *    contribute : 1
 *  }
 *  }[]
 * }>}
 */
const weights = async (login,{ includeForks = false, includeSources = true }={}) => {
    const repos = await get_repos(login , { includeForks, includeSources });
    const weights = [];
    for (let i = 0; i < repos.length; i++) {
        weights[i]={
            name : repos[i],
            weights:{
                star:1,
                fork:1,
                contribute:1
            }
        }
    }
    return {
        follow:1,
        sponsor:1,
        repos:weights
    };
} 
export {
    weights
}