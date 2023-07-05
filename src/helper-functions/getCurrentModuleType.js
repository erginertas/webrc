export const getCurrentModuleType = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem("module"))?.module_type;
  }
};
