// console.log('fs JS');
{
    // table needs position, points, driver name, driver nationality, constructor name
    let form = document.getElementById('f1InputForm')

    async function handleSubmit(e){
        e.preventDefault()

        let seasonInput = e.target.seasonInput.value;
        let roundInput = e.target.roundInput.value;
        seasonInput.value = ''
        roundInput.value = ''
        
        let racerInfo = getSeasonRoundInfo(seasonInput, roundInput)

    }

    async function getSeasonRoundInfo(season, round) {
        let res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings`)
        let data = await res.json()
        return data['MRData']['StandingsTable']
    }
}
