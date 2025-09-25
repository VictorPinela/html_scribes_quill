import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Sword, Search } from 'lucide-react';

interface DndClass {
    id: string;
    name: string;
    description: string;
    hitDie: string;
    primaryAbility: string[];
    saves: string[];
    features: string[];
}

export const Classes: React.FC = () => {
    const [classes, setClasses] = useState<DndClass[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simular carregamento de dados
        const mockClasses: DndClass[] = [
            {
                id: '1',
                name: 'Guerreiro',
                description: 'Mestres do combate, especialistas em armas e armaduras.',
                hitDie: 'd10',
                primaryAbility: ['Força', 'Destreza'],
                saves: ['Força', 'Constituição'],
                features: ['Segundo Ataque', 'Ação de Bônus']
            },
            {
                id: '2',
                name: 'Mago',
                description: 'Usuários de magia arcana que estudam para dominar feitiços.',
                hitDie: 'd6',
                primaryAbility: ['Inteligência'],
                saves: ['Inteligência', 'Sabedoria'],
                features: ['Magia Arcana', 'Preparar Magias']
            }
            // Adicione mais classes...
        ];

        setTimeout(() => {
            setClasses(mockClasses);
            setIsLoading(false);
        }, 1000);
    }, []);

    const filteredClasses = classes.filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            {/* Header da Página */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-cinzel text-white mb-2 flex items-center">
                        <Sword className="mr-3 text-yellow-400" />
                        Classes de D&D 5e
                    </h1>
                    <p className="text-blue-200 text-lg">
                        Explore todas as classes disponíveis no sistema
                    </p>
                </div>

                {/* Barra de Pesquisa */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar classes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-white/10 border border-blue-400/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Grid de Classes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.map((cls) => (
                    <div key={cls.id} className="bg-white/5 backdrop-blur-sm border border-blue-400/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-200">
                        <h3 className="text-xl font-cinzel text-white mb-2">{cls.name}</h3>
                        <p className="text-blue-200 mb-4">{cls.description}</p>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-blue-300">Dado de Vida:</span>
                                <span className="text-yellow-400 font-bold">{cls.hitDie}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-blue-300">Atributo Principal:</span>
                                <span className="text-white">{cls.primaryAbility.join(', ')}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-blue-300">Testes de Resistência:</span>
                                <span className="text-white">{cls.saves.join(', ')}</span>
                            </div>
                        </div>

                        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200">
                            Ver Detalhes
                        </button>
                    </div>
                ))}
            </div>

            {filteredClasses.length === 0 && !isLoading && (
                <div className="text-center py-12">
                    <p className="text-blue-300 text-lg">Nenhuma classe encontrada.</p>
                </div>
            )}
        </Layout>
    );
};