import {
  getPrimaryDotMeasureData,
  getComparativeErrorMeasureData,
  getComparativeWarningMeasureData,
  getPrimarySegmentedMeasureData,
  getQualitativeRangeData
} from './chart-bullet-data';
import { ChartThemeDefinition } from '../../ChartTheme/ChartTheme';
import { getBulletTheme } from '../../ChartUtils/chart-theme-types';
import { ChartThemeColor } from '../../ChartTheme/ChartThemeColor';
import { SkeletonColorTheme } from '../../ChartTheme/themes/colors/skeleton-theme';

interface ChartBulletThemeInterface {
  comparativeErrorMeasureData?: any[];
  comparativeErrorMeasureLegendData?: any[];
  comparativeWarningMeasureData?: any[];
  comparativeWarningMeasureLegendData?: any[];
  invert?: boolean;
  primaryDotMeasureData?: any[];
  primaryDotMeasureLegendData?: any[];
  primarySegmentedMeasureData?: any[];
  primarySegmentedMeasureLegendData?: any[];
  qualitativeRangeData?: any[];
  qualitativeRangeLegendData?: any[];
  themeColor?: string;
}

/**
 * Returns legend color scale
 *
 * @private Not intended as public API and subject to change
 */
const getLegendColorScale = (computedData: any, legendData: any) => {
  const colorScale: string[] = [];
  legendData.forEach((data: any, index: number) => {
    for (const i of computedData) {
      if (index === i._index) {
        colorScale.push(i._color);
      }
    }
  });
  return colorScale;
};

/**
 * Returns color scale
 *
 * @private Not intended as public API and subject to change
 */
export const getColorScale = ({
  comparativeErrorMeasureData,
  comparativeErrorMeasureLegendData,
  comparativeWarningMeasureData,
  comparativeWarningMeasureLegendData,
  invert,
  primaryDotMeasureData,
  primaryDotMeasureLegendData,
  primarySegmentedMeasureData,
  primarySegmentedMeasureLegendData,
  qualitativeRangeData,
  qualitativeRangeLegendData,
  themeColor
}: ChartBulletThemeInterface): any[] => {
  const colorScale: any[] = [];
  if (primaryDotMeasureLegendData && primaryDotMeasureLegendData.length) {
    const computedData = getPrimaryDotMeasureData({
      data: primaryDotMeasureData,
      invert
    });
    colorScale.push(...getLegendColorScale(computedData, primaryDotMeasureLegendData));
  }
  if (primarySegmentedMeasureLegendData && primarySegmentedMeasureLegendData.length) {
    const computedData = getPrimarySegmentedMeasureData({
      data: primarySegmentedMeasureData,
      invert,
      themeColor
    });
    colorScale.push(...getLegendColorScale(computedData, primarySegmentedMeasureLegendData));
  }
  if (comparativeWarningMeasureLegendData && comparativeWarningMeasureLegendData.length) {
    const computedData = getComparativeWarningMeasureData({
      data: comparativeWarningMeasureData,
      invert,
      themeColor
    });
    colorScale.push(...getLegendColorScale(computedData, comparativeWarningMeasureLegendData));
  }
  if (comparativeErrorMeasureLegendData && comparativeErrorMeasureLegendData.length) {
    const computedData = getComparativeErrorMeasureData({
      data: comparativeErrorMeasureData,
      invert,
      themeColor
    });
    colorScale.push(...getLegendColorScale(computedData, comparativeErrorMeasureLegendData));
  }
  if (qualitativeRangeLegendData && qualitativeRangeLegendData.length) {
    const computedData = getQualitativeRangeData({
      data: qualitativeRangeData,
      invert
    });
    colorScale.push(...getLegendColorScale(computedData, qualitativeRangeLegendData));
  }
  return colorScale;
};

/**
 * Returns bullet chart theme with legend color scale
 *
 * @private Not intended as public API and subject to change
 */
export const getBulletThemeWithLegendColorScale = ({
  comparativeErrorMeasureData,
  comparativeErrorMeasureLegendData,
  comparativeWarningMeasureData,
  comparativeWarningMeasureLegendData,
  invert,
  primaryDotMeasureData,
  primaryDotMeasureLegendData,
  primarySegmentedMeasureData,
  primarySegmentedMeasureLegendData,
  qualitativeRangeData,
  qualitativeRangeLegendData,
  themeColor
}: ChartBulletThemeInterface): ChartThemeDefinition => {
  const colorScale = getColorScale({
    comparativeErrorMeasureData,
    comparativeErrorMeasureLegendData,
    comparativeWarningMeasureData,
    comparativeWarningMeasureLegendData,
    invert,
    primaryDotMeasureData,
    primaryDotMeasureLegendData,
    primarySegmentedMeasureData,
    primarySegmentedMeasureLegendData,
    qualitativeRangeData,
    qualitativeRangeLegendData,
    themeColor
  });

  const theme = getBulletTheme(themeColor);
  theme.legend.colorScale = [...colorScale];
  if (themeColor === ChartThemeColor.skeleton) {
    theme.legend.colorScale = SkeletonColorTheme.legend.colorScale;
  }
  return theme;
};
