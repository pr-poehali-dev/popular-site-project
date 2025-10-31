import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PasswordGenerator from "@/components/PasswordGenerator";
import ColorConverter from "@/components/ColorConverter";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "Все", icon: "Grid3x3" },
    { id: "generators", name: "Генераторы", icon: "Sparkles" },
    { id: "converters", name: "Конвертеры", icon: "RefreshCw" },
    { id: "calculators", name: "Калькуляторы", icon: "Calculator" },
    { id: "text", name: "Текст", icon: "Type" },
  ];

  const tools = [
    {
      id: 1,
      name: "Генератор паролей",
      description: "Создавайте безопасные пароли любой сложности",
      icon: "Key",
      category: "generators",
      popular: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Конвертер цветов",
      description: "HEX, RGB, HSL - конвертируйте цвета между форматами",
      icon: "Palette",
      category: "converters",
      popular: true,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      name: "Калькулятор процентов",
      description: "Быстрый расчёт процентов и скидок",
      icon: "Percent",
      category: "calculators",
      popular: false,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 4,
      name: "Счётчик символов",
      description: "Подсчёт слов, символов и предложений в тексте",
      icon: "Hash",
      category: "text",
      popular: true,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      name: "Генератор QR-кодов",
      description: "Создавайте QR-коды для ссылок и текста",
      icon: "QrCode",
      category: "generators",
      popular: false,
      color: "from-violet-500 to-purple-500"
    },
    {
      id: 6,
      name: "Конвертер единиц",
      description: "Конвертация длины, веса, температуры и других величин",
      icon: "Ruler",
      category: "converters",
      popular: false,
      color: "from-pink-500 to-rose-500"
    },
  ];

  const filteredTools = activeCategory === "all" 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  const popularTools = tools.filter(tool => tool.popular);

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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Бесплатные онлайн-инструменты и сервисы для повседневных задач
          </p>
        </header>

        <div className="mb-12 animate-slide-up">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Поиск инструментов..." 
                className="pl-12 h-14 text-lg rounded-2xl border-2 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((cat, index) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-6 h-11 gap-2 transition-all hover:scale-105 ${
                  activeCategory === cat.id ? 'shadow-lg' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon name={cat.icon as any} size={18} />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-16">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-12">
            <TabsTrigger value="all" className="text-base">Все инструменты</TabsTrigger>
            <TabsTrigger value="popular" className="text-base">Популярное</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <Card 
                  key={tool.id} 
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary/50 overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon name={tool.icon as any} size={26} className="text-white" />
                      </div>
                      {tool.popular && (
                        <Badge variant="secondary" className="gap-1">
                          <Icon name="TrendingUp" size={14} />
                          Популярное
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setSelectedTool(tool.id)}
                      className="w-full rounded-xl h-11 gap-2 group/btn"
                    >
                      Открыть
                      <Icon name="ArrowRight" size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((tool, index) => (
                <Card 
                  key={tool.id} 
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary/50 overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon name={tool.icon as any} size={26} className="text-white" />
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <Icon name="TrendingUp" size={14} />
                        Популярное
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setSelectedTool(tool.id)}
                      className="w-full rounded-xl h-11 gap-2 group/btn"
                    >
                      Открыть
                      <Icon name="ArrowRight" size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
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

        <footer className="text-center py-12 border-t">
          <div className="flex justify-center gap-8 mb-6">
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
          <p className="text-muted-foreground">
            © 2024 ToolBox. Все инструменты бесплатны
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;