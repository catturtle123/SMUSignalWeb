import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../utils/ThemeProvider';
import maleButton from '../assets/maleButton.svg';
import maleButtonSelected from '../assets/maleButtonSelected.svg';

const GenderSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const GenderButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0 10px;
  cursor: pointer;
  outline: none;
`;

const GenderImage = styled.img`
  width: 60px;
  height: 60px;
`;

const GenderSelection = ({ selectedGender, onGenderChange }) => {
  const theme = useTheme();

  const handleGenderChange = (gender) => {
    if (onGenderChange) {
      onGenderChange(gender);
    }
  };

  return (
    <GenderSelectorContainer>
      <GenderButton onClick={() => handleGenderChange('male')}>
        <GenderImage 
          src={selectedGender === 'male' ? maleButtonSelected : maleButton} 
          alt="Male" 
        />
      </GenderButton>
    </GenderSelectorContainer>
  );
};

export default GenderSelection; 