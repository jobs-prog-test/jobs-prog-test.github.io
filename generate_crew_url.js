// Generate URL for Dust Busters Plus crew
function generateDustBustersUrl() {
  const baseUrl = 'https://joonk4ng.github.io';
  const params = new URLSearchParams();
  
  // Crew Information
  // DO NOT MODIFY crewName
  params.set('crewName', 'Dust Busters Plus');
  // Modify the second value ex: C69 -> C70
  params.set('crewNumber', 'C69');
  // Modify the second value ex: 2025 RMA Preposition -> 2025 RMA Preposition 2
  params.set('fireName', '2025 RMA Preposition');
  // Modify the second value ex: CO RMC 250002 -> CO RMC 250003
  params.set('fireNumber', 'CO RMC 250002');
  
  // Crew Members Data (encoded as JSON)
  // Modify 'Sawyer McCall' to the first name and last name of the first crew member
  // Modify 'CRWB' to the classification of the first crew member
  const crewMembers = [
    { name: 'Sawyer McCall', classification: 'CRWB' },
    { name: 'Peyton Riley Cordell', classification: 'FFT2' },
    { name: 'Joel Matthew Rouse', classification: 'FFT2' },
    { name: 'Jose Eduardo Torres Garcia', classification: 'FFT2' },
    { name: 'Maddison Martinez Talamantes', classification: 'FFT2' },
    { name: 'Cody Koivu', classification: 'FFT2' },
    { name: 'Chad Allen', classification: 'FFT2' },
    { name: 'Raymar Salazar', classification: 'FFT2' },
    { name: 'Keagan Schnoor', classification: 'FFT2' },
    { name: 'Angeni Marie Yeo', classification: 'FFT2' },
    { name: 'Eli Durning', classification: 'FFT2' },
    { name: 'Jason Weber', classification: 'FFT1' },
    { name: 'Killian Powers', classification: 'FFT2' },
    { name: 'Clarance David Byrd', classification: 'FFT1' },
    { name: 'Eric Machtmes', classification: 'FFT2' },
    { name: 'Wiley Peebles', classification: 'FFT2' },
    { name: 'Dallas Riddle Stevens', classification: 'FFT2' },
    { name: 'Bradley Gerald Kline', classification: 'FFT1' }
  ];
  
  params.set('crewData', JSON.stringify(crewMembers));
  
  return `${baseUrl}?${params.toString()}`;
}

// Generate and display the URL
// Will generate in the console
const url = generateDustBustersUrl();
console.log('Dust Busters Plus URL:');
console.log(url);

// Also create a simpler URL with just crew info
const simpleUrl = `https://joonk4ng.github.io?crewName=${encodeURIComponent('Dust Busters Plus')}&crewNumber=${encodeURIComponent('C69')}&fireName=${encodeURIComponent('2025 RMA Preposition')}&fireNumber=${encodeURIComponent('CO RMC 250002')}`;

console.log('\nSimple URL (crew info only):');
console.log(simpleUrl); 