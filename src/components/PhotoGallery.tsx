import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface HistoricalPhoto {
  id: string;
  title: string;
  year: number;
  description: string;
  imageUrl: string;
  category: string;
  location: string;
}

const mockPhotos: HistoricalPhoto[] = [
  {
    id: "1",
    title: "Центральная площадь",
    year: 1895,
    description: "Вид на главную площадь города в конце XIX века",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    category: "Архитектура",
    location: "Центр города",
  },
  {
    id: "2",
    title: "Городской театр",
    year: 1910,
    description: "Торжественное открытие нового театрального здания",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?w=400&h=300&fit=crop",
    category: "Культура",
    location: "Театральная площадь",
  },
  {
    id: "3",
    title: "Торговые ряды",
    year: 1920,
    description: "Оживленная торговля на городском рынке",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    category: "Быт",
    location: "Рыночная площадь",
  },
  {
    id: "4",
    title: "Школьники",
    year: 1935,
    description: "Выпускной класс городской гимназии",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    category: "Образование",
    location: "Городская гимназия",
  },
  {
    id: "5",
    title: "Военный парад",
    year: 1945,
    description: "Празднование Дня Победы на главной площади",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    category: "История",
    location: "Центральная площадь",
  },
  {
    id: "6",
    title: "Набережная",
    year: 1960,
    description: "Благоустройство городской набережной",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2ac1?w=400&h=300&fit=crop",
    category: "Архитектура",
    location: "Набережная",
  },
];

const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<HistoricalPhoto | null>(
    null,
  );

  const categories = [
    "all",
    ...new Set(mockPhotos.map((photo) => photo.category)),
  ];
  const categoryLabels: Record<string, string> = {
    all: "Все фото",
    Архитектура: "Архитектура",
    Культура: "Культура",
    Быт: "Быт и традиции",
    Образование: "Образование",
    История: "Исторические события",
  };

  const filteredPhotos = mockPhotos.filter(
    (photo) =>
      selectedCategory === "all" || photo.category === selectedCategory,
  );

  return (
    <div className="space-y-6">
      {/* Фильтры категорий */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "bg-vintage-gold text-ink hover:bg-vintage-gold/90"
                : "bg-parchment border-sepia text-sepia hover:bg-aged-paper"
            }
          >
            {categoryLabels[category]}
          </Button>
        ))}
      </div>

      {/* Галерея фотографий */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <Dialog key={photo.id}>
            <DialogTrigger asChild>
              <Card className="vintage-paper border-sepia cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 museum-frame">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-48 object-cover sepia-effect hover:sepia-0 transition-all duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-vintage-gold text-ink">
                        {photo.year}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-cormorant font-bold text-ink text-lg mb-2">
                      {photo.title}
                    </h3>
                    <p className="text-sepia text-sm mb-3 line-clamp-2">
                      {photo.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-sepia text-sepia"
                      >
                        {photo.category}
                      </Badge>
                      <div className="flex items-center text-xs text-sepia">
                        <Icon name="MapPin" className="w-3 h-3 mr-1" />
                        {photo.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-4xl vintage-paper border-sepia">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="museum-frame">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-auto object-cover sepia-effect"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-vintage-gold text-ink">
                      {photo.year} год
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-sepia text-sepia"
                    >
                      {photo.category}
                    </Badge>
                  </div>
                  <h2 className="font-cormorant font-bold text-ink text-2xl">
                    {photo.title}
                  </h2>
                  <p className="text-sepia leading-relaxed">
                    {photo.description}
                  </p>
                  <div className="flex items-center text-sepia">
                    <Icon name="MapPin" className="w-4 h-4 mr-2" />
                    <span className="font-medium">{photo.location}</span>
                  </div>
                  <div className="pt-4 border-t border-sepia">
                    <p className="text-xs text-sepia">
                      Из архивной коллекции цифрового музея города
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Кнопка добавления новых материалов */}
      <Card className="vintage-paper border-sepia border-dashed">
        <CardContent className="p-8 text-center">
          <Icon
            name="Plus"
            className="w-12 h-12 mx-auto mb-4 text-sepia opacity-50"
          />
          <h3 className="font-cormorant font-bold text-ink text-lg mb-2">
            Добавить архивные материалы
          </h3>
          <p className="text-sepia mb-4">
            Поделитесь историческими фотографиями и документами из вашего
            семейного архива
          </p>
          <Button className="bg-vintage-gold hover:bg-vintage-gold/90 text-ink">
            <Icon name="Upload" className="w-4 h-4 mr-2" />
            Загрузить материалы
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoGallery;
