import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

interface HistoricalEvent {
  id: string;
  title: string;
  year: number;
  description: string;
  location: { x: number; y: number };
  type: "political" | "cultural" | "architectural" | "social";
}

const mockEvents: HistoricalEvent[] = [
  {
    id: "1",
    title: "Основание города",
    year: 1147,
    description: "Первое упоминание города в летописях",
    location: { x: 45, y: 55 },
    type: "political",
  },
  {
    id: "2",
    title: "Строительство собора",
    year: 1240,
    description: "Возведение главного городского храма",
    location: { x: 50, y: 50 },
    type: "architectural",
  },
  {
    id: "3",
    title: "Торговая площадь",
    year: 1350,
    description: "Открытие центральной торговой площади",
    location: { x: 60, y: 40 },
    type: "social",
  },
  {
    id: "4",
    title: "Театр и культура",
    year: 1825,
    description: "Открытие первого городского театра",
    location: { x: 35, y: 65 },
    type: "cultural",
  },
];

const InteractiveMap = () => {
  const [selectedYear, setSelectedYear] = useState([1400]);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(
    null,
  );
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredEvents = mockEvents.filter((event) => {
    const yearMatch = event.year <= selectedYear[0];
    const typeMatch = activeFilter === "all" || event.type === activeFilter;
    return yearMatch && typeMatch;
  });

  const eventTypeColors = {
    political: "bg-red-100 text-red-800 border-red-300",
    cultural: "bg-blue-100 text-blue-800 border-blue-300",
    architectural: "bg-green-100 text-green-800 border-green-300",
    social: "bg-yellow-100 text-yellow-800 border-yellow-300",
  };

  const eventTypeLabels = {
    political: "Политическое",
    cultural: "Культурное",
    architectural: "Архитектурное",
    social: "Социальное",
  };

  return (
    <div className="space-y-6">
      {/* Временная шкала */}
      <Card className="vintage-paper border-sepia">
        <CardHeader>
          <CardTitle className="font-cormorant text-ink flex items-center">
            <Icon name="Clock" className="w-5 h-5 mr-2" />
            Временная шкала: {selectedYear[0]} год
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={selectedYear}
              onValueChange={setSelectedYear}
              max={2024}
              min={1100}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-sepia">
              <span>1100</span>
              <span>1500</span>
              <span>1800</span>
              <span>2024</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Карта */}
        <div className="lg:col-span-2">
          <Card className="vintage-paper border-sepia">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-cormorant text-ink">
                  Историческая карта города
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={activeFilter === "all" ? "default" : "outline"}
                    onClick={() => setActiveFilter("all")}
                    className="text-xs"
                  >
                    Все
                  </Button>
                  {Object.entries(eventTypeLabels).map(([type, label]) => (
                    <Button
                      key={type}
                      size="sm"
                      variant={activeFilter === type ? "default" : "outline"}
                      onClick={() => setActiveFilter(type)}
                      className="text-xs"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 bg-aged-paper rounded-lg border-2 border-sepia sepia-effect overflow-hidden">
                {/* Фоновая карта-заглушка */}
                <div className="absolute inset-0 bg-gradient-to-br from-aged-paper via-parchment to-aged-paper opacity-60"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M20%2020c0%2011.046-8.954%2020-20%2020v20h40V20H20z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

                {/* Маркеры событий */}
                {filteredEvents.map((event) => (
                  <button
                    key={event.id}
                    className={`absolute w-4 h-4 rounded-full border-2 shadow-lg transition-all duration-200 hover:scale-125 ${
                      selectedEvent?.id === event.id
                        ? "bg-vintage-gold border-ink animate-sepia-glow"
                        : "bg-sepia border-parchment hover:bg-vintage-gold"
                    }`}
                    style={{
                      left: `${event.location.x}%`,
                      top: `${event.location.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => setSelectedEvent(event)}
                  />
                ))}

                {/* Подсказка для взаимодействия */}
                <div className="absolute bottom-4 left-4 text-xs text-sepia bg-parchment/80 px-2 py-1 rounded">
                  Нажмите на маркеры для просмотра событий
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Информация о событии */}
        <div className="space-y-4">
          {selectedEvent ? (
            <Card className="vintage-paper border-sepia">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={eventTypeColors[selectedEvent.type]}>
                    {eventTypeLabels[selectedEvent.type]}
                  </Badge>
                  <span className="text-sm text-sepia font-bold">
                    {selectedEvent.year} год
                  </span>
                </div>
                <CardTitle className="font-cormorant text-ink text-lg">
                  {selectedEvent.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sepia leading-relaxed">
                  {selectedEvent.description}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="vintage-paper border-sepia">
              <CardContent className="pt-6">
                <div className="text-center text-sepia">
                  <Icon
                    name="MapPin"
                    className="w-8 h-8 mx-auto mb-2 opacity-50"
                  />
                  <p>Выберите событие на карте для просмотра подробностей</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Список событий */}
          <Card className="vintage-paper border-sepia">
            <CardHeader>
              <CardTitle className="font-cormorant text-ink text-lg">
                События до {selectedYear[0]} года
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                      selectedEvent?.id === event.id
                        ? "bg-vintage-gold border-ink"
                        : "bg-parchment border-sepia hover:bg-aged-paper"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-ink text-sm">
                        {event.title}
                      </span>
                      <span className="text-xs text-sepia font-bold">
                        {event.year}
                      </span>
                    </div>
                    <Badge size="sm" className={eventTypeColors[event.type]}>
                      {eventTypeLabels[event.type]}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
