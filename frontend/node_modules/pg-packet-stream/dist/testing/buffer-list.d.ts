/// <reference types="node" />
export default class BufferList {
    buffers: Buffer[];
    constructor(buffers?: Buffer[]);
    add(buffer: Buffer, front?: boolean): this;
    addInt16(val: number, front?: boolean): this;
    getByteLength(initial?: number): number;
    addInt32(val: number, first?: boolean): this;
    addCString(val: string, front?: boolean): this;
    addString(val: string, front?: boolean): this;
    addChar(char: string, first?: boolean): this;
    addByte(byte: number): this;
    join(appendLength?: boolean, char?: string): Buffer;
    static concat(): Buffer;
}
