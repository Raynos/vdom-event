var test = require("tape")

var vdomEvent = require("../index")

test("vdomEvent is a function", function (assert) {
    assert.equal(typeof vdomEvent, "function")
    assert.end()
})
