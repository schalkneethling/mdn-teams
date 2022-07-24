import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import * as dotenv from "dotenv";

dotenv.config();

const OctokitInst = Octokit.plugin(restEndpointMethods);
const octokit = new OctokitInst({
  auth: process.env.GITHUB_TOKEN,
});

export async function getTeamsForOrg(org) {
  const response = await octokit.rest.teams.list(org);
  const teams = response.data.map((team) => {
    return {
      name: team.name,
      description: team.description,
      url: team.html_url,
    };
  });
  return teams;
}

async function getOrg(org) {
  const orgResponse = await octokit.rest.orgs.get(org);
  return orgResponse.data;
}

async function getUserDetails(username) {
  const userDetails = await octokit.rest.users.getContextForUser({
    username,
    subject_type: "organization",
  });
  return userDetails.data;
}

async function getMembers() {
  const response = await octokit.rest.orgs.listMembers({
    org: "mdn",
    per_page: 100,
  });

  return response.data;
}

export async function getMemberDetails() {
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
  console.log(members);

  return members;
}
