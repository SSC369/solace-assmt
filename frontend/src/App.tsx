import React, { useState, Suspense } from "react";
import styled from "styled-components";
import empty1 from "./assets/empty1.jpg";
import empty2 from "./assets/empty2.jpg";

const DocumentUpload = React.lazy(() => import("./components/DocumentUpload"));
const DocumentSearch = React.lazy(() => import("./components/DocumentSearch"));
const DocumentList = React.lazy(() => import("./components/DocumentList"));

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

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
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
        <Suspense
          fallback={<LoadingMessage>Loading upload form...</LoadingMessage>}
        >
          <DocumentUpload onUpload={handleUpload} />
        </Suspense>
        <Suspense
          fallback={<LoadingMessage>Loading search form...</LoadingMessage>}
        >
          <DocumentSearch onSearch={handleSearch} />
        </Suspense>

        <SectionTitle>Public Documents</SectionTitle>
        {publicDocuments.length === 0 ? (
          <ImageContainer>
            <EmptyImage src={empty1} alt="No public documents" />
          </ImageContainer>
        ) : (
          <Suspense
            fallback={
              <LoadingMessage>Loading public documents...</LoadingMessage>
            }
          >
            <DocumentList
              documents={publicDocuments}
              togglePrivacy={togglePrivacy}
              deleteDocument={deleteDocument}
            />
          </Suspense>
        )}

        <SectionTitle>Private Documents</SectionTitle>
        {privateDocuments.length === 0 ? (
          <ImageContainer>
            <EmptyImage src={empty2} alt="No private documents" />
          </ImageContainer>
        ) : (
          <Suspense
            fallback={
              <LoadingMessage>Loading private documents...</LoadingMessage>
            }
          >
            <DocumentList
              documents={privateDocuments}
              togglePrivacy={togglePrivacy}
              deleteDocument={deleteDocument}
            />
          </Suspense>
        )}
      </Wrapper>
    </Container>
  );
};

export default App;
