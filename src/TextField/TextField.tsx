import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import editLogo from './assets/edit.svg';

const StyledLabel = styled.label`
  position: relative;
  border: none;
  // border-bottom: 1px solid #bfc8e8;
  margin: ${(props) => props.theme.margin};
  padding: ${(props) => props.theme.padding};

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

const StyledTextArea = styled.textarea`
  overflow: hidden;
  width: 100%;
  border: none;
  min-height: 110px;
  height: auto;
  resize: none;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 500;
  padding: 10px 0 35px;
  box-sizing: border-box;
  outline: none;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-bottom: 1px solid rgb(0, 0, 0);
  }
  &:invalid {
    outline: none;
    border-bottom: 1px solid #fc0800;
  }
  &:valid:not(:placeholder-shown):not(:focus) {
    border-bottom: 1px solid rgb(0, 255, 0);
  }
  &::placeholder {
    opacity: 0;
  }
  &:not(:placeholder-shown) + p,
  &:focus + p {
    top: 0px;
    // font-size: 12px;
  }
`;

const StyledParagraph = styled.p`
  color: #bfc8e8;
  font-size: 16px;
  font-family: Roboto;
  position: absolute;
  margin: 0;
  padding: 0;
  top: 20px;
  left: 0px;
  background-color: inherit;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  padding: 0;
`;

const StyledTextAreaButtons = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 8px;
  right: 10px;
  left: 0;
  z-index: 2;
`;

const StyledSpanWithLogo = styled.span`
  display: block;
  width: 30px;
  height: 30px;
  background: url(${(props) => props.theme.logo}) center no-repeat;
`;

const StyledLoader = styled.div`
  width: 30px;
  height: 30px;
  background: url(${editLogo}) center no-repeat;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: -8px;
    top: -8px;
    bottom: -8px;
    right: -8px;
    border: 5px solid #000000;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface IStyling {
  margin?: string;
  padding?: string;
  textColor?: string;
  fontSize?: string;
}

interface IProps {
  heading: string;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
  styling: IStyling;
  disabled?: boolean;
  isLoading: boolean;
  placeholder?: string;
  renderOption: (isLoading: boolean) => React.ReactNode;
}

const TextField = ({
  heading,
  value,
  onChange,
  styling,
  disabled = false,
  isLoading,
  placeholder,
  renderOption,
}: IProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { margin, padding, textColor, fontSize } = styling;

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px';
      const { scrollHeight } = textAreaRef.current;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);

  return (
    <StyledLabel theme={{ margin, padding }}>
      <StyledTextArea
        ref={textAreaRef}
        theme={{ padding, textColor, fontSize }}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
      <StyledParagraph>{heading}</StyledParagraph>

      {!disabled && (
        <StyledTextAreaButtons>
          {renderOption(isLoading)}
          {isLoading ? <StyledLoader /> : <StyledSpanWithLogo theme={{ logo: editLogo }} />}
        </StyledTextAreaButtons>
      )}
    </StyledLabel>
  );
};

export default TextField;
