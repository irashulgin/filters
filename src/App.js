import "./App.css";
// import Line from "./Line";
// import styled from "styled-components";
// import { useState } from "react";
// import { fieldType, getAbsentValues } from "./consts";
 import Filter from "./Filter/Filter";
// import {
//   Style,
//   StyledDivSearch,
//   Button,
//   ButtonSearch,
//   StyledDiv,
// } from "./styles11";

function App() {
  return (
    <Filter></Filter>
    // <Style>
    //   {queryList.map((item, index) => (
    //     <Line
    //       field={item.field}
    //       onDelete={deleteItem}
    //       key={index}
    //       operator={item.operator}
    //       onChange={changeItem}
    //       value={item.value}
    //       index={index}
    //       fieldList={fieldList}
    //     />
    //   ))}
    //   {/* <Line operator={""}  field={""} 
    //     value={""}  index={queryList.length}/> */}

    //   <StyledDiv>
    //     {fieldList.length > 0 && (
    //       <Button onClick={addItem}>+ Add Criteria</Button>
    //     )}
    //   </StyledDiv>
    //   <StyledDivSearch>
    //     <ButtonSearch onClick={search}>Search</ButtonSearch>
    //   </StyledDivSearch>
    // </Style>
  );
}

export default App;
