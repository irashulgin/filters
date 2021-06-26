export const fieldType = {
  ["Work Item Type"]: {
    operators: ["equals", "contains", "does not contain"],
    values: ["Backlog", "Bug", "Task"],
  },
  ["Team"]: {
    operators: ["include", "exclude"],
    values: ["Team A", "Team B", "Team C"],
  },
  ["Created By"]: {
    operators: ["include", "exclude"],
    values: ["User A", "User B", "User C"],
  },
  ["Tags"]: {
    operators: ["include", "exclude"],
    values: ["UI", "DSP", "ADFR", "DB"],
  },
  ["State"]: {
    operators: ["equals", "contains", "does not contain"],
    values: ["New", "In progress", "Done"],
  },
  ["ID"]: {
    operators: ["equals", "Starts With", "Ends With"],
    values: [1, 2, 3],
  },
};

const checkConstrains = (res) => {
  if (
    localStorage.getItem("query").includes("ID") ||
    (localStorage.getItem("query").includes("Created by") &&
      !localStorage.getItem("query").includes("Team"))
  ) {
    res.pop("Team");
  }
  if (
    localStorage.getItem("query").includes("Backlog") &&
    !localStorage.getItem("query").includes("ID")
  ) {
    res.push("ID");
  }
  if (
    localStorage.getItem("query").includes("Bug") &&
    !localStorage.getItem("query").includes("State")
  ) {
    res.push("State");
  }

  return res;
};

export const getAbsentValues = (arr1, arr2, local) => {
  let res = [];
  debugger;
  res = arr1.filter((el) => {
    return !arr2.find((obj) => {
      return el === obj.field;
    });
  });
  if (local) checkConstrains(res);
  return res;
};