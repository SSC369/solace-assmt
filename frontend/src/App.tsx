import React, { useState } from "react";
import styled from "styled-components";
import DocumentUpload from "./components/DocumentUpload";
import DocumentSearch from "./components/DocumentSearch";
import DocumentList from "./components/DocumentList";
import empty1 from "./assets/empty1.jpg";
import empty2 from "./assets/empty2.jpg";

export interface Document {
  id: string;
  name: string;
  privacy: "public" | "private";
}

const Container = styled.div`
  min-height: 100dvh;
  background-color: #f3f4f6;
  padding: 20px;
`;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-top: 24px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyImage = styled.img`
  height: 200px;
`;

const App: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpload = (newDocuments: Document[]) => {
    setDocuments([...documents, ...newDocuments]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const togglePrivacy = (id: string) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id
          ? { ...doc, privacy: doc.privacy === "public" ? "private" : "public" }
          : doc
      )
    );
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const publicDocuments = filteredDocuments.filter(
    (doc) => doc.privacy === "public"
  );
  const privateDocuments = filteredDocuments.filter(
    (doc) => doc.privacy === "private"
  );

  return (
    <Container>
      <Wrapper>
        <Title>Document Management System</Title>
        <DocumentUpload onUpload={handleUpload} />
        <DocumentSearch onSearch={handleSearch} />

        <SectionTitle>Public Documents</SectionTitle>
        {publicDocuments.length === 0 ? (
          <ImageContainer>
            <EmptyImage src={empty1} />
          </ImageContainer>
        ) : (
          <DocumentList
            documents={publicDocuments}
            togglePrivacy={togglePrivacy}
            deleteDocument={deleteDocument}
          />
        )}

        <SectionTitle>Private Documents</SectionTitle>
        {privateDocuments.length === 0 ? (
          <ImageContainer>
            <EmptyImage src={empty2} />
          </ImageContainer>
        ) : (
          <DocumentList
            documents={privateDocuments}
            togglePrivacy={togglePrivacy}
            deleteDocument={deleteDocument}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default App;
