import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      toast.error("Выберите хотя бы один тип символов");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    toast.success("Пароль сгенерирован!");
  };

  const copyToClipboard = () => {
    if (!password) {
      toast.error("Сначала сгенерируйте пароль");
      return;
    }
    navigator.clipboard.writeText(password);
    toast.success("Пароль скопирован в буфер обмена!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-2">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Icon name="Key" size={24} className="text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Генератор паролей</CardTitle>
            <CardDescription>Создавайте безопасные пароли</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input 
            value={password} 
            readOnly 
            placeholder="Ваш пароль появится здесь"
            className="font-mono text-lg h-14"
          />
          <Button 
            onClick={copyToClipboard} 
            variant="outline" 
            size="icon"
            className="h-14 w-14"
          >
            <Icon name="Copy" size={20} />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Длина пароля: {length[0]}</Label>
            </div>
            <Slider 
              value={length}
              onValueChange={setLength}
              min={4}
              max={32}
              step={1}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <Label htmlFor="uppercase" className="cursor-pointer">Заглавные (A-Z)</Label>
              <Switch 
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>

            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <Label htmlFor="lowercase" className="cursor-pointer">Строчные (a-z)</Label>
              <Switch 
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
            </div>

            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <Label htmlFor="numbers" className="cursor-pointer">Цифры (0-9)</Label>
              <Switch 
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>

            <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border">
              <Label htmlFor="symbols" className="cursor-pointer">Символы (!@#$)</Label>
              <Switch 
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={generatePassword} 
          className="w-full h-14 text-lg gap-2"
        >
          <Icon name="Sparkles" size={20} />
          Сгенерировать пароль
        </Button>
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;
