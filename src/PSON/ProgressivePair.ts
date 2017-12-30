import {Pair} from "./Pair";
import {Encoder} from "./Encoder";
import {Decoder} from "./Decoder";

/**
 * Constructs a new progressive PSON encoder and decoder pair.
 * @exports PSON.ProgressivePair
 * @class A progressive PSON encoder and decoder pair.
 * @param {Array.<string>=} dict Initial dictionary
 * @param {Object.<string,*>=} options Options
 * @constructor
 */
export class ProgressivePair extends Pair {
	constructor(dict: string[], options: { [key: string]: any }) {
		super();

		this.encoder = new Encoder(dict, true, options);
		this.decoder = new Decoder(dict, true, options);
	}
}


