# spacecolony.one

## Development

Prepare changes to the user interface by modifying /nodejs/app/components/ and testing with
```
npm start
```
and a brower at
```
http://localhost:8080
```

Validate in /appengine/ with
```
run.bat
```
and a brower at
```
http://localhost:8080
```

Deploy in //appengine/ with
```
deploy
```

## System model
Systems are modelled in "normal" conditions - normal behavior in normal environment.
Input and output flows are aggregated to daily volumes. In the future we may check for depletion of resources within a cycle by pre-compiling the aggregations. This will mean that we will run the cycles of all subsystems on their own scale so that we make sure the aggregation really works.
For example, if a human breathes 11000 liters of air per day and air conditioner circulates 24000 liters of fresh air per day, then the aggregation will be sufficient for the human. But if the air conditioner pipes the air into a space suit and pumps in 1000 liters of fresh air once per hour, then obviously it will not work for the human.
It will be good to draw a chart with cycle time for x-axis and volume for y-axis for the matter/energy/information consumed or produced by the system. The aggregated daily volume will be the area.

## Simulations
Risk simulations run like this:
- First we go through rounds when a single system degraded performance by 33% - 33% increase in consumption or 33% decrease in production
- Then we go through rounds when three systems degrade by 33%
- Then single system degrade by 66%
- Then three systems degrade by 66%
- Then one system degrade by 100%
- Then three systems degrade by 100%

