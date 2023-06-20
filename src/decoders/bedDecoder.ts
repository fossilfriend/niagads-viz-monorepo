// import igv from "igv/dist/igv.esm";

// function decodeBed(tokens, header) {
//     if (tokens.length < 3) return undefined

//     const gffTags = header && header.gffTags

//     const chr = tokens[0]
//     const start = parseInt(tokens[1])
//     const end = tokens.length > 2 ? parseInt(tokens[2]) : start + 1
//     if (isNaN(start) || isNaN(end)) {
//         return new igv.DecodeError(`Unparsable bed record.`)
//     }
//     const feature = new igv.UCSCBedFeature({chr: chr, start: start, end: end, score: 1000})

//     try {
//         if (tokens.length > 3) {

//             // Potentially parse name field as GFF column 9 style streng.
//             if (tokens[3].indexOf(';') > 0 && tokens[3].indexOf('=') > 0) {
//                 const attributeKVs = parseAttributeString(tokens[3], '=')
//                 feature.attributes = {}
//                 for (let kv of attributeKVs) {
//                     feature.attributes[kv[0]] = kv[1];
//                     if (header.nameField != undefined && kv[0] === header.nameField) {
//                         feature.name = kv[1];
//                     }
//                 }
//             }
//             if (!feature.name) {
//                 feature.name = tokens[3] === '.' ? '' : tokens[3]
//             }
//         }

//         if (tokens.length > 4) {
//             feature.score = tokens[4] === '.' ? 0 : Number(tokens[4])
//             if (isNaN(feature.score)) {
//                 return feature
//             }
//         }

//         if (tokens.length > 5) {
//             feature.strand = tokens[5]
//             if (!(feature.strand === '.' || feature.strand === '+' || feature.strand === '-')) {
//                 return feature
//             }
//         }

//         if (tokens.length > 6) {
//             feature.cdStart = parseInt(tokens[6])
//             if (isNaN(feature.cdStart)) {
//                 return feature
//             }
//         }

//         if (tokens.length > 7) {
//             feature.cdEnd = parseInt(tokens[7])
//             if (isNaN(feature.cdEnd)) {
//                 return feature
//             }
//         }

//         if (tokens.length > 8) {
//             if (tokens[8] !== "." && tokens[8] !== "0")
//                 feature.color = IGVColor.createColorString(tokens[8])
//         }

//         if (tokens.length > 11) {
//             const exonCount = parseInt(tokens[9])
//             // Some basic validation
//             if (exonCount > 1000) {
//                 // unlikely
//                 return feature
//             }

//             const exonSizes = tokens[10].replace(/,$/, '').split(',')
//             const exonStarts = tokens[11].replace(/,$/, '').split(',')
//             if (!(exonSizes.length === exonStarts.length && exonCount === exonSizes.length)) {
//                 return feature
//             }

//             const exons = []
//             for (let i = 0; i < exonCount; i++) {
//                 const eStart = start + parseInt(exonStarts[i])
//                 const eEnd = eStart + parseInt(exonSizes[i])
//                 exons.push({start: eStart, end: eEnd})
//             }
//             findUTRs(exons, feature.cdStart, feature.cdEnd)
//             feature.exons = exons
//         }

//         // Optional extra columns
//         if (header) {
//             let thicknessColumn = header.thicknessColumn
//             let colorColumn = header.colorColumn
//             if (colorColumn && colorColumn < tokens.length) {
//                 feature.color = IGVColor.createColorString(tokens[colorColumn])
//             }
//             if (thicknessColumn && thicknessColumn < tokens.length) {
//                 feature.thickness = tokens[thicknessColumn]
//             }
//         }
//     } catch
//         (e) {

//     }

//     return feature

// }

// export default decodeBed;