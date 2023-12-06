import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Arrow from './assets/arrow_down.svg';
import closeIcon from './assets/close.svg';

const SelectContainer = styled.div`
  margin-left: auto;
  padding: 0 40px 8px 0;
  background: url(${(props) => props.theme.backImage}) no-repeat;
  background-position: bottom 12px right 13px;
  background-size: 20px 12px;
  position: relative;
  cursor: pointer;
`;

const StyledSpanStatus = styled.span`
  color: #f8f6ff;
  font-family: Roboto, Arial, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0.13px;
  padding: 8px;
  border-radius: 20px;
  background: ${(props) => props.theme.background};
  display: block;
`;

const StyledDialog = styled.dialog`
  margin: 0;
  padding: 15px 0;
  left: -100px;
  top: 30px;
  z-index: 3;
  min-width: 200px;
  width: auto;
  box-sizing: border-box;
  border: 1px solid #bfc8e8;
  border-radius: 5px;
  box-shadow: 3px 3px 16px 0px rgba(0, 0, 0, 0.08);
  animation: slidein 0.3s;
  cursor: default;

  @keyframes slidein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const StyledFlexHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
`;

const StyledDialogHeading = styled.h5`
  color: #bfc8e8;
  font-family: Roboto, Arial, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledCloseButton = styled.button`
  width: 20px;
  height: 20px;
  background: url(${closeIcon}) center no-repeat;
  background-size: 20px;
  border: none;
`;

const StyledDialogItems = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  max-height: 250px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    height: 0;
    width: 0;
    padding: 0;
  }
`;

const StyledDialogLabel = styled.label`
  text-align: left;
  display: flex;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0 10px;

  &:hover {
    background: #dbdbdb;
  }
`;

const StyledDialogItemTitle = styled.h5`
  color: #363942;
  font-family: Roboto, Arial, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
`;

const StyledInput = styled.input`
  display: inline-block;
`;

interface IProps<Value = string> {
  currOption: Value;
  options: Value[];
  setCurrOption: (e: Value) => void;
  backColor: string;
  disabled?: boolean;
  // renderItem(item: Value): JSX.Element;
}

export default function StatusSelect<Value>({
  currOption,
  options,
  setCurrOption,
  backColor,
  disabled = false,
}: IProps<Value>) {
  const [isOpen, setIsOpen] = useState(false);
  const [currValues, setCurrValues] = useState<Value[]>([]);

  useEffect(() => {
    setCurrValues(options);
  }, [options]);

  useEffect(() => {
    if (isOpen) window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [isOpen]);

  const handleToggleDialog = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    // (!isOpen || e.target === e.currentTarget) && setIsOpen(true);
    (!isOpen || e.target === e.currentTarget) &&
    !!currValues.length &&
    setTimeout(() => {
      setIsOpen(true);
    }, 100);

  const onClick = (e: MouseEvent) => {
    if (e.target instanceof Element && !e.target.closest('#status')) {
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>, v: Value) => {
    setCurrOption(v);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <SelectContainer
      onClick={handleToggleDialog}
      id={'status'}
      theme={{ backImage: !!currValues.length && !disabled && Arrow }}
    >
      <StyledSpanStatus theme={{ background: backColor }}>
        {/* {currOption && currOption.toString() === 'ВРаботе' ? 'В работе' : currOption} */}
        <>{currOption}</>
      </StyledSpanStatus>
      {isOpen && !disabled && (
        <StyledDialog open={isOpen} theme={{ isOpen }} onClick={(e) => e.preventDefault()}>
          <StyledFlexHeading>
            <StyledDialogHeading>Выберите статус</StyledDialogHeading>
            <StyledCloseButton onClick={() => setIsOpen(false)} />
          </StyledFlexHeading>
          <StyledDialogItems>
            {currValues &&
              currValues.map((item, i) => (
                <StyledDialogLabel key={i} htmlFor={`${i}`} onClick={(e) => handleSubmit(e, item)}>
                  <StyledInput
                    type="radio"
                    id={`${i}`}
                    checked={item === currOption}
                    onChange={(e) => e.preventDefault()}
                  />
                  <StyledDialogItemTitle>
                    <>{item}</>
                    {/* {item.toString() === 'ВРаботе' ? 'В работе' : item} */}
                  </StyledDialogItemTitle>
                </StyledDialogLabel>
              ))}
          </StyledDialogItems>
        </StyledDialog>
      )}
    </SelectContainer>
  );
}

// export default StatusSelect;
