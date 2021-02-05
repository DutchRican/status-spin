import { Spinner } from '../lib/index';

describe('Spinner', () => {

    it('should create an object', () => {
        const spinner = new Spinner({message: 'test'});
        expect(spinner).not.toBeUndefined();
    });

    it('should have the default spinnerType', () => {
        const spinner = new Spinner({message: 'test'});
        expect(spinner.spinnerType).toEqual('default');
    });

    it('should let me set the spinnerType', () => {
        const spinner = new Spinner({spinnerType: 'track'});
        expect(spinner.spinnerType).toEqual('track');
    });

    it('should set the isSpinning to false', () => {
        const spinner = new Spinner({message: 'test'});
        expect(spinner.isSpinning).toBeFalsy();
    });

    it('should set and clear the ticker', () => {
        const spinner = new Spinner();
        expect(spinner.ticker).toBeUndefined();
        spinner.start();
        expect(spinner.ticker).not.toBeUndefined();
        spinner.stop();
        expect(spinner.ticker).toBeUndefined();
    });

    it('should update the message shown to the user', () => {
        const spinner = new Spinner({message: ''});
        const msg = 'test'
        expect(spinner.message).toEqual('');
        spinner.updateMessage(msg);
        expect(spinner.message).toEqual(msg);
    });
});