import { WriteStream } from "fs";

export interface BaseOptionsIFace {
    spinnerType?: SpinnerType;
    message?: string;
    stream?: NodeJS.WriteStream
}

export interface SpinnerTypesIFace {
    [key:string]: SpinnerTypeIFace;
}
export interface SpinnerTypeIFace {
    frames: string[];
    interval: number;
}

export type SpinnerType =
    'default'|'dots'|'track'|'clocks'|'dotScroll'|'boxCircle'|'equalizer'|'lunarCycle';