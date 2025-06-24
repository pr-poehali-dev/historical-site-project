import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import InteractiveMap from "@/components/InteractiveMap";
import PhotoGallery from "@/components/PhotoGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredEvents = [
    {
      title: "Основание города",
      year: 1147,
      description: "Первое упоминание в летописях",
      icon: "Castle",
    },
    {
      title: "Золотой век торговли",
      year: 1650,
      description: "Расцвет купеческой деятельности",
      icon: "Coins",
    },
    {
      title: "Эпоха просвещения",
      year: 1850,
      description: "Открытие школ и библиотек",
      icon: "BookOpen",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero секция */}
      <section className="vintage-paper py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-cormorant text-5xl md:text-6xl font-bold text-ink mb-6 historical-text">
              Цифровой Музей
              <span className="block text-vintage-gold">Истории Города</span>
            </h1>
            <p className="text-xl text-sepia leading-relaxed mb-8 max-w-2xl mx-auto">
              Погрузитесь в богатую историю нашего города через интерактивные
              карты, архивные фотографии и биографии исторических личностей.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-vintage-gold hover:bg-vintage-gold/90 text-ink font-bold"
              >
                <Icon name="Map" className="w-5 h-5 mr-2" />
                Исследовать карту
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-sepia text-sepia hover:bg-aged-paper"
              >
                <Icon name="Camera" className="w-5 h-5 mr-2" />
                Просмотреть архивы
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Поиск */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SearchBar />
        </div>
      </section>

      {/* Навигация по разделам */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-cormorant text-3xl font-bold text-ink text-center mb-8">
            Разделы музея
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Хронология",
                href: "/chronology",
                icon: "Clock",
                desc: "События по годам",
              },
              {
                title: "Калейдоскоп",
                href: "/kaleidoscope",
                icon: "Grid3X3",
                desc: "Аспекты города",
              },
              {
                title: "Архивы",
                href: "/archives",
                icon: "FolderOpen",
                desc: "Документы и фото",
              },
              {
                title: "Биографии",
                href: "/biographies",
                icon: "Users",
                desc: "Исторические личности",
              },
            ].map((section) => (
              <Link key={section.href} to={section.href}>
                <Card className="vintage-paper border-sepia hover:shadow-lg transition-all duration-200 hover:scale-105 museum-frame">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-vintage-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name={section.icon as any}
                        className="w-8 h-8 text-ink"
                      />
                    </div>
                    <h3 className="font-cormorant font-bold text-ink text-xl mb-2">
                      {section.title}
                    </h3>
                    <p className="text-sepia text-sm">{section.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Избранные события */}
      <section className="py-12 vintage-paper">
        <div className="container mx-auto px-4">
          <h2 className="font-cormorant text-3xl font-bold text-ink text-center mb-8">
            Ключевые события истории
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <Card key={index} className="bg-parchment border-sepia">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-vintage-gold rounded-full flex items-center justify-center">
                      <Icon
                        name={event.icon as any}
                        className="w-6 h-6 text-ink"
                      />
                    </div>
                    <span className="font-bold text-vintage-gold">
                      {event.year}
                    </span>
                  </div>
                  <CardTitle className="font-cormorant text-ink">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sepia">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Интерактивная карта */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-cormorant text-3xl font-bold text-ink text-center mb-8">
            Интерактивная историческая карта
          </h2>
          <InteractiveMap />
        </div>
      </section>

      {/* Галерея фотографий */}
      <section className="py-12 vintage-paper">
        <div className="container mx-auto px-4">
          <h2 className="font-cormorant text-3xl font-bold text-ink text-center mb-8">
            Архивные фотографии
          </h2>
          <PhotoGallery />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-parchment py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-cormorant text-lg mb-2">
            Цифровой музей истории города
          </p>
          <p className="text-aged-paper text-sm">
            Сохраняем историю для будущих поколений
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
