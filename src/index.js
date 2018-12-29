#!/usr/bin/env node

const util = require('util')

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
    const weeks = Math.ceil(timeDiff / (3600 * 24 * 7))
    const results = []
    let Mon = sMon
    for (let i=0; i < weeks; i++) {
        const item = {}
        item.date = Mon.toJSON().split("T")[0]
        console.log(item)
    }

    /*
    console.log(sDate)
    console.log(sSunday)
    console.log(sMonday)
    console.log(sSatday)
    */
}

const data = require("../data/2018.json")

const config = {
    workdays: [],
    holidays: []
}

for (const holiday of data.holidays) {
    const d = new Date(holiday.start)
    config.holidays.push(d.toJSON().split("T")[0])
    if (holiday.days && holiday.days > 1) {
        for(let i=1; i<holiday.days; i++) {
            //ts += 24 * 60 * 60
            d.setDate(d.getDate() + 1)
            config.holidays.push(d.toJSON().split("T")[0])
        }
    }
    if (holiday.workday) {
        for (const ds of holiday.workday) {
            config.workdays.push(new Date(ds).toJSON().split("T")[0])
        }
    }
}

//workdays("2018-08-03", "2018-12-29")
//workdays("2018-08-04", "2018-12-30")
workdays("2018-12-20", "2018-12-25", config)
//workdays("2018-12-30", "2019-02-02")
