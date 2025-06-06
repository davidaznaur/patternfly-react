import { forwardRef } from 'react';

import styles from '@patternfly/react-styles/css/components/Panel/panel';
import { css } from '@patternfly/react-styles';

export interface PanelProps extends React.HTMLProps<HTMLDivElement> {
  /** Content rendered inside the panel */
  children?: React.ReactNode;
  /** Class to add to outer div */
  className?: string;
  /** Adds panel variant styles */
  variant?: 'raised' | 'bordered' | 'secondary';
  /** Flag to add scrollable styling to the panel */
  isScrollable?: boolean;
  /** @hide Forwarded ref */
  innerRef?: React.Ref<any>;
}

const PanelBase: React.FunctionComponent<PanelProps> = ({
  className,
  children,
  variant,
  isScrollable,
  innerRef,
  ...props
}: PanelProps) => (
  <div
    className={css(
      styles.panel,
      variant && styles.modifiers[variant],
      isScrollable && styles.modifiers.scrollable,
      className
    )}
    ref={innerRef}
    {...props}
  >
    {children}
  </div>
);

export const Panel = forwardRef((props: PanelProps, ref: React.Ref<any>) => <PanelBase innerRef={ref} {...props} />);
Panel.displayName = 'Panel';
