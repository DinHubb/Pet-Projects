//Village Medowfild

//create automat, a little program, which perfoms a task in virtual world. Our avtomate will to be a Robot mail delivery, receiving and sending parcels.

const {roadGraph} = require('./module-road');

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination){
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if(p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

let first = new VillageState('Mail', [{place: 'Mail', address: 'Home Alice`s'}]);

let next = first.move('Home Alice`s');

console.log(next.place);
console.log(next.parcels);
console.log(first.place);

function runRobot(state, robot, memory) {
    
    for(let turn = 0;; turn++) {
        if(state.parcels.length == 0) {
            console.log(`Finished at ${turn} step`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Next direction ${action.direction}`);
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
};

function randomRobot(state) {
    let destinations = roadGraph[state.place];
    if (destinations.length == 0) {
        return {direction: null};
    } else {
        return {direction: randomPick(destinations)};
    }
}


VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for(let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    };   
    return new VillageState('Mail', parcels)
};

const mailRoute = [
    'Home Alice`s', 'Barn', 'Home Alice`s', 'Home Bob`s',
    'Town hall', 'Home Dary`s', 'Home Ern`s', 
    'Home Gret`s', 'Store', 'Home Gret`s', 'Farm',
    'Market', 'Mail'
]

function routeRobot(state, memory) {
    if (memory.length == 0){
        memory = mailRoute;
    }
    let direction = memory[0];
    let newMemory = memory.slice(1);
    return {direction, memory: newMemory};
}

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for(let i = 0; i < work.length; i++){
        let {at, route} = work[i];
        for(let place of graph[at]){
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)})
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        };
    };
    return {direction: route[0], memory: route.slice(1)};
};
runRobot(VillageState.random(), goalOrientedRobot, [])
/*
function compareRobots(robot1, memory1, robot2, memory2) {
    let tasks = [];
    for (let i = 0; i < 100; i++) {
        tasks.push(VillageState.random());
        console.log(tasks);
    }
    let totalSteps1 = 0, totalSteps2 = 0;
    for (let i = 0; i < tasks.length; i++) {
        totalSteps1 += countSteps(tasks[i], robot1, memory1);
        totalSteps2 += countSteps(tasks[i], robot2, memory2);
    }
    console.log(`Robot 1 average steps per task: ${Math.floor(totalSteps1 / 100)}`);
    console.log(`Robot 2 average steps per task: ${Math.floor(totalSteps2 / 100)}`);
}

function countSteps(state, robot, memory) {
    for (let steps = 0;; steps++) {
        if (state.parcels.length == 0) {
            return steps;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

compareRobots(goalOrientedRobot, [], randomRobot, []);
*/