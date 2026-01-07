import { useEffect } from "react";

const themes = [
  { name: "Azul Trello", color: "#0079bf" },
  { name: "Verde Menta", color: "#519839" },
  { name: "Naranja", color: "#d29034" },
  { name: "Rojo Intenso", color: "#b04632" },
  { name: "Púrpura", color: "#89609e" },
];

function ThemeSelector() {
  const changeTheme = (color) => {
    document.documentElement.style.setProperty("--color-primary", color);
    localStorage.setItem("trello-theme", color);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("trello-theme");
    if (savedTheme) {
      changeTheme(savedTheme);
    }
  }, []);

  return (
    <div className="flex gap-2 items-center bg-white/50 p-2 rounded-lg backdrop-blur-sm">
      <span className="text-xs font-bold text-slate-700 mr-1">Tema:</span>
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => changeTheme(theme.color)}
          className="w-6 h-6 rounded-full border-2 border-white hover:scale-110 transition-transform shadow-sm"
          style={{ backgroundColor: theme.color }}
          title={theme.name}
        />
      ))}
    </div>
  );
}

export default ThemeSelector;
