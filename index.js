var addEvent = require('dom-delegator/add-event')

module.exports = event

function event(sink, data) {
    return function (elem, property) {
        var eventName = property.substr(5)

        addEvent(elem, eventName, sink, data)
    }
}
