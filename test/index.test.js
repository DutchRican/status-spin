const assert = require('assert');
const { Spinner } = require('../bin/index');
const { isNullOrUndefined, isFunction } = require('util');

describe('Spinner', () => {
    let spinner;
    beforeEach(() => {
        spinner = new Spinner();
    });
    
    it('should create an object', () => {
        assert.notStrictEqual(spinner, isNullOrUndefined);
    });

    it('should have the default spinnerType', () => {
        assert.equal(spinner.spinnerType, 'default');
    });

    it('should let me set the spinnerType', () => {
        spinner = new Spinner({spinnerType: 'track'});
        assert.strictEqual(spinner.spinnerType, 'track');
    });

    it('should set the isSpinning to false', () => {
        assert.strictEqual(spinner.isSpinning, false);
    });
    it('should set and clear the ticker', () => {
        assert.strictEqual(spinner.ticker, undefined);
        spinner.start();
        assert.notStrictEqual(spinner.ticker, isNullOrUndefined);
        spinner.stop();
        assert.strictEqual(spinner.ticker._destroyed, true);
    });
    it('should update the message shown to the user', () => {
        const msg = 'test'
        assert.strictEqual(spinner.message, '');
        spinner.updateMessage(msg);
        assert.strictEqual(spinner.message, msg);
    });
    it('should not expose the update function', () => {
        assert.notStrictEqual(spinner.update, isFunction);
    });
});