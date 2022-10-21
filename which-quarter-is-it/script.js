function getCurrentQuarter(){
  const year = new Date().getFullYear();
  const q1 = {start: `${year}/4/01`, end: `${year}/6/30`};
  const q2 = {start: `${year}/7/01`, end: `${year}/9/30`};
  const q3 = {start: `${year}/10/01`, end: `${year}/12/31`};
  const q4 = {start: `${year+1}/1/1`, end: `${year+1}/3/31`};
  const quarterObject = {q1, q2, q3, q4};

  const date = new Date();
  const fullDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
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
        todayDate: fullDate,
        fiscalYear: quarterObject.q1 >= fullDate ? date.getFullYear()+1 : date.getFullYear()
      }
    }
  }
  return null;
}


const quarterObj = getCurrentQuarter();

const monthesMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const currentMonth = quarterObj.todayDate.split('/')[1];
const currentDay = quarterObj.todayDate.split('/')[2];
const daysInCurrentMonth = monthesMap[currentMonth -1];
const remainingDaysInCurrentMonth = daysInCurrentMonth - currentDay;
const currentQuarterStartMonth = quarterObj.startDate.split('/')[1];
const daysInCurrentQuarter =  monthesMap[currentQuarterStartMonth-1] + monthesMap[(currentQuarterStartMonth-1)+1] + monthesMap[((currentQuarterStartMonth-1)+1)+1]
// let daysInCurrentQuarter = 0;
// for(let i = 0; i <= 3; i++){
//   daysInCurrentQuarter += monthesMap[(currentQuarterStartMonth-1)+i]
// }
const remainingDaysTillEndOfQuarter = daysInCurrentQuarter - remainingDaysInCurrentMonth;


const textEl = document.querySelector('[data-text]');
textEl && quarterObj && (textEl.innerHTML = `
<p>This is the </p>
<h2>${quarterObj.quarter} of the Fiscal Year ${quarterObj.fiscalYear}</h2> 
<p>it starts on <b>${quarterObj.startDate}</b></p> 
<p>and ends on <b>${quarterObj.endDate}</b>.</p>
<br>
<h1 style="color:#FA00FF">${remainingDaysTillEndOfQuarter} days </h1>
<p>remaining until end of <br>${quarterObj.quarter}</p>
<br>
<p>Today is the <b>${quarterObj.todayDate}</b></p>
`);