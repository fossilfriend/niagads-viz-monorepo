import React, {useEffect} from 'react';

/**
 * React Component utils
 * adapted from https://raw.githubusercontent.com/NIAGADS/WDKClient/master/Client/src/Utils/ComponentUtils.tsx
 */

interface AnyObject {
  [key: string]: any;
}

/**
 * Stateless function component decorator that prevents rerendering
 * when props are equal use shallow comparison.
 */
export function pure<P>(Component: React.FunctionComponent<P>) {
  return class PureWrapper extends React.PureComponent<P> {
    static get displayName() {
      return `PureWrapper(${Component.displayName || Component.name})`;
    }
    render() {
      return (
        <Component {...this.props}/>
      );
    }
  }
}

interface LoadPromiseFactory<T, U extends Partial<T> | void = void> {
  (props: DiffProps<T, U>): Promise<U>;
}

type DiffProps<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

interface LazyEnhance<T> {
  (Component: React.ComponentType<T>): React.ComponentClass<T>;
}


/**
 * A higher order component that allows a component to be rendered lazily.
 *
 * @example
 * lazy(function(render) {
 *   loadData('/some/data').then(function(data) {
 *     render({ data });
 *   })
 * })(ComponentThatNeedsData);
 */
export function lazy<T>(load: (props: T) => Promise<void>): LazyEnhance<T> {
  return function(Component: React.ComponentClass<T> | React.FunctionComponent<T>) {
    class Lazy extends React.Component<T, { loading: boolean }> {
      displayName = `Lazy(${Component.displayName || Component.name})`;
      mounted?: boolean;
      constructor(props: T) {
        super(props);
        this.state = { loading: true }
      }
      componentDidMount() {
        this.mounted = true;
        load(this.props).then(() => {
          if (this.mounted === false) return;
          this.setState({ loading: false });
        });
      }
      componentWillUnmount() {
        this.mounted = false;
      }
      render() {
        return this.state.loading ? null :
          <Component {...this.props}/>
      }
    }
    return Lazy;
  }
}

export function delay<P>(ms: number) {
  return lazy<P>(() => new Promise(resolve => setTimeout(resolve, ms)));
}


interface InstrumentOptions {
  compareProps?: boolean;
}
/**
 * Takes a component and returns an intrumented wrapper component
 * that will log details about props, etc.
 *
 * This should never be used in production code!
 */
export function instrument<P>(Component: React.ComponentClass<P>, options: InstrumentOptions): React.ComponentClass<P>;
export function instrument<P>(Component: React.FunctionComponent<P>, options: InstrumentOptions): React.ComponentClass<P>;
export function instrument<P>(Component: any, options: InstrumentOptions = {}): React.ComponentClass<P> {
  let {
    compareProps = true
  } = options;
  let componentName = Component.displayName || Component.name || Component;

  return class InstrumentWrapper extends React.Component<P> {
    shouldComponentUpdate(nextProps: P) {
      if (compareProps) {
        logShallowComparison(
          this.props,
          nextProps,
          'Comparing props for ' + componentName
        );
      }
      return true;
    }
    render() {
      return <Component {...this.props}/>;
    }
  }
}

/** Helper to log the results of a shallow comparison */
function logShallowComparison<P extends AnyObject>(obj1: P, obj2: P, label: string = 'Shallow comparison') {
  console.group(label);
  console.log('Comparing %o and %o', obj1, obj2);
  let allKeys = new Set(Object.keys(obj1).concat(Object.keys(obj2)));
  for (let key of allKeys) {
    let equal = obj1[key] === obj2[key];
    if (!equal) {
      console.log('`%s` not equal', key);
    }
  }
  console.groupEnd();
}


/** Create a React Element using preformatted HTML */
export function safeHtml<P>(str: string, props?: P, Component?: React.ComponentClass<P>): JSX.Element;
export function safeHtml<P>(str: string, props?: P, Component?: React.FunctionComponent<P>): JSX.Element;
export function safeHtml<P>(str: string, props?: P, Component?: string): JSX.Element;
export function safeHtml<P>(str = '', props?: P, Component: any = 'span'): JSX.Element {
  // Use innerHTML to auto close tags
  let container = document.createElement('div');
  container.innerHTML = str;
  return <Component {...props} dangerouslySetInnerHTML={{ __html: container.innerHTML }}/>;
}

/**
 * Makes a copy of the passed original object, subtracting the properties with
 * names in the propsToFilter arg, which should be Array[String].
 */
export function filterOutProps<P extends AnyObject>(orig: P, propsToFilter: string[]) {
  return Object.keys(orig).reduce((obj, key) =>
    (propsToFilter.indexOf(key) !== -1 ? obj :
      Object.assign(obj, { [key]: orig[key] })), {});
}


/**
 * Makes a copy of current, adds value if not present, removes if present, and
 * returns the copy.
 * @param {Array<T>} array array to modify
 * @param {<T>} value to check against
 * @return {Array<T>} modified copy of original array
 */
export function addOrRemove<T>(array: T[], value: T) : T[] {
  return (array.indexOf(value) == -1 ?
    // not currently present; add
    array.concat(value) :
    // already there; remove
    array.filter(elem => elem != value));
}

/**
 * Looks for the property with the passed name in the given object.  If the
 * object or the property is null or undefined, returns default value.
 * Otherwise returns the value found.
 */
export function getValueOrDefault<T>(object: AnyObject, propertyName: string, defaultValue: T): T {
  return (object == null || object == undefined ||
      object[propertyName] == null || object[propertyName] == undefined ?
      defaultValue : object[propertyName]);
}

/**
 * Returns a change handler that will 'bubble' a state change to the
 * onParentChange function passed in.  The value passed to the parent handler is
 * a copy of previousState with a new value applied to the name this function
 * was called with.
 */
export function getChangeHandler<S extends {}, T>(inputName: string, onParentChange: (s: S) => S, previousState: S) {
  return (newValue: T) => {
    onParentChange(Object.assign({}, previousState, { [inputName]: newValue }));
  };
}

/**
 * For each property in propertyNameList, examines each property in both
 * oldProps and newProps to check for referential equality.  If any prop differs
 * returns true, else returns false.
 *
 * @param {Object} oldProps props object
 * @param {Object} newProps another props object
 * @param {Array<String>} propertyNameList list of properties to examine
 * @return {boolean} false if all properties are referentially identical, else true
 */
export function propsDiffer<P extends AnyObject>(oldProps: P, newProps: P, propertyNameList: string[]) {
  for (let i = 0; i < propertyNameList.length; i++) {
    if (oldProps[propertyNameList[i]] !== newProps[propertyNameList[i]]) {
      return true;
    }
  }
  return false;
}

interface HandlerSetObject {
  [key: string]: (...args: any[]) => any;
}

/**
 * Bind a collection of action functions to a dispatchAction function.
 *
 * @param {Function} dispatchAction
 * @param {Object<Function>} actions
 */
export function wrapActions(dispatchAction: Function, ...actionObjects: HandlerSetObject[]): HandlerSetObject {
  let wrappedActions: HandlerSetObject = {};
  for (let actionObject of actionObjects) {
    for (let key in actionObject) {
      wrappedActions[key] = function wrappedAction(...args: any[]): Function {
        return dispatchAction(actionObject[key](...args));
      }
    }
  }
  return wrappedActions;
}

/**
 * Takes an object containing named functions and an object (usually 'this')
 * and returns a new object containing copies of the original functions that
 * are bound to objectToBind.
 *
 * @param {Object} handlerSetObject set of named functions
 * @param {Object} objectToBind object to which copies of named functions will be bound
 * @return {Object} copy of handlerSetObject with newly bound copies of original functions
 */
export function bindEventHandlers(handlerSetObject: HandlerSetObject, objectToBind: any): HandlerSetObject {
  let newHandlers: HandlerSetObject = {};
  for (let key in handlerSetObject) {
    newHandlers[key] = handlerSetObject[key].bind(objectToBind);
  }
  return newHandlers;
}

/**
 * Create a helper for generating classNames that follow a BEM-inspired naming
 * convention.
 *
 * @example
 * ```
 * let makeClassName = makeClassNameHelper('wdk-Page');
 * makeClassName(); //=> 'wdk-Page'
 * makeClassName('Title'); //=> 'wdk-PageTitle'
 * makeClassName('Title', 'muted'); //=> 'wdk-PageTitle wdk-PageTitle__muted'
 * makeClassName('Title', 'muted', 'blue'); //=> 'wdk-PageTitle wdk-PageTitle__muted wdk-PageTitle__blue'
 * ```
 */
export function makeClassNameHelper(baseClassName: string) {
  return function makeClassName(suffix = '', ...modifiers: any[]) {
    let className = baseClassName + suffix;
    let modifiedClassNames = modifiers
      .filter(modifier => typeof modifier === 'string' && modifier !== '')
      .map(modifier => ' ' + className + '__' + modifier)
      .join('');

    return className + modifiedClassNames;
  }
}

/**
 * Type guard that narrows an object's type such that the interrogated property value is not null or undefined.
 */
export function propertyIsNonNull<T, K extends keyof T>(object: T, key: K): object is T & { [Key in K]-?: T[K] } {
  return object[key] != null;
}

export function useSetDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
    return () => { document.title = ''; }
  }, [ title ]);
}
