import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${(props) => (props.theme.secondary ? '#fff' : 'var(--button-gradient)')};
  border-radius: 20px;
  border: ${(props) => (props.theme.secondary ? '1px solid var(--gray)' : 'none')};
  color: ${(props) => (props.theme.secondary ? 'var(--gray)' : 'white')};
  width: 113px;
  height: 40px;
  font-size: 16px;
  font-family: Roboto, Arial, sans-serif;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background: #e5eafc;
    cursor: not-allowed;
  }
`;

const StyledBigButton = styled.button`
  background: var(--button-gradient);
  border-radius: 20px;
  border: none;
  width: 207px;
  height: 40px;
  color: #fff;
  font-size: 16px;
  font-family: Roboto, Arial, sans-serif;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background: #e5eafc;
    cursor: not-allowed;
  }
`;

export const TomatoButton = styled(StyledButton)`
  background: tomato;
`;

interface ISimpleProps {
  text: string;
  handleClick: () => void;
  secondary?: boolean;
  styling?: string;
  disabled?: boolean;
}

export const SimpleButton = ({ text, handleClick, secondary }: ISimpleProps) => (
  <StyledButton onClick={() => handleClick()} theme={{ secondary }}>
    {text}
  </StyledButton>
);

interface IProps {
  text: string;
  disabled: boolean;
  classDesc: string;
}

export const SubmitButton = ({ text, disabled = false, classDesc }: IProps) => (
  <StyledButton disabled={disabled} type="submit" className={classDesc}>
    {text}
  </StyledButton>
);

export const SimpleBigButton = ({ text, handleClick, styling, disabled }: ISimpleProps) => (
  <StyledBigButton
    type="submit"
    onClick={() => handleClick()}
    className={styling}
    disabled={disabled}
  >
    {text}
  </StyledBigButton>
);
