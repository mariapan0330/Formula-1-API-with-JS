// console.log('f1 JS');
{
    // first, grab the form
    let form = document.getElementById('userForm');


    async function handleSubmit(e){
        console.log('Handling Submission...')
        e.preventDefault()

        let seasonInput = e.target.seasonInput.value;
        let roundInput = e.target.roundInput.value;
        
        let driversData = await getSeasonRoundInfo(seasonInput, roundInput)
        seasonInput.value = ''
        roundInput.value = ''
        console.log('DRIVERS DATA FROM SUBMIT', driversData);
        
        buildDriverTable(driversData)
    }

    async function getSeasonRoundInfo(season, round) {
        console.log('Getting Season Round Info...');
        let res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
        let data = await res.json();
        // console.log('DATA!!!!!', data['MRData']['StandingsTable'])
        return data['MRData']['StandingsTable']
    }
    
    function buildDriverTable(driversData){
        console.log('Building Driver Table...');
        let table = document.createElement('table')
        table.className = 'table'
        
        let thead = document.createElement('thead')
        
        // table needs position, points, driver name, driver nationality, constructor name
        // COLUMN NAMES:
        let trHead = document.createElement('tr')
        
        let thPosition = document.createElement('th')
        thPosition.scope = 'col'
        thPosition.innerHTML = 'Position'
        
        let thPoints = document.createElement('th')
        thPoints.scope = 'col'
        thPoints.innerHTML = 'Points'
        
        let thName = document.createElement('th')
        thName.scope = 'col'
        thName.innerHTML = 'Name'
        
        let thNationality = document.createElement('th')
        thNationality.scope = 'col'
        thNationality.innerHTML = 'Nationality'
        
        let thConstructor = document.createElement('th')
        thConstructor.scope = 'col'
        thConstructor.innerHTML = 'Constructor'
        
        // INFO ROWS TIME
        let tbody = document.createElement('tbody')
        
        // for each driver in the drivers data, create a new row in there with the info
        // position, points, driver name, driver nationality, constructor name
        //driversData = data['MRData']['StandingsTable']
        drivers = driversData.StandingsLists[0].DriverStandings
        for (driver in drivers){
            let tr = document.createElement('tr')
            
            // position
            let thPos = document.createElement('th')
            thPos.scope = 'row'
            thPos.innerHTML = drivers[driver].position
            // th.innerHTML = driver
            
            // points
            let tdPoints = document.createElement('td')
            tdPoints.innerHTML = drivers[driver].points
            
            // driver name
            let tdName = document.createElement('td')
            tdName.innerHTML = `${drivers[driver].Driver.givenName} ${drivers[driver].Driver.familyName}`
            
            // driver nationality
            let tdNationality = document.createElement('td')
            tdNationality.innerHTML = drivers[driver].Driver.nationality
            
            // constructor name
            let tdConstr = document.createElement('td')
            tdConstr.innerHTML = drivers[driver].Constructors[0].name
            
            
            // put all the stuff inside the stuff, and put that stuff inside the other stuff
            tr.append(thPos)
            tr.append(tdPoints)
            tr.append(tdName)
            tr.append(tdNationality)
            tr.append(tdConstr)
            tbody.append(tr)
        }
        
        thead.append(trHead)
        trHead.append(thPosition)
        trHead.append(thPoints)
        trHead.append(thName)
        trHead.append(thNationality)
        trHead.append(thConstructor)

        table.append(thead)
        table.append(tbody)

        // document.getElementById('standingTable').append(table)
        let display = document.getElementById('standingTable')
        display.innerHTML = ''
        display.append(table)
    }

    form.addEventListener('submit', handleSubmit);
}
