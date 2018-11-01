import { MonitreeModel } from './shared/models/monitree-info.model'

export const READINGS: MonitreeModel[] = [
    {
        id: 75,
        name: 'tree',
        date: '2018-11-01 12:02:12.621',
        temp: 77,
        creator: 'sensor',
        moisture: 61,
        humidity: 34,
        light: 69,
        watered: false
    },
    {
        id: 76,
        name: 'tree',
        date: '2018-11-01 13:02:04.188',
        temp: 77,
        creator: 'sensor',
        moisture: 60,
        humidity: 31,
        light: 67,
        watered: false
    },
    {
        id: 77,
        name: 'tree',
        date: '2018-11-01 14:01:49.519',
        temp: 75.2,
        creator: 'sensor',
        moisture: 60,
        humidity: 33,
        light: 70,
        watered: false
    }
];