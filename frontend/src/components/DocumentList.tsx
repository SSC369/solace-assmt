import React from "react";
import styled from "styled-components";
import { Document } from "../App";
import DocumentItem from "./DocumentItem";

interface DocumentListProps {
  documents: Document[];
  togglePrivacy: (id: string) => void;
  deleteDocument: (id: string) => void;
}

const ListContainer = styled.div`
  margin-bottom: 24px;
`;

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  togglePrivacy,
  deleteDocument,
}) => {
  return (
    <ListContainer>
      <ul>
        {documents.map((doc) => (
          <DocumentItem
            key={doc.id}
            document={doc}
            togglePrivacy={togglePrivacy}
            deleteDocument={deleteDocument}
          />
        ))}
      </ul>
    </ListContainer>
  );
};

export default DocumentList;
