const assert = require('assert');
const { Spinner } = require('..');
const { isNullOrUndefined, isFunction } = require('util');

describe('Spinner', () => {
    let spinner;
    beforeEach(() => {
        spinner = new Spinner();
    });
    
    it('should create an object', () => {
        assert.notEqual(spinner, isNullOrUndefined);
    });

    it('should have the default spinnerType', () => {
        assert.equal(spinner.spinnerType, 'default');
    });

    it('should let me set the spinnerType', () => {
        spinner = new Spinner({spinnerType: 'track'});
        assert.equal(spinner.spinnerType, 'track');
    });

    it('should set the isSpinning to false', () => {
        assert.equal(spinner.isSpinning, false);
    });
    it('should set and clear the ticker', () => {
        assert.equal(spinner.ticker, undefined);
        spinner.start();
        assert.notEqual(spinner.ticker, isNullOrUndefined);
        spinner.stop();
        assert.equal(spinner.ticker._destroyed, true);
    });
    it('should update the message shown to the user', () => {
        const msg = 'test'
        assert.equal(spinner.message, '');
        spinner.updateMessage(msg);
        assert.equal(spinner.message, msg);
    });
    it('should not expose the update function', () => {
        assert.notEqual(spinner.update, isFunction);
    });
});