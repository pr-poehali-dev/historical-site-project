import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Icon from "@/components/ui/icon";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const handleSearch = () => {
    console.log("Поиск:", { searchQuery, searchType, dateFrom, dateTo });
  };

  return (
    <div className="vintage-paper rounded-lg p-6 shadow-lg border-2 border-sepia">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Поиск по событиям, личностям, местам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-parchment border-sepia focus:border-vintage-gold text-ink placeholder:text-sepia/70"
          />
        </div>

        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-full md:w-48 bg-parchment border-sepia">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="vintage-paper border-sepia">
            <SelectItem value="all">Все материалы</SelectItem>
            <SelectItem value="events">События</SelectItem>
            <SelectItem value="people">Персоналии</SelectItem>
            <SelectItem value="places">Места</SelectItem>
            <SelectItem value="photos">Фотографии</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-parchment border-sepia hover:bg-aged-paper text-ink"
              >
                <Icon name="Calendar" className="w-4 h-4 mr-2" />
                {dateFrom
                  ? format(dateFrom, "dd.MM.yyyy", { locale: ru })
                  : "От"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 vintage-paper border-sepia">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={setDateFrom}
                locale={ru}
                className="text-ink"
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-parchment border-sepia hover:bg-aged-paper text-ink"
              >
                <Icon name="Calendar" className="w-4 h-4 mr-2" />
                {dateTo ? format(dateTo, "dd.MM.yyyy", { locale: ru }) : "До"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 vintage-paper border-sepia">
              <Calendar
                mode="single"
                selected={dateTo}
                onSelect={setDateTo}
                locale={ru}
                className="text-ink"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          onClick={handleSearch}
          className="bg-vintage-gold hover:bg-vintage-gold/90 text-ink font-medium"
        >
          <Icon name="Search" className="w-4 h-4 mr-2" />
          Найти
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
