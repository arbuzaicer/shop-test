import { LogBox } from "react-native";

// console setup, hide anoying NOT necessary logs during development
if (true) {
  const IGNORED_WARNINGS = [
    "Node of type rule not supported as an inline style",
    "Remote debugger is in a background tab which may cause apps to perform slowly",
    "Require cycle",
    "Expected style",
    "Can't perform a React state update on an unmounted component.",
    "Warning: componentWillReceiveProps",
    "VirtualizedLists should never be nested",
    "Non-serializable values were found in the navigation state.",
  ];

  LogBox.ignoreAllLogs(true);
  LogBox.ignoreLogs(IGNORED_WARNINGS);

  const prevConsoleWarn = console.warn;
  const prevConsoleError = console.error;

  console.warn = (...args) => {
    console.log({ args });
    if (
      typeof args[0] === "string" &&
      IGNORED_WARNINGS.some((ignoredWarning) =>
        args[0].startsWith(ignoredWarning)
      )
    ) {
      return;
    }

    return prevConsoleWarn.apply(console, args);
  };

  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      IGNORED_WARNINGS.some((ignoredWarning) =>
        args[0].startsWith(ignoredWarning)
      )
    ) {
      return;
    }

    return prevConsoleError.apply(console, args);
  };
}
