/// <reference types="node" />
import { Transform, TransformCallback, TransformOptions } from 'stream';
import { Mode } from './messages';
export declare type Packet = {
    code: number;
    packet: Buffer;
};
declare type StreamOptions = TransformOptions & {
    mode: Mode;
};
export declare class PgPacketStream extends Transform {
    private remainingBuffer;
    private reader;
    private mode;
    constructor(opts?: StreamOptions);
    _transform(buffer: Buffer, encoding: string, callback: TransformCallback): void;
    private handlePacket;
    _flush(callback: TransformCallback): void;
    private parseReadyForQueryMessage;
    private parseCommandCompleteMessage;
    private parseCopyData;
    private parseCopyInMessage;
    private parseCopyOutMessage;
    private parseCopyMessage;
    private parseNotificationMessage;
    private parseRowDescriptionMessage;
    private parseField;
    private parseDataRowMessage;
    private parseParameterStatusMessage;
    private parseBackendKeyData;
    parseAuthenticationResponse(offset: number, length: number, bytes: Buffer): any;
    private parseErrorMessage;
}
export {};
