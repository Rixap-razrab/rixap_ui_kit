import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import editLogo from './assets/edit.svg';

const StyledLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  position: relative;
  width: 100%;
  margin: ${(props) => props.theme.margin};
  min-height: 37px;
  background: url(${(props) => !props.theme.disabled && editLogo}) no-repeat;
  background-position: bottom 8px right 10px;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid ${(props) => props.theme.borderBottomColor};

  &:has(+ textarea:focus) {
    outline: none;
    border-bottom: 1px solid #363942;
  }
`;

const StyledSimpleTextArea = styled.textarea`
  overflow: hidden;
  width: 100%;
  height: auto;
  resize: none;
  color: ${(props) => props.theme.textColor || '#363942'};
  font-size: ${(props) => props.theme.fontSize || '23px'};
  font-family: Roboto, Arial, sans-serif;
  font-weight: 600;
  padding: ${(props) => props.theme.padding};
  box-sizing: border-box;
  outline: none;
  background: transparent;
  border: none;
  border-radius: 0px;

  &::placeholder {
    opacity: 0;
  }
  &:not(:placeholder-shown) + p,
  &:focus + p {
    top: -13px;
  }
`;

const StyledParagraph = styled.p`
  color: ${(props) => props.theme.headColor};
  font-size: 18px;
  font-family: Roboto, Arial, sans-serif;
  position: absolute;
  line-height: 20px;
  margin: 0;
  padding: 0;
  top: 20px;
  left: 0px;
  background-color: inherit;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  padding: 0;
`;

const StyledErrorSpan = styled.span`
  font-family: Roboto, Arial, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  color: #fc0800;
  opacity: 1;
  position: absolute;
  bottom: -18px;
  right: 0;
  z-index: 2;
`;

interface IStyling {
  margin?: string;
  padding?: string;
  headColor?: string;
  textColor?: string;
  fontSize?: string;
}

interface ITextAreaProps {
  styling: IStyling;
  required?: boolean;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}

export const SimpleTextArea = ({
  styling,
  required = false,
  value,
  onChange,
  disabled = false,
  placeholder = '',
  error = '',
}: ITextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px';
      const { scrollHeight } = textAreaRef.current;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);

  const { margin, padding, headColor, textColor, fontSize } = styling;

  const handleBorderBottomColor = () => {
    if (disabled) return '#bfc8e8';
    if ((required && !value) || error) return '#fc0800';
    return 'var(--input-border, #bfc8e8)';
  };

  return (
    <StyledLabel theme={{ margin, disabled, borderBottomColor: handleBorderBottomColor() }}>
      <StyledSimpleTextArea
        theme={{ padding, textColor, fontSize }}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        ref={textAreaRef}
      />
      {!!placeholder && <StyledParagraph theme={{ headColor }}>{placeholder}</StyledParagraph>}
      {!!error && <StyledErrorSpan>{error}</StyledErrorSpan>}
    </StyledLabel>
  );
};
