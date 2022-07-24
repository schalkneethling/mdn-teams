(function () {
  "use strict";

  const MEMBER_URL = "https://mdn-teams.vercel.app/members";
  const TEAMS_URL = "https://mdn-teams.vercel.app/teams";

  const mainMenu = document.getElementById("main-menu");

  function getEmptyContainer() {
    const output = document.getElementById("output");
    output.innerHTML = "";
    return output;
  }

  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async function showTeams() {
    const teams = await getData(TEAMS_URL);
    const output = getEmptyContainer();

    for (const team of teams) {
      const currentTeam = `
        <li class="member">
            <div class="member-header">
                <h2><a href="${team.url}">${team.name}</a></h2>
            </div>
            <p>${team.description}</p>
        </li>
      `;
      output.insertAdjacentHTML("beforeend", currentTeam);
    }
  }

  async function showMembers() {
    const members = await getData(MEMBER_URL);
    const output = getEmptyContainer();

    for (const member of members) {
      const currentMember = `
        <li class="member">
            <div class="member-header">
                <img src="${member.avatar}" alt="${member.login}" />
                <h2><a href="${member.profile}">${member.login}</a></h2>
            </div>
            <ul class="member-details">
                <li>User type: ${member.userType}</li>
                <li>Is admin: ${member.isSiteAdmin}</li>
            </ul>
        </li>
      `;
      output.insertAdjacentHTML("beforeend", currentMember);
    }
  }

  if (mainMenu) {
    mainMenu.addEventListener("click", (event) => {
      event.preventDefault();

      if (event.target.id === "show-teams") {
        showTeams();
      }

      if (event.target.id === "show-members") {
        showMembers();
      }
    });
  }
})();
