const _color_blind_friendly_palettes = {
    PuBlRd : ["#601A4A", "#EE442F", "#63ACBE"],
    RdBlPu: ["#EE442F", "#601A4A", "#63ACBE"],
    eight_color: ["#332288",  "#117733", "#44AA99", "#88CCEE", "#DDCC77", "#CC6677", "#AA4499", "#882255"]
};

export {_color_blind_friendly_palettes}


type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type STANDARD_COLORS = 'red' | 'blue' | 'green' | 'gold' | 'grey' | 'black' | 'white'

export type Color = RGB | RGBA | HEX | STANDARD_COLORS
