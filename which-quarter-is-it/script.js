function getCurrentQuarter(){
  const year = new Date().getFullYear();
  const q1 = {start: `${year}/4/01`, end: `${year}/6/30`};
  const q2 = {start: `${year}/7/01`, end: `${year}/9/30`};
  const q3 = {start: `${year}/10/01`, end: `${year}/12/31`};
  const q4 = {start: `${year+1}/1/1`, end: `${year+1}/3/31`};
  const quarterObject = {q1, q2, q3, q4};

  const date = new Date();
  const fullDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
  const currentTimestamp = new Date(fullDate).getTime();
  const quarterMap = {
    q1: 'First Quarter',
    q2: 'Second Quarter',
    q3: 'Third Quarter',
    q4: 'Fourth Quarter'
  }
  for (const [key, value] of Object.entries(quarterObject)) {
    const quarterEndTimestamp = new Date(value.end).getTime();
    const quarterStartTimestamp = new Date(value.start).getTime();
    if(currentTimestamp < quarterEndTimestamp && currentTimestamp >= quarterStartTimestamp){
      return {
        quarter: quarterMap[key],
        startDate: value.start,
        endDate: value.end,
        todayDate: fullDate
      }
    }
  }
  return null;
}

const textEl = document.querySelector('[data-text]');
const quarterObj = getCurrentQuarter();
textEl && quarterObj && (textEl.innerHTML = `
<p>This is the </p>
<h2>${quarterObj.quarter}</h2> 
<p>it starts on <b>${quarterObj.startDate}</b></p> 
<p>and ends on <b>${quarterObj.endDate}</b>.</p>
<br>
<p>Today is the <b>${quarterObj.todayDate}</b></p>
`);