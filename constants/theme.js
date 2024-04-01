import {Dimensions} from 'react-native'
const {width,height}=Dimensions.get("window")

export const COLORS={
    primary:"#0099ff",
    // Other colors
}

export const SIZES={
    width,
    height
}

const appTheme={COLORS,SIZES}
export default appTheme