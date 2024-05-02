
// for inheriting and modifying an interface or type
// allows overriding and adding to properties when extending an interface or type
// see cell.d.ts for example 
// and the stackoverflow discussion if need to build on this for nested properties
// from https://stackoverflow.com/a/55032655
export type Modify<T, R> = Omit<T, keyof R> & R;

// type mapping function to facilitate linking types
// to meaningful keys, e.g.: cell: CellType
// TypeMapper assumes that the interface or type has a property "type" 
// and creates a mapping T[type]: typeof T
// the allowable keys can then be assigned to a variable
// e.g.
// type CellTypeMapper = TypeMapper<Cells>;
// type CellType = keyof CellTypeMapper
// where CellType = "default" | "numeric" | "boolean" | ...etc
// see cell.d.ts for exampe usage
// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
export type TypeMapper<T extends { type: string }> = {[t in T as t["type"]]: t}
