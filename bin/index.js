"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
var readline = require('readline');
var cliCursor = require('cli-cursor');
var spinners = require('./spinners.json');
var isWindows = process.platform === 'win32';
/**{ message: string }}
 * @type {{spinnerType: 'default|dots|track|clocks|dotScroll|boxCircle|equalizer|lunarCycle',
  message: string, stream: NodeJS.WritableStream}}
 */
var baseOptions = {
    spinnerType: 'default',
    message: '',
    stream: process.stdout
};
/**@param {baseOptions: BaseOptionsIFace} [options]  */
var Spinner = /** @class */ (function () {
    function Spinner(options) {
        var opts = Object.assign(baseOptions, options);
        this.stream = opts.stream;
        this.isSpinning = false;
        this.spinnerType = isWindows ? 'default' : opts.spinnerType;
        this.spinnerIndex = 0;
        this.spinner = spinners[this.spinnerType];
        this.ticker = undefined;
        this.runtime = 0;
        this.message = opts.message;
    }
    Spinner.prototype.start = function () {
        var _this = this;
        this.isSpinning = true;
        cliCursor.hide(this.stream);
        this.ticker = setInterval(function () { return _this._update.call(_this); }, this.spinner.interval, false);
    };
    Spinner.prototype.updateMessage = function (message) {
        this.message = message;
    };
    Spinner.prototype.stop = function () {
        this.isSpinning = false;
        if (this.ticker)
            clearInterval(this.ticker);
        readline.clearLine(this.stream, 0);
        readline.cursorTo(this.stream, 0);
        cliCursor.show(this.stream);
    };
    Spinner.prototype._update = function () {
        readline.clearLine(this.stream, 0);
        readline.cursorTo(this.stream, 0);
        this.runtime += this.spinner.interval;
        this.stream.write(this.spinner.frames[this.spinnerIndex] + " " + this.message);
        this.spinnerIndex = (this.spinnerIndex + 1) % this.spinner.frames.length;
    };
    return Spinner;
}());
exports.Spinner = Spinner;
