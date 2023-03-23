import ByteArray from 'openfl/utils/ByteArray';
import Endian from 'openfl/utils/Endian';

export function arrayBufferToByteArray(buffer:Uint8Array, endianness = Endian.BIG_ENDIAN) {
  var byteArray:ByteArray = new ByteArray(buffer.byteLength);
  byteArray.endian = endianness;
  for (let i = 0; i < buffer.byteLength; i++) {
    byteArray.writeByte(buffer[i]);
  }
  byteArray.position = 0;

  return byteArray;
}

export function byteArrayToArrayBuffer(byteArray:ByteArray) {
  byteArray.position = 0;
  var arrayBuffer = new Uint8Array(byteArray.length);
  for (let i = 0; i < arrayBuffer.length; i++) {
    arrayBuffer[i] = byteArray.readByte();
  }
  byteArray.position = 0;

  return arrayBuffer;
}

export function arrayBufferToHexString(buffer:ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map(function (x) {
      let result = x.toString(16);
      while (result.length < 2) {
        result = '0' + result;
      }

      return result;
    })
    .join('');
}
