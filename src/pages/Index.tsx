import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PasswordGenerator from "@/components/PasswordGenerator";
import ColorConverter from "@/components/ColorConverter";
import { tools } from "@/data/tools";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "Все", icon: "Grid3x3" },
    { id: "generators", name: "Генераторы", icon: "Sparkles" },
    { id: "converters", name: "Конвертеры", icon: "RefreshCw" },
    { id: "calculators", name: "Калькуляторы", icon: "Calculator" },
    { id: "text", name: "Текст", icon: "Type" },
    { id: "image", name: "Изображения", icon: "Image" },
    { id: "web", name: "Веб", icon: "Globe" },
    { id: "finance", name: "Финансы", icon: "DollarSign" },
    { id: "crypto", name: "Крипто", icon: "Binary" },
    { id: "time", name: "Время", icon: "Clock" },
    { id: "math", name: "Математика", icon: "Calculator" },
    { id: "data", name: "Данные", icon: "Database" },
    { id: "network", name: "Сеть", icon: "Wifi" },
    { id: "dev", name: "Разработка", icon: "Code" },
    { id: "productivity", name: "Продуктивность", icon: "Target" },
    { id: "health", name: "Здоровье", icon: "Heart" },
    { id: "education", name: "Обучение", icon: "Award" },
    { id: "fun", name: "Развлечения", icon: "Star" },
    { id: "security", name: "Безопасность", icon: "Shield" },
  ];

  const filteredTools = useMemo(() => {
    let result = tools;
    
    if (activeCategory !== "all") {
      result = result.filter(tool => tool.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  const popularTools = useMemo(() => tools.filter(tool => tool.popular), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Zap" size={28} className="text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ToolBox
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Бесплатные онлайн-инструменты и сервисы для повседневных задач
          </p>
          <p className="text-lg text-primary font-semibold">
            {tools.length}+ инструментов
          </p>
        </header>

        <div className="mb-12 animate-slide-up">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Поиск среди 1000+ инструментов..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-2xl border-2 focus:border-primary transition-all"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Icon name="X" size={18} />
                </Button>
              )}
            </div>
            {searchQuery && (
              <p className="text-center mt-3 text-muted-foreground">
                Найдено: <span className="font-semibold text-primary">{filteredTools.length}</span> инструментов
              </p>
            )}
          </div>

          <div className="flex justify-center gap-2 flex-wrap max-w-6xl mx-auto">
            {categories.map((cat, index) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id)}
                size="sm"
                className={`rounded-full px-4 h-9 gap-2 transition-all hover:scale-105 text-sm ${
                  activeCategory === cat.id ? 'shadow-lg' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Icon name={cat.icon as any} size={16} />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-16">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-12">
            <TabsTrigger value="all" className="text-base">
              Все инструменты ({filteredTools.length})
            </TabsTrigger>
            <TabsTrigger value="popular" className="text-base">
              Популярное ({popularTools.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.slice(0, 100).map((tool, index) => (
                <Card 
                  key={tool.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border hover:border-primary/50 overflow-hidden"
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <div className={`h-1 bg-gradient-to-r ${tool.color}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-1">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow group-hover:scale-110 transition-transform`}>
                        <Icon name={tool.icon as any} size={20} className="text-white" />
                      </div>
                      {tool.popular && (
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <Icon name="TrendingUp" size={12} />
                          TOP
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-1">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            {filteredTools.length > 100 && (
              <div className="text-center mt-8">
                <p className="text-muted-foreground">
                  Показано первые 100 из {filteredTools.length} инструментов. Используйте поиск для уточнения.
                </p>
              </div>
            )}
            {filteredTools.length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-2xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-4">Попробуйте изменить запрос или категорию</p>
                <Button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {popularTools.map((tool, index) => (
                <Card 
                  key={tool.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border hover:border-primary/50 overflow-hidden"
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <div className={`h-1 bg-gradient-to-r ${tool.color}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-1">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow group-hover:scale-110 transition-transform`}>
                        <Icon name={tool.icon as any} size={20} className="text-white" />
                      </div>
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Icon name="TrendingUp" size={12} />
                        TOP
                      </Badge>
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-1">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={selectedTool !== null} onOpenChange={(open) => !open && setSelectedTool(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedTool === 1 && <PasswordGenerator />}
            {selectedTool === 2 && <ColorConverter />}
            {selectedTool && selectedTool > 2 && (
              <div className="text-center py-12">
                <Icon name="Construction" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl text-muted-foreground">Инструмент в разработке</p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <footer className="text-center py-12 border-t mt-16">
          <div className="flex justify-center gap-8 mb-6 flex-wrap">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Icon name="Home" size={18} />
              Главная
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Icon name="Grid3x3" size={18} />
              Категории
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Icon name="Star" size={18} />
              Популярное
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Icon name="Info" size={18} />
              О проекте
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Icon name="Mail" size={18} />
              Контакты
            </a>
          </div>
          <p className="text-muted-foreground mb-2">
            © 2024 ToolBox. Все инструменты бесплатны
          </p>
          <p className="text-sm text-muted-foreground">
            {tools.length} бесплатных онлайн-инструментов для ваших задач
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
