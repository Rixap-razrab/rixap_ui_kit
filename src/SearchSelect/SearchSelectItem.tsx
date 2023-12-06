import React from 'react';
import styled from 'styled-components';

const StyledDialogItem = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledDialogLabel = styled.label`
  text-align: left;
`;

const StyledDialogItemTitle = styled.h5`
  color: #363942;
  font-family: Roboto, Arial, sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
`;

const StyledDialogItemSubtitle = styled.h6`
  color: #7f7f7f;
  font-family: Roboto, Arial, sans;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

interface IProps<Option> {
  onClick: (e: Option) => void;
  option: Option;
  // inputType: boolean;
  isChecked: boolean;
  optionValue: string;
  subOptionValue?: string[];
}

export function SearchSelectItem<Option>({
  onClick,
  option,
  // inputType,
  isChecked,
  optionValue,
  subOptionValue,
}: IProps<Option>) {
  return (
    <StyledDialogItem onClick={() => onClick(option)}>
      <input
        // type={inputType ? 'checkbox' : 'radio'}
        type={'radio'}
        id={optionValue}
        checked={isChecked}
        onChange={(e) => e.preventDefault()}
      />
      <StyledDialogLabel htmlFor={optionValue}>
        <StyledDialogItemTitle>{optionValue}</StyledDialogItemTitle>
        {!!subOptionValue?.length &&
          subOptionValue.map((item, i) => (
            <StyledDialogItemSubtitle>{item}</StyledDialogItemSubtitle>
          ))}
      </StyledDialogLabel>
    </StyledDialogItem>
  );
}
