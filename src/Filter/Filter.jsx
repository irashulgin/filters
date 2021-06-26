import Line from "../Line/Line";
import { useState } from "react";
import { fieldType, getAbsentValues } from "../consts";
import {
  Style,
  StyledDivSearch,
  Button,
  ButtonSearch,
  StyledDiv,
} from "./FilterStyle";

function Filter() {
  //Set query list from local storage
  const [queryList, setQueryList] = useState(
    JSON.parse(localStorage.getItem("query")) || [
      { field: "", value: [], operator: "" },
    ]
  );
  //Set initial field names
  const fields = Object.keys(fieldType).filter((item) => {
    return item !== "State" && item !== "ID";
  });
  const fieldNames = localStorage.getItem("query")
    ? getAbsentValues(fields, JSON.parse(localStorage.getItem("query")))
    : fields;
  const [fieldList, setFieldList] = useState(fieldNames);
  /**
   *
   * @param {string} deletedField
   */
  function addFieldToOptions(deletedField) {
    setFieldList((fieldList) => {
      let fList = [...fieldList];
      fList.push(deletedField);
      return fList;
    });
  }
  /**
   * Delete line
   * @param {event} event
   * @param {number} index
   */
  const deleteItem = (event, index) => {
    if (queryList.length < 2) {
      window.alert("You can not remove the last line");
      return;
    }
    setQueryList((list) => {
      const newList = [...list];
      const deletedField = newList[index].field;
      const deletedValue = newList[index].value;
      // Add field back to fields list
      addFieldToOptions(deletedField);
      // Delete line from list
      newList.length > 1 && newList.splice(index, 1);
      checkConstrains(deletedField, deletedValue);
      return newList;
    });
  };
  /**
   * Update fields after deleting line
   * @param {string} deletedField
   * @param {string} deletedValue
   */
  function checkConstrains(deletedField, deletedValue) {
    const stringQuery = JSON.stringify(queryList);
    if (deletedField === "Team") {
      addField("Created By");
      if (stringQuery.includes("Backlog")) {
        addField("ID");
      }
    }
    if (deletedField === "Created By" || deletedField === "ID") {
      addField("Team");
    }
    if (deletedValue.includes("Backlog")) {
      removeFromQuery("ID");
      removeFromFields("ID");
    }
    if (deletedValue.includes("Bug")) {
      removeFromQuery("State");
      removeFromFields("State");
    }
  }
  /**
   * Add new empty line
   */
  const addLine = () => {
    if (fieldList.length === 0) {
      return;
    }
    setQueryList((list) => {
      const newList = [...list];
      newList.push({ field: "", value: [], operator: "" });
      return newList;
    });
  };
  /**
   * Remove from field list
   * @param {string} name
   */
  function removeFromFields(name) {
    debugger;
    setFieldList((l) => {
      let newList = [...l];
      newList = newList.filter((i) => {
        return i != name;
      });
      return newList;
    });
  }
    /**
   * Remove line from query list according the name
   * @param {string} name - field name
   */
     function removeFromQuery(name) {
      setQueryList((list) => {
        let newList = [...list];
        newList = newList.filter((i) => {
          return i.field != name;
        });
        return newList;
      });
    }
  /**
   * Add field to fields list
   * @param {string} name - field name
   */
  function addField(name) {
    debugger;
    const stringQuery = JSON.stringify(queryList);
    setFieldList((l) => {
      let newList = [...l];
      if (!newList.includes(name) && !stringQuery.includes(name)) {
        newList.push(name);
      }
      return newList;
    });
  }

  /**
   * Changing the item in the line
   * @param {number} index
   * @param {string} name
   * @param {string|string[]} value
   * @param {string|undefined} previous
   */
  const changeItem = (index, name, value, previous) => {
    debugger;
    setQueryList((list) => {
      const newList = [...list];
      newList[index][name] = value;
      if (name === "field") {
        resetDependancies(newList, index);
        changeFields(value, previous);
      }
      if (name === "value") {
        changeValues(value, previous);
      }
      return newList;
    });
  };
  /**
   * Reset operator and value for the selected index
   * @param {string[]} newList
   * @param {number} index
   */
  function resetDependancies(newList, index) {
    newList[index]["operator"] = "";
    newList[index]["value"] = [];
  }

  function updateFieldPerValue(values, value, field) {
    if (values.includes(value)) {
      addField(field);
    }
  }
  function removeFieldPerValue(values, value, field, previous) {
    if (previous.includes(value) && !values.includes(value)) {
      removeFromFields(field);
      removeFromQuery(field);
    }
  }
  function changeValues(values, previous) {
    updateFieldPerValue(values, "Bug", "State");
    updateFieldPerValue(values, "Backlog", "ID");
    removeFieldPerValue(values, "Backlog", "ID", previous);
    removeFieldPerValue(values, "Bug", "State", previous);
    if (previous.includes("ID") && !values.includes("ID")) {
      addField("Team");
    }
  }
  /**
   * Update other fields and query list according the value
   * @param {string} value
   */
  function updateFields(value) {
    switch (value) {
      case "ID":
      case "Created By": {
        removeFromFields("Team");
        removeFromQuery("Team");
        break;
      }
      case "Team": {
        removeFromFields("Created By");
        removeFromQuery("Created By");
        removeFromFields("ID");
        removeFromQuery("ID");
        break;
      }
    }
  }
  /**
   * Changing the field in line
   * @param {string} value
   * @param {string} prev
   */
  function changeFields(value, prev) {
    const stringQuery = JSON.stringify(queryList);
    addField(prev);
    removeFromFields(value);
    updateFields(value);
    if (prev === "Team") {
      addField("Created By");
      if (stringQuery.includes("Backlog")) {
        addField("ID");
      }
    }
    if (prev === "Created By" || prev === "ID") {
      addField("Team");
    }
  }

  debugger;
  /**
   * Save query to localstorage
   */
  const search = () => {
    setQueryList((list) => {
      localStorage.setItem("query", JSON.stringify(list));
      alert("The query has been saved!");
      return list;
    });
  };

  return (
    <Style>
      {queryList.map((item, index) => (
        <Line
          field={item.field}
          onDelete={deleteItem}
          key={index}
          operator={item.operator}
          onChange={changeItem}
          value={item.value}
          index={index}
          fieldList={fieldList}
        />
      ))}
      {/* <Line operator={""}  field={""} 
        value={""}  index={queryList.length}/> */}

      <StyledDiv>
        {fieldList.length > 0 && (
          <Button onClick={addLine}>+ Add Criteria</Button>
        )}
      </StyledDiv>
      <StyledDivSearch>
        <ButtonSearch onClick={search}>Search</ButtonSearch>
      </StyledDivSearch>
    </Style>
  );
}
export default Filter;
