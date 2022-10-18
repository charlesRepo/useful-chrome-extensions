const jobData = [
  {
    title: 'Vice President of sales',
    location: 'Vancouver',
    team: 'Growth',
  },
  {
    title: 'Senior Software Engineer',
    location: 'Vancouver',
    team: 'Engineering',
  },
  {
    title: 'Lead Software Engineer',
    location: 'Vancouver',
    team: 'Engineering',
  },
  {
    title: 'Partner Success Manager',
    location: 'Barcelona',
    team: 'Partner Success',
  },
  {
    title: 'Software Engineer',
    location: 'Vancouver',
    team: 'Engineering',
  },
  {
    title: 'Product Designer',
    location: 'Vancouver',
    team: 'Product',
  },
  {
    title: 'Product Manager',
    location: 'Vancouver',
    team: 'Product',
  },
  {
    title: 'Director of Partner Success',
    location: 'Bucharest',
    team: 'Partner Success',
  },
];
// [product: [{Lead, location}, {Vice, location},]]
const uniqueTeams = [...(new Set(jobData.map(obj => obj.team)))].sort();
console.log(uniqueTeams);