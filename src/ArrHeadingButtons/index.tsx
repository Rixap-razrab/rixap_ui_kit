import styled from "styled-components";
import BoardLogo from "./assets/board.svg";
import ListLogo from "./assets/list.svg";
import FilterLogo from "./assets/filter.svg";
import FilterLogoActive from "./assets/filter_active.svg";
import SortLogo from "./assets/sortArr.svg";

const StyledContainers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const StyledText = styled.p`
  color: var(--black-text, #363942);
  font-size: 13px;
  font-family: Roboto, sans-serif;
  line-height: 19px;
`;

const StyledImageContainerDiv = styled.div`
  position: relative;
`;

const StyledBlendDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  mix-blend-mode: color;
  background: ${(props) =>
    props.theme.blendColor ? props.theme.blendColor : "var(--icons-color)"};
  transition: all 0.3s ease;

  &:hover {
    mix-blend-mode: color;
    opacity: 0.8;
  }
`;

const StyledSpanImage = styled.span`
  width: 22px;
  height: 22px;
  background: url(${(props) => props.theme.logo}) center no-repeat;
  display: block;
`;

// переключатель доска / список
const StyledCheckboxDiv = styled.div`
  display: inline-block;
  width: 60px;
  height: 30px;
  border-radius: 100px;
  background: #dbdbdb;
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  position: relative;
  transition-duration: 300ms; /* анимация */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &::after {
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background: var(
      --button-gradient,
      linear-gradient(175deg, #5c90cc 0%, #3a49f9 100%)
    );
    transition-duration: 300ms; /* анимация */
    position: absolute;
    z-index: 1;
    left: ${(props) => (props.theme.isActive ? "30px" : "0")};
  }
`;

// переключатель доска / список
interface IBoardListCheckBoxProps {
  onClick: (v: boolean) => void;
  isActive: boolean;
  blendColor?: string;
}

// переключатель доска / список
export const BoardListCheckBox = ({
  onClick,
  isActive,
  blendColor = "",
}: IBoardListCheckBoxProps) => {
  return (
    <StyledContainers onClick={() => onClick(!isActive)}>
      <StyledContainer>
        <StyledText>Список</StyledText>
        <StyledImageContainerDiv>
          <StyledBlendDiv theme={{ blendColor }} />
          <StyledSpanImage theme={{ logo: BoardLogo }} />
        </StyledImageContainerDiv>
      </StyledContainer>
      <StyledCheckboxDiv theme={{ isActive }} />
      <StyledContainer>
        <StyledImageContainerDiv>
          <StyledBlendDiv theme={{ blendColor }} />
          <StyledSpanImage theme={{ logo: ListLogo }} />
        </StyledImageContainerDiv>
        <StyledText>Доска</StyledText>
      </StyledContainer>
    </StyledContainers>
  );
};

// кнопка фильтры
interface IFilterButtonProps {
  onClick: () => void;
  isActive: boolean;
  blendColor?: string;
}

// кнопка фильтры
export const FilterButton = ({
  onClick,
  isActive,
  blendColor = "",
}: IFilterButtonProps) => {
  return (
    <StyledContainer onClick={() => onClick()}>
      <StyledImageContainerDiv>
        <StyledBlendDiv theme={{ blendColor }} />
        <StyledSpanImage
          theme={{ logo: isActive ? FilterLogoActive : FilterLogo }}
        />
      </StyledImageContainerDiv>
      <StyledText>Фильтры</StyledText>
    </StyledContainer>
  );
};

// кнопка сортировка
interface ISortButtonProps {
  onClick: () => void;
  blendColor?: string;
}

// кнопка сортировка
export const SortButton = ({ onClick, blendColor }: ISortButtonProps) => {
  return (
    <StyledContainer onClick={() => onClick()}>
      <StyledImageContainerDiv>
        <StyledBlendDiv theme={{ blendColor }} />
        <StyledSpanImage theme={{ logo: SortLogo }} />
      </StyledImageContainerDiv>
      <StyledText>Сортировка</StyledText>
    </StyledContainer>
  );
};
