import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
import { characterService } from '../services/characterService';
import { type Character } from '../types';
import { Plus, Sword, Shield, Sparkles } from 'lucide-react';
import { CharacterCard } from '../components/layout/CharacterCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Layout } from '../components/layout/Layout';

export const Dashboard: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadCharacters();
    }, []);

    const loadCharacters = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const data = await characterService.getCharacters();
            setCharacters(data);
        } catch (error) {
            console.error('Erro ao carregar personagens:', error);
            setError('Erro ao carregar personagens. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCharacter = () => {
        navigate('/characters/new');
    };

    const handleDeleteCharacter = async (characterId: string, characterName: string) => {
        if (window.confirm(`Tem certeza que deseja excluir "${characterName}"? Esta ação não pode ser desfeita.`)) {
            try {
                await characterService.deleteCharacter(characterId);
                await loadCharacters(); // Refresh automático
            } catch (error) {
                console.error('Erro ao excluir personagem:', error);
                setError('Erro ao excluir personagem. Tente novamente.');
            }
        }
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="flex items-center justify-center py-12">
                    <LoadingSpinner
                        size="lg"
                        color="metallic"
                        text="Carregando seus personagens..."
                    />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Header da Página */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-cinzel text-white mb-2 flex items-center">
                        <Sword className="mr-3 text-yellow-400" />
                        Meus Personagens
                    </h1>
                    <p className="text-blue-200 text-lg">
                        {characters.length} personagem{characters.length !== 1 ? 's' : ''} criado{characters.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <button
                    onClick={handleCreateCharacter}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                    <Plus size={20} />
                    <span className="font-cinzel">Novo Personagem</span>
                </button>
            </div>

            {/* Tratamento de Erro */}
            {error && (
                <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-lg mb-6 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    <span>{error}</span>
                    <button
                        onClick={loadCharacters}
                        className="ml-auto bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                    >
                        Tentar Novamente
                    </button>
                </div>
            )}

            {/* Grid de Personagens ou Empty State */}
            {characters.length === 0 ? (
                // Empty State Elaborado
                <div className="text-center py-16 bg-white/5 rounded-2xl border-2 border-blue-400/20 backdrop-blur-sm">
                    <div className="max-w-md mx-auto">
                        <div className="text-8xl mb-6 animate-bounce">
                            ⚔️
                        </div>

                        <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />

                        <h2 className="text-3xl font-cinzel text-white mb-4">
                            Sua Jornada Começa Aqui
                        </h2>

                        <p className="text-blue-200 text-lg mb-2">
                            Nenhum personagem encontrado em suas aventuras
                        </p>

                        <p className="text-blue-300 mb-8">
                            Crie seu primeiro personagem e embarque em épicas missões!
                        </p>

                        <div className="space-y-4">
                            <button
                                onClick={handleCreateCharacter}
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-gray-900 px-8 py-4 rounded-xl font-cinzel text-lg flex items-center justify-center space-x-3 mx-auto transition-all duration-200 transform hover:scale-105"
                            >
                                <Plus size={24} />
                                <span>Criar Primeiro Personagem</span>
                            </button>

                            <div className="flex justify-center space-x-6 text-blue-300 text-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <span>Personagens personalizados</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span>Sistema D&D 5e</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span>Salve suas aventuras</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Grid de Personagens
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {characters.map((character) => (
                            <CharacterCard
                                key={character._id}
                                character={character}
                                onEdit={() => navigate(`/characters/${character._id}/edit`)}
                                onView={() => navigate(`/characters/${character._id}`)}
                                onDelete={() => handleDeleteCharacter(character._id, character.name)}
                            />
                        ))}
                    </div>

                    {/* Botão de Criar Mais no Final da Lista */}
                    <div className="text-center mt-12">
                        <button
                            onClick={handleCreateCharacter}
                            className="bg-blue-600/50 hover:bg-blue-700/50 text-white px-6 py-3 rounded-lg border-2 border-blue-400/30 border-dashed flex items-center space-x-2 mx-auto transition-all duration-200 hover:border-solid"
                        >
                            <Plus size={20} />
                            <span>Criar Novo Personagem</span>
                        </button>
                    </div>
                </>
            )}

            {/* Estatísticas Rápidas */}
            {characters.length > 0 && (
                <div className="mt-12 pt-8 border-t border-blue-400/20">
                    <h3 className="text-xl font-cinzel text-white mb-4 text-center">
                        📊 Suas Estatísticas
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                            <div className="text-2xl font-cinzel text-yellow-400">{characters.length}</div>
                            <div className="text-blue-200 text-sm">Personagens</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                            <div className="text-2xl font-cinzel text-yellow-400">
                                {Math.max(...characters.map(c => c.level || 1))}
                            </div>
                            <div className="text-blue-200 text-sm">Maior Nível</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-white/5 border-t border-blue-400/20 mt-12 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-blue-300">
                        🏰 Scribe's Quill ∙ Que seus dados sejam sempre altos! ∙
                    </p>
                    <span className="text-yellow-400 ml-2">Aventureiro</span>
                </div>
            </footer>
        </Layout>
    );
};