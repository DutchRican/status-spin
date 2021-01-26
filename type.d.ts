import { WriteStream } from "fs";

export interface BaseOptionsIFace {
    spinnerType: string;
    message: string;
    stream: NodeJS.WriteStream
}

export interface SpinnerTypesIFace {
    [key:string]: SpinnerTypeIFace;
}
export interface SpinnerTypeIFace {
    frames: string[];
    interval: number;
}