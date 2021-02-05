/// <reference types="node" />
import { BaseOptionsIFace, SpinnerTypeIFace, SpinnerType } from '../types';
export declare class Spinner {
    stream?: NodeJS.WriteStream;
    isSpinning: boolean;
    spinnerType?: SpinnerType;
    spinnerIndex: number;
    spinner: SpinnerTypeIFace;
    ticker?: NodeJS.Timeout;
    runtime: number;
    message: string;
    constructor(options?: BaseOptionsIFace);
    start(): void;
    updateMessage(message: string): void;
    stop(): void;
    private _update;
}
//# sourceMappingURL=index.d.ts.map