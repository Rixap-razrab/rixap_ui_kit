import styled from 'styled-components';
import { Link } from 'react-router-dom';

import defOrgAvatar from './assets/def_org_avatar.svg';
import defUserAvatar from './assets/def_user_avatar.svg';
import tgLogo from './assets/tg_logo.svg';
import mailLogo from './assets/mail_logo.svg';
import cardTimeLogo from './assets/time.svg';
import filesLogo from './assets/files.svg';
import commLogo from './assets/comments.svg';

const StyledTask = styled.div`
  min-height: 150px;
  max-width: 380px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background: ${(props) => (props.theme.isActive ? '#e8eafd' : '#fff')};
  box-shadow: 3px 3px 16px 0px rgba(0, 0, 0, 0.08);
  padding: 15px 10px 16px 12px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 3px 3px 16px 0px rgba(0, 0, 0, 0.3);
    transform: scale(1.01);
  }
`;
// уголок, обозначающий что есть исполнитель
const StyledCornerSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-top: 10px solid ${(props) => props.theme.backColor};
  border-left: 10px solid ${(props) => props.theme.backColor};
  border-bottom: 10px solid transparent;
  border-right: 10px solid transparent;
`;

const StyledFlexRowContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

const StyledGridContainer = styled.div`
  display: grid;
  margin: ${(props) => props.theme.margin};
  gap: 5px;
`;

const StyledGrid2ColumnsContainer = styled(StyledGridContainer)`
  grid-template-columns: 1fr 100px;
`;

const StyledGrid3ColumnsContainer = styled(StyledGridContainer)`
  grid-template-columns: fit-content(${(props) => props.theme.firstColumnSize || '160px'}) 1fr fit-content(
      ${(props) => props.theme.secondColumnSize || '70px'}
    );
  align-items: center;
`;

const StyledFlexSpaceBetweenContainer = styled(StyledFlexRowContainer)`
  justify-content: space-between;
  margin: ${(props) => props.theme.margin};
`;

const StyledFlexColumnContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  max-width: ${(props) => props.theme.maxWidth};
  overflow: hidden;
`;

const StyledSpanImage = styled.span`
  width: 18px;
  height: 18px;
  background: url(${(props) => props.theme.logo}) center no-repeat;
  display: block;
  flex-shrink: 0;
`;

const StyledSimpleText = styled.p`
  color: ${(props) => (props.theme.textColor ? props.theme.textColor : '#363942')};
  text-align: left;
  font-size: 13px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0.13px;
  opacity: 0.65;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: ${(props) => (props.theme.maxWidth ? props.theme.maxWidth : '100%')};
`;

const StyledMainText = styled.h3`
  color: #363942;
  text-align: left;
  font-size: 16px;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0.16px;
  max-width: ${(props) => (props.theme.maxWidth ? props.theme.maxWidth : 'none')};
`;

const StyledStatus = styled.span`
  background: ${(props) => props.theme.backColor};
  padding: 8px;
  border-radius: 20px;
  color: #f8f6ff;
  text-align: center;
  font-size: 13px;
  font-family: Roboto, Arial, sans-serif;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0.13px;
  margin-left: auto;
  flex-shrink: 0;
  text-wrap: nowrap;
`;

const StyledCardLine = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  opacity: 0.6;
  background: #bfbfbf;
  margin: 14px 0 15px;
`;

interface ICardProps {
  UID: string; // уникальный идентификатор карточки
  isActive?: boolean; // если карточка выбрана
  onClickHandler: (v: string) => void; // действие по нажатию на карточку
  isCornerNeeded?: boolean; // закрашиваемый уголок в левом верхнем углу карточки
  status: string; // статус карточки
  statusColor: string; // цвет подложки со статусом
  orgAvatar?: string; // аватар организации
  orgName?: string; // название организации
  userAvatar?: string; // аватар создателя
  userName: string; // имя создателя
  cardSubject: string; // тема карточки
  executorName?: string; // исполнитель
  cardNumber: string; // номер или проект карточки
  isPriorityText?: string; // текст приоритета у карточки
  priorityColor?: string; // цвет приоритета
  resHeading?: string; // текст источника (отправлено / получено)
  resType?: 'email' | 'tg'; // тип источника
  date: string;
  notificationText?: string;
  files?: string; // количество файлов в карточке
  comments?: string; // количество комментариев в карточке
}

export const Card = ({
  UID,
  isActive,
  onClickHandler,
  isCornerNeeded,
  status,
  statusColor,
  orgAvatar,
  orgName,
  userAvatar,
  userName,
  cardSubject,
  executorName,
  cardNumber,
  isPriorityText,
  priorityColor,
  resHeading,
  resType,
  date,
  notificationText,
  files,
  comments,
}: ICardProps) => {
  // возврат изображения для источника
  const resTypeHandler = (v: typeof resType) => {
    const actionMap = {
      tg: tgLogo,
      mail: mailLogo,
      // дальнейшие изображения добавлять сюда
    };
    const action = actionMap[v as keyof typeof actionMap];
    if (action) {
      return action;
    }
    return '';
  };

  return (
    <Link to={`/tasks/${UID}`}>
      <StyledTask theme={{ isActive }} onClick={() => onClickHandler(UID)}>
        {isCornerNeeded && <StyledCornerSpan theme={{ backColor: statusColor }} />}
        {/* если есть организация */}
        {!!orgName && (
          <StyledFlexRowContainer>
            <StyledSpanImage theme={{ logo: !!orgAvatar ? orgAvatar : defOrgAvatar }} />
            <StyledSimpleText>{orgName}</StyledSimpleText>
          </StyledFlexRowContainer>
        )}
        {/* инициатор, тема, исполнитель и статус  */}
        <StyledGrid2ColumnsContainer theme={{ margin: '5px 0 12px' }}>
          {/* колонка с инициатором и темой */}
          <StyledFlexColumnContainer>
            {/* инициатор */}
            <StyledFlexRowContainer>
              <StyledSpanImage theme={{ logo: !!userAvatar ? userAvatar : defUserAvatar }} />
              <StyledSimpleText>{userName}</StyledSimpleText>
            </StyledFlexRowContainer>
            {/* тема */}
            <StyledMainText>{cardSubject}</StyledMainText>
          </StyledFlexColumnContainer>
          {/* колонка с исполнителем и статусом */}
          <StyledFlexColumnContainer>
            {/* исполнитель */}
            {!!executorName && <StyledSimpleText>{executorName}</StyledSimpleText>}
            {/* статус */}
            <StyledStatus theme={{ backColor: statusColor }}>{status}</StyledStatus>
          </StyledFlexColumnContainer>
        </StyledGrid2ColumnsContainer>
        {/* номер, срочность и источник карточки */}
        <StyledFlexSpaceBetweenContainer>
          <StyledFlexRowContainer>
            {/* номер */}
            <StyledSimpleText>{cardNumber}</StyledSimpleText>
            {/* срочность */}
            {!!isPriorityText && (
              <StyledSimpleText theme={{ textColor: priorityColor, maxWidth: '100px' }}>
                {isPriorityText}
              </StyledSimpleText>
            )}
          </StyledFlexRowContainer>
          {/* источник  */}
          {resHeading && resType && (
            <StyledFlexRowContainer>
              <StyledSimpleText theme={{ maxWidth: '100px' }}>{resHeading}</StyledSimpleText>
              <StyledSpanImage theme={{ logo: resTypeHandler(resType) }} />
            </StyledFlexRowContainer>
          )}
        </StyledFlexSpaceBetweenContainer>
        <StyledCardLine />
        {/* дата, прочитано и количество файлов и комментариев */}
        <StyledGrid3ColumnsContainer theme={{ firstColumnSize: '160px' }}>
          {/* дата */}
          <StyledFlexRowContainer>
            <StyledSpanImage theme={{ logo: cardTimeLogo }} />
            <StyledSimpleText>{date.split('-').join('.').split('T').join(' - ')}</StyledSimpleText>
          </StyledFlexRowContainer>
          {/* обновлена? */}
          {!!notificationText ? (
            <StyledSimpleText>{notificationText}</StyledSimpleText>
          ) : (
            <div></div>
          )}
          {/* количество файлов и комментариев */}
          <StyledFlexRowContainer>
            {!!files && (
              <StyledFlexRowContainer>
                <StyledSpanImage theme={{ logo: filesLogo }} />
                <StyledSimpleText>{files}</StyledSimpleText>
              </StyledFlexRowContainer>
            )}
            {!!comments && (
              <StyledFlexRowContainer>
                <StyledSpanImage theme={{ logo: commLogo }} />
                <StyledSimpleText>{comments}</StyledSimpleText>
              </StyledFlexRowContainer>
            )}
          </StyledFlexRowContainer>
        </StyledGrid3ColumnsContainer>
      </StyledTask>
    </Link>
  );
};
