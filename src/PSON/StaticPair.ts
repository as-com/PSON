import {Pair} from "./Pair";
import {Encoder} from "./Encoder";
import {Decoder} from "./Decoder";

/**
 * Constructs a new static PSON encoder and decoder pair.
 * @exports PSON.StaticPair
 * @class A static PSON encoder and decoder pair.
 * @param {Array.<string>=} dict Static dictionary
 * @param {Object.<string,*>=} options Options
 * @constructor
 */
export class StaticPair extends Pair {
    constructor(dict: string[], options: { [key: string]: any }) {
        super();

        this.encoder = new Encoder(dict, false, options);
        this.decoder = new Decoder(dict, false, options);
    }
}
