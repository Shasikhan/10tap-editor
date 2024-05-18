import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { ColorValue } from 'react-native';

const A = (fill: ColorValue = 'red', size: number = 24) => (
  <Svg width={size} height={size} viewBox="0 0 800 800">
    <Path
      fill={fill}
      stroke={fill}
      strokeWidth={50}
      strokeLinecap="round"
      strokeMiterlimit={133.3333}
      d="M653,700.3H147"
    />
    <Path
      fill={fill}
      d="M170,567.2c-7.5,16.8-0.1,36.5,16.7,44c16.8,7.5,36.5,0.1,44-16.7L170,567.2z M400,137.1l30.3-13.7 c-5.4-11.9-17.3-19.6-30.3-19.6c-13.1,0-25,7.7-30.3,19.6L400,137.1z M569.3,594.5c7.5,16.8,27.2,24.2,44,16.7 c16.8-7.5,24.2-27.2,16.7-44L569.3,594.5z M527.1,419.5l30.4-13.7L527.1,419.5z M272.9,386.2c-18.4,0-33.3,14.9-33.3,33.3 c0,18.4,14.9,33.3,33.3,33.3V386.2z M230.7,594.5l199.7-443.8l-60.7-27.3L170,567.2L230.7,594.5z M630,567.2l-72.6-161.4l-60.7,27.3 l72.6,161.4L630,567.2z M557.4,405.9L430.3,123.5l-60.7,27.3l127.1,282.4L557.4,405.9z M527.1,386.2H272.9v66.6h254.1V386.2z"
    />
  </Svg>
);
export default A;
