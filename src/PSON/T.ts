/**
 * PSON byte types.
 * @exports PSON.T
 * @namespace
 */

export const ZERO       = 0x00; // 0
//             0x01; // -1
//             0x02; // 1
//             ...   // zig-zag encoded varints
export const MAX        = 0xEF; // -120, max. zig-zag encoded varint

export const NULL       = 0xF0; // null
export const TRUE       = 0xF1; // true
export const FALSE      = 0xF2; // false
export const EOBJECT    = 0xF3; // {}
export const EARRAY     = 0xF4; // []
export const ESTRING    = 0xF5; // ""
export const OBJECT     = 0xF6; // {...}
export const ARRAY      = 0xF7; // [...]
export const INTEGER    = 0xF8; // number (zig-zag encoded varint32)
export const LONG       = 0xF9; // Long   (zig-zag encoded varint64)
export const FLOAT      = 0xFA; // number (float32)
export const DOUBLE     = 0xFB; // number (float64)
export const STRING     = 0xFC; // string (varint length + data)
export const STRING_ADD = 0xFD; // string (varint length + data, add to dictionary)
export const STRING_GET = 0xFE; // string (varint index to get from dictionary)
export const BINARY     = 0xFF; // bytes (varint length + data)
