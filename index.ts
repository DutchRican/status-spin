const readline = require('readline');
const cliCursor = require('cli-cursor');
const spinners = require('./spinners.json');
import { BaseOptionsIFace, SpinnerTypeIFace, SpinnerType } from './types';
const isWindows = process.platform === 'win32';

export class Spinner {
    stream?: NodeJS.WriteStream;
    isSpinning: boolean;
    spinnerType?: SpinnerType;
    spinnerIndex: number;
    spinner: SpinnerTypeIFace;
    ticker?: NodeJS.Timeout;
    runtime: number;
    message: string;

    constructor(options: BaseOptionsIFace = {}) {
        this.stream = options.stream || process.stdout;
        this.isSpinning = false;
        this.spinnerType = isWindows ? 'default' : options.spinnerType || 'default';
        this.spinnerIndex = 0;
        this.spinner = spinners[this.spinnerType];
        this.ticker = undefined;
        this.runtime = 0;
        this.message = options.message || '';
    }

    start() {
        this.isSpinning = true;
        cliCursor.hide(this.stream);
        this.ticker = setInterval(() => this._update.call(this), this.spinner.interval, false)
    }

    updateMessage(message: string) {
        this.message = message;
    }

    stop() {
        this.isSpinning = false;
        if (this.ticker) clearInterval(this.ticker);
        this.ticker = undefined;
        readline.clearLine(this.stream, 0);
        readline.cursorTo(this.stream, 0);
        cliCursor.show(this.stream);
    }

    private _update() {
        readline.clearLine(this.stream, 0);
        readline.cursorTo(this.stream, 0);
        this.runtime += this.spinner.interval;
        this.stream?.write(`${this.spinner.frames[this.spinnerIndex]} ${this.message}`);
        this.spinnerIndex = (this.spinnerIndex + 1) % this.spinner.frames.length;
    }
}
