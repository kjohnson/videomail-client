var h = require('hyperscript')

module.exports = function(visuals, options) {

    var self = this,

        countdownElement,
        intervalId,
        countdown

    function fire(cb) {
        self.unload()
        self.hide()

        // keep all callbacks async
        setTimeout(function() {
            cb()
        }, 0)
    }

    function countBackward(cb) {
        countdown--

        if (countdown < 1)
            fire(cb)
        else
            countdownElement.innerHTML = countdown
    }

    this.start = function(cb) {
        countdownElement.innerHTML = countdown = options.video.countdown

        this.show()

        intervalId = setInterval(countBackward.bind(this, cb), 1e3)
    }

    this.build = function() {
        countdownElement = visuals.querySelector('.countdown')

        if (!countdownElement) {
            countdownElement = h('p.countdown')

            this.hide()

            visuals.appendChild(countdownElement)
        } else
            this.hide()
    }

    this.show = function() {
        countdownElement.classList.remove('hide')
    }

    this.isCountingDown = function() {
        return !!intervalId
    }

    this.unload = function() {
        clearInterval(intervalId)
        intervalId = null
    }

    this.hide = function() {
       countdownElement.classList.add('hide')
       this.unload()
    }
}
