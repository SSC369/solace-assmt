import React from "react";
import styled from "styled-components";
import { Document } from "../App";

interface DocumentItemProps {
  document: Document;
  togglePrivacy: (id: string) => void;
  deleteDocument: (id: string) => void;
}

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
`;

const DocumentName = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const DocumentPrivacy = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button<{ privacy?: "public" | "private" }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: white;
  background-color: ${({ privacy }) =>
    privacy === "public" ? "#dc2626" : "#059669"};
  cursor: pointer;

  &:hover {
    background-color: ${({ privacy }) =>
      privacy === "public" ? "#b91c1c" : "#047857"};
  }
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: white;
  background-color: #d97706;
  cursor: pointer;

  &:hover {
    background-color: #b45309;
  }
`;

const DocumentItem: React.FC<DocumentItemProps> = ({
  document,
  togglePrivacy,
  deleteDocument,
}) => {
  return (
    <ListItem>
      <div>
        <DocumentName>{document.name}</DocumentName>
        <DocumentPrivacy>
          {document.privacy === "public" ? "Public" : "Private"}
        </DocumentPrivacy>
      </div>
      <ButtonGroup>
        <Button
          privacy={document.privacy}
          onClick={() => togglePrivacy(document.id)}
        >
          {document.privacy === "public" ? "Make Private" : "Make Public"}
        </Button>
        <DeleteButton onClick={() => deleteDocument(document.id)}>
          Delete
        </DeleteButton>
      </ButtonGroup>
    </ListItem>
  );
};

export default DocumentItem;
