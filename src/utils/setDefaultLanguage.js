export const setDefaultLanguage = () => {
  const lan = "en";
  localStorage.setItem("language-setting", JSON.stringify(lan));
};
