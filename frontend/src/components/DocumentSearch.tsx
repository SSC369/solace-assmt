import React from "react";
import styled from "styled-components";

interface DocumentSearchProps {
  onSearch: (query: string) => void;
}

const SearchContainer = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const DocumentSearch: React.FC<DocumentSearchProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <SearchContainer>
      <Label>Search Documents</Label>
      <Input
        type="text"
        placeholder="Search documents..."
        onChange={handleSearch}
      />
    </SearchContainer>
  );
};

export default DocumentSearch;
