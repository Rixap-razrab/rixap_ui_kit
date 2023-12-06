import styled from 'styled-components';
import attachLogo from './assets/files.svg';

const StyledFlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledFileInputContainer = styled.label`
  width: 30px;
  height: 30px;
  background: url(${attachLogo}) center no-repeat;
  cursor: ${(props) => (props.theme.isLoading ? 'not-allowed' : 'pointer')};
`;

const StyledInputFile = styled.input`
  position: relative;
  opacity: 0;
  z-index: 2;
  width: 30px;
  height: 30px;
  display: none;
`;

const StyledTextAreaNewFileDesc = styled.p`
  color: #bfc8e8;
  font-size: 13px;
  font-family: Roboto;
`;

interface IProps {
  handleUploadFile: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const DescTextArea = ({ handleUploadFile, isLoading }: IProps) => {
  return (
    <StyledFlexDiv>
      <StyledFileInputContainer htmlFor={'file-upload'} theme={{ isLoading }}>
        <StyledInputFile
          id="file-upload"
          type="file"
          onChange={handleUploadFile}
          accept=".png,.jpg,.jpeg"
          disabled={isLoading}
        />
        {/* // accept=".png,.jpg,.pdf,.doc,.docx,.xml" */}
      </StyledFileInputContainer>
      <StyledTextAreaNewFileDesc>Добавить изображение</StyledTextAreaNewFileDesc>
    </StyledFlexDiv>
  );
};

export default DescTextArea;
