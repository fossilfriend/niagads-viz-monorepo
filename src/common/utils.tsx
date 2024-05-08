// checks if object is defined before checking if object has key
export const _hasOwnProperty = (key:string, object: Record<string, any>) => (object !== undefined && object.hasOwnProperty(key))