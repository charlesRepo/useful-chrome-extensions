function checkLastQuarterProjects(q){
  const year = new Date().getFullYear();
  const q1 = {start: `${year}/4/01`, end: `${year}/6/30`};
  const q2 = {start: `${year}/7/01`, end: `${year}/9/30`};
  const q3 = {start: `${year}/10/01`, end: `${year}/12/31`};
  const q4 = {start: `${year+1}/1/1`, end: `${year+1}/3/31`};
  const quarterObject = {q1, q2, q3, q4};
  if(!q){
    const date = new Date();
    const fullDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
    const currentTimestamp = new Date(fullDate).getTime();
    for (const [key, value] of Object.entries(quarterObject)) {
      const quarterEndTimestamp = new Date(value.end).getTime();
      if(currentTimestamp > quarterEndTimestamp){
        q = key;
      }
    }
  }

  const query = `project = MW AND Sprint in (closedSprints()) AND status = Done AND assignee = currentUser() AND updated >= "${quarterObject[q].start}" AND updated <= "${quarterObject[q].end}" ORDER BY updated  ASC`;
  window.open(`https://jira.atlightspeed.net/issues/?jql=${encodeURIComponent(query)}`)
}

const button = document.querySelector('[data-button]');
button.addEventListener('click', () => {
  checkLastQuarterProjects()
})