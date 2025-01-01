import { Dimensions, PixelRatio } from "react-native";

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const getHeigth: (heightPercent: string | number) => number = heightPercent => {
    const elemHeight =
      typeof heightPercent === 'number'
        ? heightPercent
        : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const getWidth: (widthPercent: string | number) => number = widthPercent => {
    const elemWidth =
      typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const getFontSize = (fontSize: number) => {
    const widthDimension =
      screenHeight > screenWidth ? screenWidth : screenHeight;
    const aspectRatioBasedHeight = (16 / 9) * widthDimension;
    return (
      (Math.sqrt(
        Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2),
      ) *
        (fontSize / 100)) /
      2
    );
};

export {
    getWidth,
    getHeigth,
    getFontSize
  };