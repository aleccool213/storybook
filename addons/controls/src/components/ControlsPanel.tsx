import React, { FC } from 'react';
import { styled } from '@storybook/theming';
import { ArgsTable, Link } from '@storybook/components';
import { useArgs, useArgTypes, useParameter } from '@storybook/api';
import { PARAM_KEY } from '../constants';

interface ControlsParameters {
  expanded?: boolean;
  hideNoControlsWarning?: boolean;
}

const NoControlsWrapper = styled.div(({ theme }) => ({
  background: theme.background.warning,
  padding: 20,
}));

const NoControlsWarning = () => (
  <NoControlsWrapper>
    This story is not configured to handle controls.&nbsp;
    <Link
      href="https://github.com/storybookjs/storybook/blob/next/addons/controls/README.md#writing-stories"
      target="_blank"
      cancel={false}
    >
      Learn how to add controls »
    </Link>
  </NoControlsWrapper>
);

export const ControlsPanel: FC = () => {
  const [args, updateArgs] = useArgs();
  const rows = useArgTypes();
  const { expanded, hideNoControlsWarning = false } = useParameter<ControlsParameters>(
    PARAM_KEY,
    {}
  );
  const hasControls = Object.values(rows).filter((argType) => !!argType?.control).length > 0;
  return (
    <>
      {hasControls || hideNoControlsWarning ? null : <NoControlsWarning />}
      <ArgsTable {...{ compact: !expanded && hasControls, rows, args, updateArgs }} />
    </>
  );
};
