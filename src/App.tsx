import "./styles.css";
import { Container } from "@mui/material";
import { Routes } from "./routes";
import React from "react";
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        {Routes}
      </BrowserRouter>
    </Container>
  );
}
