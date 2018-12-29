#!/usr/bin/env node

const util = require('util')
const path = require('path')

const weekdayOfDay = function(day, weekday) {
    const delta = weekday - day.getDay()
    return deltaDay(day, delta)
}

const deltaDay = function(day, delta) {
    d = new Date(day.getTime())
    d.setDate(d.getDate() + delta)
    return d
}

const workdays = (startDay, endDay, config) => {
    const sDate = new Date(startDay)
    const eDate = new Date(endDay)

    const sMon = weekdayOfDay(sDate, 1)
    const sSat = weekdayOfDay(sDate, 6)
    const sSun = weekdayOfDay(sDate, 0)

    const eMon = weekdayOfDay(eDate, 1)
    const eSat = weekdayOfDay(eDate, 6)
    const eSun = weekdayOfDay(eDate, 0)

    const timeDiff = Math.abs(sMon.getTime() - eMon.getTime()) / 1000
    const weeks = Math.ceil(timeDiff / (3600 * 24 * 7)) + 1
    const results = []
    let d = sMon
    for (let i=0; i < weeks; i++) {
        const item = {
            workdays: []
        }
        item.date = d.toJSON().split("T")[0]
        const Sun = deltaDay(d, -1)
        if (config.workdays.includes(date2str(Sun))) {
            item.workdays.push(date2str(Sun))
        }
        for (let j=0; j < 5; j++) {
            if (config.holidays.includes(date2str(d)) == false) {
                item.workdays.push(date2str(d))
            }
            d.setDate(d.getDate() + 1)
        }
        if (config.workdays.includes(date2str(d))) {
            item.workdays.push(date2str(d))
        }
        d.setDate(d.getDate() + 2)
        results.push(item)
    }
    return results
}

const data = require("../data/2018.json")

const config = {
    workdays: [],
    holidays: []
}

const date2str = (d) => {
    return d.toJSON().split("T")[0]
}

for (const holiday of data.holidays) {
    const d = new Date(holiday.start)
    config.holidays.push(date2str(d))
    if (holiday.days && holiday.days > 1) {
        for(let i=1; i<holiday.days; i++) {
            //ts += 24 * 60 * 60
            d.setDate(d.getDate() + 1)
            config.holidays.push(date2str(d))
        }
    }
    if (holiday.workday) {
        for (const ds of holiday.workday) {
            config.workdays.push(date2str(new Date(ds)))
        }
    }
}

const args = process.argv.slice(2);
const script_name  = path.basename(__filename);
if (args.length < 1) {
    console.log("Usage: ./%s [start date]", script_name);
    console.log("       ./%s [start date] [end date]", script_name);
    return;
}

const startStr = args[0]

let endStr
if (args.length < 2) {
   endStr = date2str(new Date())
} else {
    endStr = args[1]
}

let results = workdays(startStr, endStr, config)
console.log(results)
