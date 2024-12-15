import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

export const ErrorMessage = styled.div`
  color: #ef4444;
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
`;

export const GoogleButton = styled.button`
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transform: translateY(-1px);
  }
`;