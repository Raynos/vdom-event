type Sink = require('event-sinks').Sink

vdom-event := (Sink, data: Any) => 
    (target: DOMElement, property: String)
