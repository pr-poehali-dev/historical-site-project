import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: "Главная", href: "/", icon: "Home" },
    { name: "Хронология", href: "/chronology", icon: "Clock" },
    { name: "Калейдоскоп", href: "/kaleidoscope", icon: "Grid3X3" },
    { name: "Архивы", href: "/archives", icon: "FolderOpen" },
    { name: "Биографии", href: "/biographies", icon: "Users" },
    { name: "Карта", href: "/map", icon: "Map" },
  ];

  return (
    <header className="vintage-paper border-b-4 border-sepia shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-vintage-gold rounded-full flex items-center justify-center museum-frame">
              <Icon name="Landmark" className="w-6 h-6 text-ink" />
            </div>
            <div>
              <h1 className="font-cormorant text-2xl font-bold text-ink">
                Исторический Архив
              </h1>
              <p className="text-sm text-sepia">Цифровой музей города</p>
            </div>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      location.pathname === item.href
                        ? "bg-vintage-gold text-ink shadow-md animate-sepia-glow"
                        : "text-sepia hover:bg-aged-paper hover:text-ink"
                    }`}
                  >
                    <Icon name={item.icon as any} size={18} />
                    <span className="font-merriweather font-medium">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
