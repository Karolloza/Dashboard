import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Dashboard from "./pages/Dashboard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getLoader } from "./redux/selectors/commonSelector";
import Toast from "./components/Toast";

const S = {
  LoaderContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background-color: #000;
    opacity: 0.7;
  `
};

const App = () => {
  const isLoading = useSelector(getLoader);
  return (
    <div className="App">
      <Dashboard />
      {isLoading && (
        <S.LoaderContainer>
          <CircularProgress />
        </S.LoaderContainer>
      )}
      <Toast />
    </div>
  );
};

export default App;
