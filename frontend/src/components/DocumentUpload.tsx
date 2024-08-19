import React, { useState } from "react";
import styled from "styled-components";
import { Document } from "../App";

interface DocumentUploadProps {
  onUpload: (docs: Document[]) => void;
}

const UploadContainer = styled.div`
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
  margin-bottom: 8px;
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = () => {
    const newDocuments: Document[] = files.map((file) => ({
      id: file.name + Date.now(),
      name: file.name,
      privacy: "private",
    }));
    onUpload(newDocuments);
    setFiles([]);
  };

  return (
    <UploadContainer>
      <Label>Upload Documents</Label>
      <Input type="file" multiple onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </UploadContainer>
  );
};

export default DocumentUpload;
