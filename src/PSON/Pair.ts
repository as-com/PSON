/**
 * Constructs a new abstract PSON encoder and decoder pair.
 * @exports PSON.Pair
 * @class An abstract PSON encoder and decoder pair.
 * @constructor
 * @abstract
 */
import {Encoder} from "./Encoder";
import {Decoder} from "./Decoder";

export abstract class Pair {
    protected encoder: Encoder;
    protected decoder: Decoder;

    /**
     * Encodes JSON to PSON.
     * @param {*} json JSON
     * @returns {!ByteBuffer} PSON
     * @expose
     */
    encode(json: any) {
        return this.encoder.encode(json);
    }

    /**
     * Encodes JSON straight to an ArrayBuffer of PSON.
     * @param {*} json JSON
     * @returns {!ArrayBuffer} PSON as ArrayBuffer
     * @expose
     */
    toArrayBuffer(json: any) {
        return this.encoder.encode(json).toArrayBuffer();
    }

    /**
     * Encodes JSON straight to a node Buffer of PSON.
     * @param {*} json JSON
     * @returns {!Buffer} PSON as node Buffer
     * @expose
     */
    toBuffer(json: any) {
        return this.encoder.encode(json).toBuffer();
    }

    /**
     * Decodes PSON to JSON.
     * @param {ByteBuffer|ArrayBuffer|Buffer} pson PSON
     * @returns {*} JSON
     * @expose
     */
    decode(pson: any) {
        return this.decoder.decode(pson);
    }
}


