declare class Crypto {

  getRandomValues(
    typedArray: Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array
  ): void;

}

declare var crypto: Crypto;