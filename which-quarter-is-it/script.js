function getCurrentQuarter(){
  const year = new Date().getFullYear();
  const date = new Date();

  const q1 = {start: `${year}/4/01`, end: `${year}/6/30`};
  const q2 = {start: `${year}/7/01`, end: `${year}/9/30`};
  const q3 = {start: `${year}/10/01`, end: `${year}/12/31`};
  const q4 = {start: `${year}/1/1`, end: `${year}/3/31`};
  const quarterObject = {q1, q2, q3, q4};

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


    console.log(value.start)
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
const currentMonth = parseInt(quarterObj.todayDate.split('/')[1]);
const currentDay = parseInt(quarterObj.todayDate.split('/')[2]);
const currentQuarterStartMonth = parseInt(quarterObj.startDate.split('/')[1]);
const daysInFirstQuarterMonth =  monthesMap[currentQuarterStartMonth-1];
const daysInSecondQuarterMonth =  monthesMap[(currentQuarterStartMonth-1)+1];
const daysInThirdQuarterMonth =  monthesMap[((currentQuarterStartMonth-1)+1)+1];

const firstQuarterMonthArray = [0];
const secondQuarterMonthArray = [0];
const thirdQuarterMonthArray = [0];


if(currentQuarterStartMonth === currentMonth) firstQuarterMonthArray.push(currentDay);
if(currentQuarterStartMonth < currentMonth) firstQuarterMonthArray.push(daysInFirstQuarterMonth);

if((currentQuarterStartMonth)+1 === currentMonth) secondQuarterMonthArray.push(currentDay);
if((currentQuarterStartMonth)+1 < currentMonth){
  firstQuarterMonthArray.push(daysInFirstQuarterMonth);
  secondQuarterMonthArray.push(daysInSecondQuarterMonth);
}

if(((currentQuarterStartMonth)+1)+1 === currentMonth) thirdQuarterMonthArray.push(currentDay);
if(((currentQuarterStartMonth)+1)+1 < currentMonth){
  firstQuarterMonthArray.push(daysInFirstQuarterMonth);
  secondQuarterMonthArray.push(daysInSecondQuarterMonth);
  thirdQuarterMonthArray.push(daysInThirdQuarterMonth);
}


const daysInCurrentQuarter = daysInFirstQuarterMonth + daysInSecondQuarterMonth + daysInThirdQuarterMonth

const remainingDaysTillEndOfQuarter =
  daysInCurrentQuarter
  - ((daysInFirstQuarterMonth - (daysInFirstQuarterMonth - firstQuarterMonthArray[firstQuarterMonthArray.length - 1]))
  + (daysInSecondQuarterMonth - (daysInSecondQuarterMonth - secondQuarterMonthArray[secondQuarterMonthArray.length - 1]))
  + (daysInThirdQuarterMonth - (daysInThirdQuarterMonth - thirdQuarterMonthArray[thirdQuarterMonthArray.length - 1])));


const textEl = document.querySelector('[data-text]');
textEl && quarterObj && (textEl.innerHTML = `
<p>Currently it's the</p>
<h2>${quarterObj.quarter} of the Fiscal Year ${quarterObj.fiscalYear}</h2> 
<p>it starts on <b>${quarterObj.startDate}</b></p> 
<p>and ends on <b>${quarterObj.endDate}</b>.</p>
<br>
<h1 style="color:#FA00FF">${remainingDaysTillEndOfQuarter.toString()} days </h1>
<p>remaining until end of <br>${quarterObj.quarter}</p>
<br>
<p>Today is the <b>${quarterObj.todayDate}</b></p>
`);