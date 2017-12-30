import * as ByteBuffer from "bytebuffer";
import {
	ARRAY, BINARY, DOUBLE, EARRAY, EOBJECT, ESTRING, FALSE, FLOAT, INTEGER, LONG, MAX, NULL, OBJECT, STRING,
	STRING_ADD, STRING_GET, TRUE
} from "./T";

/**
 * Constructs a new PSON Decoder.
 * @exports PSON.Decoder
 * @class A PSON Decoder.
 * @param {Array.<string>} dict Initial dictionary values
 * @param {boolean} progressive Whether this is a progressive or a static decoder
 * @param {Object.<string,*>=} options Options
 * @constructor
 */
export class Decoder {
	constructor(private dict: string[] = [], private progressive: boolean, private options: { [opt: string]: any } = {}) {

	}

	/**
	 * Decodes PSON to JSON.
	 * @param {!(ByteBuffer|ArrayBuffer|Buffer)} buf PSON
	 * @returns {?} JSON
	 */
	decode(buf: ByteBuffer | ArrayBuffer | Buffer) {
		if (!(buf instanceof ByteBuffer)) {
			buf = ByteBuffer.wrap(buf);
		}

		const le = buf.littleEndian;
		try {
			const val = this.decodeValue(buf.LE());
			buf.littleEndian = le;
			return val;
		} catch (e) {
			buf.littleEndian = le;
			throw(e);
		}
	}

	/**
	 * Decodes a single PSON value to JSON.
	 * @param {!ByteBuffer} buf Buffer to decode from
	 * @returns {?} JSON
	 * @private
	 */
	private decodeValue(buf: ByteBuffer): any {
		let t = buf.readUint8();
		if (t <= MAX) {
			return ByteBuffer.zigZagDecode32(t);
		} else {
			switch (t) {
				case NULL:
					return null;
				case TRUE:
					return true;
				case FALSE:
					return false;
				case EOBJECT:
					return {};
				case EARRAY:
					return [];
				case ESTRING:
					return "";
				case OBJECT:
					t = buf.readVarint32(); // #keys
					const obj: any = {};
					while (--t >= 0) {
						obj[this.decodeValue(buf)] = this.decodeValue(buf);
					}
					return obj;
				case ARRAY:
					t = buf.readVarint32(); // #items
					const arr = [];
					while (--t >= 0) {
						arr.push(this.decodeValue(buf));
					}
					return arr;
				case INTEGER:
					return (<any> buf)["readVarint32ZigZag"](); // TODO: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/22580
				case LONG:
					const r = buf.readVarint64ZigZag();
					if (r.lessThanOrEqual(Number.MAX_SAFE_INTEGER) && r.greaterThanOrEqual(Number.MIN_SAFE_INTEGER)) {
						return r.toNumber();
					}
					return r;
				case FLOAT:
					return buf.readFloat32();
				case DOUBLE:
					return buf.readFloat64();
				case STRING:
					return buf.readVString();
				case STRING_ADD:
					const str = buf.readVString();
					this.dict.push(str);
					return str;
				case STRING_GET:
					return this.dict[buf.readVarint32()];
				case BINARY:
					t = buf.readVarint32();
					const ret = buf.slice(buf.offset, buf.offset + t);
					buf.offset += t;
					return ret;
				default:
					throw(new Error(`Illegal type at ${buf.offset}: ${t}`));
			}
		}
	}
}

