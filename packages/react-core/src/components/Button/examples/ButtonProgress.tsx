import { useState } from 'react';
import { Button, Flex } from '@patternfly/react-core';
import UploadIcon from '@patternfly/react-icons/dist/esm/icons/upload-icon';

interface LoadingPropsType {
  spinnerAriaValueText: string;
  spinnerAriaLabelledBy?: string;
  spinnerAriaLabel?: string;
  isLoading: boolean;
}

export const ButtonProgress: React.FunctionComponent = () => {
  const [isPrimaryLoading, setIsPrimaryLoading] = useState<boolean>(true);
  const [isSecondaryLoading, setIsSecondaryLoading] = useState<boolean>(true);
  const [isInlineLoading, setIsInlineLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const primaryLoadingProps = {} as LoadingPropsType;
  primaryLoadingProps.spinnerAriaValueText = 'Loading';
  primaryLoadingProps.spinnerAriaLabelledBy = 'primary-loading-button';
  primaryLoadingProps.isLoading = isPrimaryLoading;

  const secondaryLoadingProps = {} as LoadingPropsType;
  secondaryLoadingProps.spinnerAriaValueText = 'Loading';
  secondaryLoadingProps.spinnerAriaLabel = 'Content being loaded';
  secondaryLoadingProps.isLoading = isSecondaryLoading;

  const inlineLoadingProps = {} as LoadingPropsType;
  inlineLoadingProps.spinnerAriaValueText = 'Loading';
  inlineLoadingProps.spinnerAriaLabel = 'Content being loaded';
  inlineLoadingProps.isLoading = isInlineLoading;

  const uploadingProps = {} as LoadingPropsType;
  uploadingProps.spinnerAriaValueText = 'Loading';
  uploadingProps.spinnerAriaLabel = 'Uploading data';
  uploadingProps.isLoading = isUploading;

  return (
    <>
      <Flex columnGap={{ default: 'columnGapSm' }}>
        <Button
          variant="primary"
          id="primary-loading-button"
          onClick={() => setIsPrimaryLoading(!isPrimaryLoading)}
          {...primaryLoadingProps}
        >
          {isPrimaryLoading ? 'Click to stop loading' : 'Click to start loading'}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setIsSecondaryLoading(!isSecondaryLoading)}
          {...secondaryLoadingProps}
        >
          {isSecondaryLoading ? 'Click to stop loading' : 'Click to start loading'}
        </Button>
      </Flex>
      <br />
      <Button
        variant="plain"
        {...(!isUploading && { 'aria-label': 'Upload' })}
        onClick={() => setIsUploading(!isUploading)}
        icon={<UploadIcon />}
        {...uploadingProps}
      />
      <br />
      <br />
      <Button variant="link" isInline onClick={() => setIsInlineLoading(!isInlineLoading)} {...inlineLoadingProps}>
        {isInlineLoading ? 'Pause loading logs' : 'Resume loading logs'}
      </Button>
    </>
  );
};
