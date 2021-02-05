"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
var readline = require('readline');
var cliCursor = require('cli-cursor');
var spinners = require('./spinners.json');
var isWindows = process.platform === 'win32';
var Spinner = /** @class */ (function () {
    function Spinner(options) {
        if (options === void 0) { options = {}; }
        this.stream = options.stream || process.stdout;
        this.isSpinning = false;
        this.spinnerType = isWindows ? 'default' : options.spinnerType || 'default';
        this.spinnerIndex = 0;
        this.spinner = spinners[this.spinnerType];
        this.ticker = undefined;
        this.runtime = 0;
        this.message = options.message || '';
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
        this.ticker = undefined;
        readline.clearLine(this.stream, 0);
        readline.cursorTo(this.stream, 0);
        cliCursor.show(this.stream);
    };
    Spinner.prototype._update = function () {
        var _a;
        readline.clearLine(this.stream, 0);
        readline.cursorTo(this.stream, 0);
        this.runtime += this.spinner.interval;
        (_a = this.stream) === null || _a === void 0 ? void 0 : _a.write(this.spinner.frames[this.spinnerIndex] + " " + this.message);
        this.spinnerIndex = (this.spinnerIndex + 1) % this.spinner.frames.length;
    };
    return Spinner;
}());
exports.Spinner = Spinner;
