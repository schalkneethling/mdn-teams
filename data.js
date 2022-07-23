import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import * as dotenv from "dotenv";

dotenv.config();

const OctokitInst = Octokit.plugin(restEndpointMethods);
const octokit = new OctokitInst({
  auth: process.env.GITHUB_TOKEN,
});

async function getMembers() {
  const response = await octokit.rest.orgs.listMembers({
    org: "mdn",
    per_page: 100,
  });

  return response.data;
}

export default async function getMemberDetails() {
  const membersResponse = await getMembers();
  const members = membersResponse.map((member) => {
    return {
      avatar: member.avatar_url,
      login: member.login,
      profile: member.html_url,
      userType: member.type,
      isSiteAdmin: member.site_admin,
    };
  });

  return members;
}
