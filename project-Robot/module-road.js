const roads = [
    'Home Alice`s-Home Bob`s',      'Home Alice`s-Stockroom',
    'Home Alice`s-Mail',            'Home Bob`s-Town hall',
    'Home Dary`s-Home Ern`s',       'Home Dary`s-Town hall',
    'Home Erni`s-Home Gret`s',      'Home Gret`s-Farm',
    'Home Gret`s-Store',            'Market`s-Farm',
    'Market`s-Mail',                'Market`s-Store',
    'Market`s-Town hall',           'Store`s-Town hall'
];

const {BuildGraph} = require('./module')
const roadGraph = BuildGraph(roads);

module.exports = {roadGraph}