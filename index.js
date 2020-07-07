const readline = require('readline');
const cliCursor = require('cli-cursor');

const spinners = require('./spinners.json');

/**{ message: string }}
 * @type {{spinnerType: 'default|dots|track|clocks|dotScroll|boxCircle|equalizer|lunarCycle', 
  message: string, stream: NodeJS.WritableStream}}
 */
const base_options = {
    spinnerType: 'default',
    message: '',
    stream: process.stdout
}

/**@param {base_options} [options]  */
function Spinner(options) {
    const opts = Object.assign(base_options, options);
    this.stream = opts.stream;
    this.isSpinning = false;
    this.spinnerType = opts.spinnerType;
    this.spinnerIndex = 0;
    this.spinner = spinners[this.spinnerType];
    this.ticker = undefined;
    this.runtime = 0;
    this.message = opts.message;
}

Spinner.prototype.start = function () {
    this.isSpinning = true;
    cliCursor.hide(this.stream);
    this.ticker = setInterval(() => update.call(this), this.spinner.interval, false)
}

/**
 * 
 * @param {string} message  - Show the status or message to the user
 */
Spinner.prototype.updateMessage = function (message) {
    this.message = message;
}

/**
 * Stop the spinner and clear the interval
 */
Spinner.prototype.stop = function () {
    this.isSpinning = false;
    clearInterval(this.ticker);
    readline.clearLine(this.stream, 0);
    readline.cursorTo(this.stream, 0);
    cliCursor.show(this.stream);
}

function update() {
    readline.clearLine(this.stream, 0);
    readline.cursorTo(this.stream, 0);
    this.runtime += this.spinner.interval;
    this.stream.write(`${this.spinner.frames[this.spinnerIndex]} ${this.message}`);
    this.spinnerIndex = (this.spinnerIndex + 1) % this.spinner.frames.length;
}
module.exports.Spinner = Spinner;

// const s = new Spinner({ spinnerType: 'lunarCycle' });
// // const s = new Spinner({ message: 'defaults are shit' });
// s.start();

// setTimeout(() => s.stop(), 5000);