import React from 'react';
import { type Character } from '../../types';
import {
    Edit3,
    Eye,
    Trash2,
    Heart,
    Shield,
    Sword,
    Sparkles,
    BarChart3
} from 'lucide-react';
import { calculateModifier, calculateProficiencyBonus } from '../../utils/dndCalculations';

interface CharacterCardProps {
    character: Character;
    onEdit: () => void;
    onView: () => void;
    onDelete: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
    character,
    onEdit,
    onView,
    onDelete
}) => {
    const proficiencyBonus = calculateProficiencyBonus(character.level);
    const conModifier = calculateModifier(character.stats.constitution.value);
    const maxHP = character.hp.max;
    const currentHP = character.hp.current;
    const hpPercentage = (currentHP / maxHP) * 100;

    const getHPColor = () => {
        if (hpPercentage > 75) return 'bg-green-500';
        if (hpPercentage > 50) return 'bg-green-400';
        if (hpPercentage > 25) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    // Cor baseada na classe
    const getClassColor = () => {
        const classColors: Record<string, string> = {
            'guerreiro': 'bg-red-100 border-red-300',
            'mago': 'bg-blue-100 border-blue-300',
            'clerigo': 'bg-white border-gray-300',
            'ladino': 'bg-yellow-100 border-yellow-300',
            'ranger': 'bg-green-100 border-green-300',
            'barbaro': 'bg-orange-100 border-orange-300',
            'bardo': 'bg-purple-100 border-purple-300',
            'monge': 'bg-stone-100 border-stone-300',
            'paladino': 'bg-pink-100 border-pink-300',
            'druida': 'bg-emerald-100 border-emerald-300'
        };

        return classColors[character.class.name.toLowerCase()] || 'bg-gray-100 border-gray-300';
    };

    // Ícone baseado na classe
    const getClassIcon = () => {
        const classIcons: Record<string, React.ReactNode> = {
            'guerreiro': <Sword className="w-4 h-4" />,
            'mago': <Sparkles className="w-4 h-4" />,
            'clerigo': <Shield className="w-4 h-4" />,
            'ladino': <Eye className="w-4 h-4" />,
            'ranger': <Eye className="w-4 h-4" />,
            'barbaro': <Sword className="w-4 h-4" />,
            'bardo': <Sparkles className="w-4 h-4" />,
            'monge': <BarChart3 className="w-4 h-4" />,
            'paladino': <Shield className="w-4 h-4" />,
            'druida': <Sparkles className="w-4 h-4" />
        };

        return classIcons[character.class.name.toLowerCase()] || <BarChart3 className="w-4 h-4" />;
    };

    return (
        <div className={`rounded-xl border-2 p-4 transition-all hover:shadow-lg hover:scale-105 ${getClassColor()}`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-cinzel font-bold text-gray-900 mb-1">
                        {character.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                            {getClassIcon()}
                            <span>Nv. {character.level} {character.class.name}</span>
                        </span>
                        <span>•</span>
                        <span>{character.specie.name}</span>
                    </div>
                </div>

                <span className="bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700 border">
                    ID: {character._id.slice(-4)}
                </span>
            </div>

            {/* Status Básico */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-gray-900">
                        {proficiencyBonus >= 0 ? '+' : ''}{proficiencyBonus}
                    </div>
                    <div className="text-xs text-gray-500">Proficiência</div>
                </div>

                <div className="text-center p-2 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-gray-900">
                        {conModifier >= 0 ? '+' : ''}{conModifier}
                    </div>
                    <div className="text-xs text-gray-500">Constituição</div>
                </div>
            </div>

            {/* Barra de HP */}
            <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-700 mb-1">
                    <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>PV</span>
                    </span>
                    <span>{currentHP}/{maxHP}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`${getHPColor()} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${hpPercentage}%` }}
                    />
                </div>

                {character.hp.temporary > 0 && (
                    <div className="text-xs text-blue-600 mt-1">
                        +{character.hp.temporary} PV temporários
                    </div>
                )}
            </div>

            {/* Atributos Rápidos */}
            <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                <div className="text-center">
                    <div className="font-bold">FOR</div>
                    <div>{character.stats.strength.value}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">DES</div>
                    <div>{character.stats.dexterity.value}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">CON</div>
                    <div>{character.stats.constitution.value}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">INT</div>
                    <div>{character.stats.intelligence.value}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">SAB</div>
                    <div>{character.stats.wisdom.value}</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">CAR</div>
                    <div>{character.stats.charisma.value}</div>
                </div>
            </div>

            {/* Informações Adicionais */}
            <div className="text-xs text-gray-600 space-y-1 mb-4">
                <div>🏛️ {character.background.name || 'Sem antecedente'}</div>
                <div>⚖️ {character.alignment}</div>
                <div>⭐ {character.experience} XP</div>
                <div>📅 Criado em {new Date(character.createdAt).toLocaleDateString('pt-BR')}</div>
            </div>

            {/* Botões de Ação */}
            <div className="flex space-x-2">
                <button
                    onClick={onView}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1 transition-colors"
                >
                    <Eye className="w-4 h-4" />
                    <span>Ver</span>
                </button>

                <button
                    onClick={onEdit}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1 transition-colors"
                >
                    <Edit3 className="w-4 h-4" />
                    <span>Editar</span>
                </button>

                <button
                    onClick={onDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-1 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Excluir</span>
                </button>
            </div>
        </div>
    );
};