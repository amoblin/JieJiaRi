# 节假日信息查询

```
$ cd src; ./index.js
Usage: ./index.js [start date]
       ./index.js [start date] [end date]
```

Sample

```
$ cd src; ./index.js 2018-09-26 2018-10-08
{
    "custom": [],
    "workdays": [
        {
            "workdays": [
                "2018-09-25",
                "2018-09-26",
                "2018-09-27",
                "2018-09-28",
                "2018-09-29"
            ],
            "date": "2018-09-24"
        },
        {
            "workdays": [
                "2018-09-30"
            ],
            "date": "2018-10-01"
        },
        {
            "workdays": [
                "2018-10-08",
                "2018-10-09",
                "2018-10-10",
                "2018-10-11",
                "2018-10-12"
            ],
            "date": "2018-10-08"
        }
    ]
}
```
