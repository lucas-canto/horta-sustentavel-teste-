import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostSearchMap } from "@/service/PostSearchMap";
import { useMutation } from "@tanstack/react-query";
import { MapPin, MapPinnedIcon, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface CommunityGarden {
  id: number;
  name: string;
  address: string;
  coordinator: string;
  contact: {
    phone?: string;
    email?: string;
  };
  description: string;
  vegetables: string[];
  openHours: string;
  rating: number;
  distance: string;
  status: "active" | "planning" | "maintenance";
}

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { mutate, data, isPending } = useMutation({
    mutationFn: PostSearchMap,
  });

  function handleSearch() {
    mutate(searchQuery);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-elegant">
              <MapPin className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Mapa das Hortas Comunitárias
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Encontre hortas comunitárias próximas a você e conecte-se com
            produtores locais
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 gap-3 items-center justify-center flex flex- row">
          <div className=" relative w-[50%]">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, endereço ou coordenador..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            disabled={isPending}
            onClick={handleSearch}
            className="p-2 bg-green-500 cursor-pointer hover:bg-green-500/50 text-white rounded-sm "
          >
            <p>Buscar</p>
          </Button>
        </div>

        {/* Gardens List */}
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1 w-full ">
          {data &&
            data.hortas.map((horta, i) => (
              <Link to={`/${horta.id_produtor}`}>
              <div className="border rounded-md p-4 cursor-pointer hover:border-green-500">
                
                <p className="font-semibold text-lg text-green-700">
                  {horta.nome}
                </p>

                <p className="text-slate-500 min-h-[100px]">{horta.descricao}</p>

                <div className="flex flex-row items-center border-t mt-2 pt-2 gap-2">
                  <MapPinnedIcon size={16} className="text-green-600" />
                  <p className="text-sm text-green-700">
                    {horta.endereco} - {horta.bairro}
                  </p>
                </div>
              </div></Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
