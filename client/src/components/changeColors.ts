export function changeColorScheme(darkMode: boolean) {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--light-bg', "#140929");
      root.style.setProperty('--text-color', "#fcfdff");
      root.style.setProperty('--primary', "#1932A1");
      root.style.setProperty('--secondary', "#4D59FF");
      root.style.setProperty('--accent', "#2002BA");
      root.style.setProperty('--tags-color', "#1b2170")
    } else {
      root.style.setProperty('--text-color', "#020114");
      root.style.setProperty('--primary', "#130B5C");
      root.style.setProperty('--secondary', "#7e87ff");
      root.style.setProperty('--accent', "#5058de");
      root.style.setProperty('--light-bg', '#fcfdff');
      root.style.setProperty('--tags-color', "#c6c9ee")
    }
}