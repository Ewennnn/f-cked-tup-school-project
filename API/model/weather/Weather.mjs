'use script'

export default class Weather {
    timestamp
    weather
    temp2m
    probarain
    wind10m
    probawind70

    constructor(obj) {
        Object.assign(this, obj)
    }
}