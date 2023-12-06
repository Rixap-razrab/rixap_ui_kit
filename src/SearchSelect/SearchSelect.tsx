import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import arrowIcon from './assets/arrow.svg';
import closeIcon from './assets/close.svg';
import loopIcon from './assets/loop.svg';

const StyledContainer = styled.div`
  font-family: Roboto, Arial, sans-serif;
  min-height: 37px;
  height: auto;
  width: 100%;
  position: relative;
  border-bottom: 1px solid
    ${(props) =>
      props.theme.required && !props.theme.value ? '#fc0800' : 'var(--input-border, #bfc8e8)'};
  margin: ${(props) => props.theme.margin};
  padding: ${(props) => props.theme.padding};
  background: url(${(props) => !props.theme.disabled && arrowIcon}) no-repeat;
  cursor: ${(props) => (props.theme.disabled ? 'not-allowed' : 'pointer')};
  background-position: bottom 10px right 13px;
  background-size: 20px 12px;
  flex-shrink: 0;
`;

const StyledHeading = styled.h4`
  position: absolute;
  font-weight: 400;
  font-size: ${(props) => (props.theme.value ? '16px' : '18px')};
  line-height: 20px;
  margin: 0;
  padding: 0;
  top: ${(props) => (props.theme.value ? '0px' : '20px')};
  left: 0px;
  background-color: inherit;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  text-transform: capitalize;
  color: ${(props) => props.theme.headColor};
`;

const StyledValue = styled.p`
  font-size: ${(props) => (props.theme.smallTextValue ? '16px' : '23px')};
  font-weight: ${(props) => (props.theme.smallTextValue ? '400' : '600')};
  padding: 15px 0 0;
  margin: auto 0 0;
  color: ${(props) => props.theme.textColor};
`;

const StyledDialog = styled.dialog`
  margin: 0;
  padding: 15px 10px;
  left: 0;
  right: 0;
  z-index: 3;
  width: auto;
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
  }
`;

const StyledCloseIcon = styled.span`
  width: 20px;
  height: 20px;
  background: url(${closeIcon}) center no-repeat;
  background-size: 20px;
  display: block;
  cursor: pointer;
`;

const StyledDialogInput = styled.input`
  height: 32px;
  width: 100%;
  margin: 10px 0;
  box-sizing: border-box;
  border: none;
  background: var(--light-gray, #f2f2f2);
  background-image: url(${loopIcon});
  background-repeat: no-repeat;
  background-position: left 8px bottom 4px;
  background-size: 23px;
  border-radius: 20px;
  padding: 8px 0 8px 36px;

  color: #363942;
  font-family: Roboto, Arial, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;

  &:focus {
    outline: none;
  }
`;

const StyledFlexHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledDialogHeading = styled.h5`
  color: ${(props) => props.theme.headColor};
  font-family: Roboto, Arial, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledDialogItems = styled.div`
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

interface IStyling {
  margin?: string;
  padding?: string;
  textColor?: string;
  headColor?: string;
  dialogColor?: string;
  smallTextValue?: boolean;
}

interface IProps<Option> {
  currOption: string;
  options: Option[];
  heading?: string;
  // id: string; // если будет много выпадашек
  styling: IStyling;
  dialogText?: string;
  disabled?: boolean;
  required?: boolean;
  searchBy: (keyof Option)[];
  handleSubmit: (e: Option) => void;
  renderOption: (options: Option[], onClick: (v: Option) => void) => React.ReactNode;
}

export function SearchSelect<Option>({
  styling,
  disabled,
  required,
  // id,
  heading,
  dialogText,
  currOption,
  options,
  searchBy,
  handleSubmit,
  renderOption,
}: IProps<Option>) {
  const [isOpen, setIsOpen] = useState(false);
  const [currValues, setCurrValues] = useState<Option[]>([]);
  const { margin, padding, textColor, headColor, dialogColor, smallTextValue = false } = styling;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrValues(options);
  }, [options]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', onClick);
    }
    return () => window.removeEventListener('click', onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // открытие модального окна
  const handleToggleDialog = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    (!isOpen || e.target === e.currentTarget) && setIsOpen(true);

  // сортировка по вводу в строку поиска
  const handleInputChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.length
      ? setCurrValues(
          options.filter((item) =>
            searchBy.some(
              (searchValue) =>
                typeof item[searchValue] === 'string' &&
                (item[searchValue] as string).toLowerCase().includes(e.target.value.toLowerCase())
            )
          )
        )
      : setCurrValues(options);
  };

  // закрываем по клику вне модального окна
  const onClick = (e: MouseEvent) => {
    e.target instanceof Node && !rootRef.current?.contains(e.target) && setIsOpen(false);
  };

  // закрытие по клику на один из элементов
  const onOptionClick = (v: Option) => {
    handleSubmit(v);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <StyledContainer
      theme={{ margin, padding, required, disabled, value: currOption }}
      onClick={handleToggleDialog}
      // id={id}
      ref={rootRef}
    >
      {heading && <StyledHeading theme={{ headColor, value: currOption }}>{heading}</StyledHeading>}
      {currOption && <StyledValue theme={{ textColor, smallTextValue }}>{currOption}</StyledValue>}
      {isOpen && !disabled && (
        <StyledDialog open={isOpen} onClick={(e) => e.preventDefault()}>
          <StyledFlexHeading>
            <StyledDialogHeading theme={{ dialogColor }}>{dialogText}</StyledDialogHeading>
            <StyledCloseIcon onClick={() => setIsOpen(false)} />
          </StyledFlexHeading>
          <StyledDialogInput placeholder="Поиск" onChange={handleInputChanger} />
          <StyledDialogItems onClick={(e) => e.preventDefault()}>
            {renderOption(currValues, onOptionClick)}
          </StyledDialogItems>
        </StyledDialog>
      )}
    </StyledContainer>
  );
}
