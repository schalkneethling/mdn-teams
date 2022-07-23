(function () {
  "use strict";
  const MEMBER_URL =
    "https://mdn-teams-bveaw8vf5-schalkneethling.vercel.app/members";

  async function showMembers() {
    const response = await fetch(MEMBER_URL);
    const members = await response.json();
    const membersList = document.getElementById("members");
    membersList.innerHTML = "";
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
      membersList.insertAdjacentHTML("beforeend", currentMember);
    }
  }

  showMembers();
})();
