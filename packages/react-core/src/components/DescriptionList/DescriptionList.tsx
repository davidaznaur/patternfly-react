import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/DescriptionList/description-list';
import { formatBreakpointMods } from '../../helpers';
import cssGridTemplateColumnsMin from '@patternfly/react-tokens/dist/esm/c_description_list_GridTemplateColumns_min';
// import cssTermWidth from '@patternfly/react-tokens/dist/esm/c_description_list__term_width';
import cssHorizontalTermWidth from '@patternfly/react-tokens/dist/esm/c_description_list_m_horizontal__term_width';

const cssTermWidth = {
  name: `--${styles.descriptionList}_term-width`
};

export interface BreakpointModifiers {
  default?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}

export interface DescriptionListProps extends Omit<React.HTMLProps<HTMLDListElement>, 'type'> {
  /** Anything that can be rendered inside of the list */
  children?: React.ReactNode;
  /** Additional classes added to the list */
  className?: string;
  /** Sets the description list to auto fit. */
  isAutoFit?: boolean;
  /** Sets the description list component term and description pair to a horizontal layout. */
  isHorizontal?: boolean;
  /** Sets the description list to format automatically. */
  isAutoColumnWidths?: boolean;
  /** Modifies the description list display to inline-grid. */
  isInlineGrid?: boolean;
  /** Sets the description list to compact styling. */
  isCompact?: boolean;
  /** Sets a horizontal description list to have fluid styling. */
  isFluid?: boolean;
  /** Sets the the default placement of description list groups to fill from top to bottom. */
  isFillColumns?: boolean;
  /** Sets the display size of the descriptions in the description list.*/
  displaySize?: 'default' | 'lg' | '2xl';
  /** Sets the number of columns on the description list at various breakpoints */
  columnModifier?: {
    default?: '1Col' | '2Col' | '3Col';
    sm?: '1Col' | '2Col' | '3Col';
    md?: '1Col' | '2Col' | '3Col';
    lg?: '1Col' | '2Col' | '3Col';
    xl?: '1Col' | '2Col' | '3Col';
    '2xl'?: '1Col' | '2Col' | '3Col';
  };
  /** Indicates how the menu will align at various breakpoints. */
  orientation?: {
    sm?: 'vertical' | 'horizontal';
    md?: 'vertical' | 'horizontal';
    lg?: 'vertical' | 'horizontal';
    xl?: 'vertical' | 'horizontal';
    '2xl'?: 'vertical' | 'horizontal';
  };
  /** Sets the minimum column size for the auto-fit (isAutoFit) layout at various breakpoints. */
  autoFitMinModifier?: {
    default?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
  /** Sets the description list's term column width.*/
  termWidth?: string;
  /** Sets the horizontal description list's term column width at various breakpoints. */
  horizontalTermWidthModifier?: {
    default?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
}

const setBreakpointModifiers = (prefix: string, modifiers: BreakpointModifiers) => {
  const mods = modifiers as Partial<{ [k: string]: string }>;
  return Object.keys(mods || {}).reduce(
    (acc, curr) =>
      curr === 'default' ? { ...acc, [prefix]: mods[curr] } : { ...acc, [`${prefix}-on-${curr}`]: mods[curr] },
    {}
  );
};

export const DescriptionList: React.FunctionComponent<DescriptionListProps> = ({
  className = '',
  children = null,
  isHorizontal = false,
  isAutoColumnWidths,
  isAutoFit,
  isInlineGrid,
  isCompact,
  isFluid,
  isFillColumns,
  displaySize = 'default',
  columnModifier,
  autoFitMinModifier,
  termWidth,
  horizontalTermWidthModifier,
  orientation,
  style,
  ...props
}: DescriptionListProps) => {
  if (isAutoFit && autoFitMinModifier) {
    style = {
      ...style,
      ...setBreakpointModifiers(cssGridTemplateColumnsMin.name, autoFitMinModifier)
    };
  }
  if (termWidth) {
    style = {
      ...style,
      ...{ [cssTermWidth.name]: termWidth }
    };
  }
  if (isHorizontal && horizontalTermWidthModifier) {
    style = {
      ...style,
      ...setBreakpointModifiers(cssHorizontalTermWidth.name, horizontalTermWidthModifier)
    };
  }

  return (
    <dl
      className={css(
        styles.descriptionList,
        (isHorizontal || isFluid) && styles.modifiers.horizontal,
        isAutoColumnWidths && styles.modifiers.autoColumnWidths,
        isAutoFit && styles.modifiers.autoFit,
        formatBreakpointMods(columnModifier, styles),
        formatBreakpointMods(orientation, styles),
        isInlineGrid && styles.modifiers.inlineGrid,
        isCompact && styles.modifiers.compact,
        isFluid && styles.modifiers.fluid,
        isFillColumns && styles.modifiers.fillColumns,
        displaySize === 'lg' && styles.modifiers.displayLg,
        displaySize === '2xl' && styles.modifiers.display_2xl,
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </dl>
  );
};

DescriptionList.displayName = 'DescriptionList';
