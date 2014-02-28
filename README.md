# vdom-event

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

Add dom-delegator events to your vdom tree

Add declaratively defined events to your virtual DOM tree. 
  Decoupling your `render` function from your application state

## Example

```js
var event = require("vdom-event")
var document = require("global/document")
var h = require("virtual-dom/h")
var toElement = require("virtual-dom/render")
var EventSinks = require("event-sinks/geval")
var Delegator = require("dom-delegator")
var uuid = require("uuid")

// place in render.js
function render(state, sinks) {
    return h(".cats", state.cats.map(function (cat) {
        return h("div", [
            h("span", cat.name),
            h("img", { src: cat.image })
            h("button.hate", {
                "data-click": event(sinks.hate, cat.id)
            }, "Hate this cat")
            h("button.favorite", {
                "data-click": event(sinks.favorite, cat.id)
            }, "Favorite this cat")
        ])
    }))
}

// place in state.js
function Cat(name, image) {
    if (!(this instanceof Cat)) {
        return new Cat(name, image)
    }

    this.name = name
    this.image = image
    this.id = uuid()
    this.hated = 0
    this.favorited = 0
}

var state = {
    cats: [
        Cat("bob", "http://placekitten/200/300"),
        Cat("steve", "http://placekitten/300/400"),
        Cat("super cat", "http://placekitten/300/300")
    ]
}

// place in entry.js
var delegator = Delegator(document.body)
var events = EventSinks(delegator.id, ["hate", "favorite"])

var scene = render(state, events.sinks)
document.body.appendChild(toElement(scene))

// place in state.js / input.js
var catHash = state.cats.reduce(function (acc, cat) {
  acc[cat.id] = cat
  return acc
}, {})

events.hate(function (tuple) {
  var id = tuple.value.id

  catHash[id].hated++
})

events.favorite(function (tuple) {
  var id = tuple.value.id

  catHash[id].favorited++
})
```

## Installation

`npm install vdom-event`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/vdom-event.png
  [2]: https://travis-ci.org/Raynos/vdom-event
  [3]: https://badge.fury.io/js/vdom-event.png
  [4]: https://badge.fury.io/js/vdom-event
  [5]: https://coveralls.io/repos/Raynos/vdom-event/badge.png
  [6]: https://coveralls.io/r/Raynos/vdom-event
  [7]: https://gemnasium.com/Raynos/vdom-event.png
  [8]: https://gemnasium.com/Raynos/vdom-event
  [9]: https://david-dm.org/Raynos/vdom-event.png
  [10]: https://david-dm.org/Raynos/vdom-event
  [11]: https://ci.testling.com/Raynos/vdom-event.png
  [12]: https://ci.testling.com/Raynos/vdom-event
