import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const ColorConverter = () => {
  const [hex, setHex] = useState("#9b87f5");
  const [rgb, setRgb] = useState({ r: 155, g: 135, b: 245 });
  const [hsl, setHsl] = useState({ h: 250, s: 83, l: 75 });

  const hexToRgb = (hexValue: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hexValue = x.toString(16);
      return hexValue.length === 1 ? "0" + hexValue : hexValue;
    }).join("");
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const updateFromHex = (newHex: string) => {
    setHex(newHex);
    const rgbValue = hexToRgb(newHex);
    if (rgbValue) {
      setRgb(rgbValue);
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const copyValue = (value: string, format: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${format} скопирован: ${value}`);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-2">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Icon name="Palette" size={24} className="text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Конвертер цветов</CardTitle>
            <CardDescription>Конвертируйте между HEX, RGB и HSL</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          className="w-full h-32 rounded-2xl border-4 border-white shadow-xl transition-all"
          style={{ backgroundColor: hex }}
        />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hex">HEX</Label>
            <div className="flex gap-2">
              <Input 
                id="hex"
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="font-mono text-lg h-12"
                placeholder="#000000"
              />
              <Button 
                onClick={() => copyValue(hex, "HEX")}
                variant="outline"
                size="icon"
                className="h-12 w-12"
              >
                <Icon name="Copy" size={18} />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>RGB</Label>
            <div className="flex gap-2">
              <Input 
                value={rgb.r}
                onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, rgb.g, rgb.b)}
                type="number"
                min="0"
                max="255"
                className="h-12"
                placeholder="R"
              />
              <Input 
                value={rgb.g}
                onChange={(e) => updateFromRgb(rgb.r, parseInt(e.target.value) || 0, rgb.b)}
                type="number"
                min="0"
                max="255"
                className="h-12"
                placeholder="G"
              />
              <Input 
                value={rgb.b}
                onChange={(e) => updateFromRgb(rgb.r, rgb.g, parseInt(e.target.value) || 0)}
                type="number"
                min="0"
                max="255"
                className="h-12"
                placeholder="B"
              />
              <Button 
                onClick={() => copyValue(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
                variant="outline"
                size="icon"
                className="h-12 w-12"
              >
                <Icon name="Copy" size={18} />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>HSL</Label>
            <div className="flex gap-2">
              <Input 
                value={hsl.h}
                readOnly
                className="h-12"
                placeholder="H"
              />
              <Input 
                value={`${hsl.s}%`}
                readOnly
                className="h-12"
                placeholder="S"
              />
              <Input 
                value={`${hsl.l}%`}
                readOnly
                className="h-12"
                placeholder="L"
              />
              <Button 
                onClick={() => copyValue(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
                variant="outline"
                size="icon"
                className="h-12 w-12"
              >
                <Icon name="Copy" size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {["#9b87f5", "#0EA5E9", "#F97316", "#10B981", "#EC4899"].map((color) => (
            <button
              key={color}
              onClick={() => updateFromHex(color)}
              className="h-12 rounded-lg border-2 border-white shadow-md hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorConverter;
