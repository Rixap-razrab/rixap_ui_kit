import styled from 'styled-components';
import searchLogo from './assets/loop.svg';

const StyledInput = styled.input`
  margin: 29px 20px 0;
  background: var(--light-gray, #f2f2f2);
  padding: 8px 8px 8px 35px;
  position: relative;
  background-image: url(${searchLogo});
  background-repeat: no-repeat;
  background-size: 23px 23px;
  background-position: 4px 3px;
  color: #363942;
  font-size: 13px;
  font-family: Roboto, Arial, sans-serif;
  line-height: 16px;
  border-radius: 16px;
`;

interface IProps {
  placeholder: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

const FilterInput = ({ placeholder, onChange, autoFocus = false }: IProps) => {
  return (
    <StyledInput placeholder={placeholder || 'Поиск'} onChange={onChange} autoFocus={autoFocus} />
  );
};

export default FilterInput;
