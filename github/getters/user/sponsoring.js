import axios from "axios";
import {load} from "cheerio";
import FetchDoc from "fetch-doc";

/**
 * Fetches the list of GitHub users sponsored by the given user.
 * 
 * @param {string} login - The username of the GitHub user.
 * @returns {Promise<string[]>} The usernames of the sponsored users.
 */
const get_sponsoring= async (login)=>{
   try {
    // const { data : html } = await axios.get(`https://github.com/${login}?tab=sponsoring`);
    // const $ = load(html);
    // const element = $("#user-profile-frame > div > div > div")
    //  const arr = [];
    //  element.children().each((index, child) => {
    //      if (index === 0) return;
    //      const sponsoring = $(child).children().eq(1).children().eq(0).children().eq(1).text().trim();
    //      arr.push(sponsoring);
    //  });
    //  return arr;
    const doc= FetchDoc.sync(`https://github.com/${login}?tab=sponsoring`);
    const sposoring=[...doc.querySelectorAll("#user-profile-frame > div > div > div > div span.Link--secondary")].map(n=>n.textContent);
    return sposoring;
   }
   catch(error) {
      console.error('Error fetching page:', error);
      return [];
   }
}
export{
    get_sponsoring
}