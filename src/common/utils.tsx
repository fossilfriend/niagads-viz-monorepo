// checks if object is defined before checking if object has key
export const _hasOwnProperty = (key:string, object: any) => (object !== undefined && object.hasOwnProperty(key))

// wrapper get; allows bypassing of some typescript issues
// e.g., strict nulls, generics with expected properties
export const _get = (key: string, object: any, alt:any=null ) => {
    if (_hasOwnProperty(key, object)) {
        return object[key]
    }
    return alt
}

// trick for deep copy
// see https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
export const _deepCopy = (obj: any) => (JSON.parse(JSON.stringify(obj)));

export const _isObject = (a: any) => a instanceof Object;

export const _isJSON = (value: any) => {
    try {
        value = JSON.parse(value);
    } catch (e) {
        // catch numbers, nulls, booleans
        return _isObject(value) && value != null;
    }

    // catch numbers, nulls, booleans
    return _isObject(value) && value != null;
    
};
