/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Eye, EyeOff, Scroll, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { authService } from '../services/authService';
import { type RegisterData } from '../types';

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    general?: string;
}

export const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const validateField = (name: string, value: string | boolean): string => {
        switch (name) {
            case 'name':
                if (!value) return 'Nome é obrigatório';
                if (typeof value === 'string' && value.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
                if (typeof value === 'string' && value.length > 50) return 'Nome deve ter no máximo 50 caracteres';
                return '';

            case 'email':
                if (!value) return 'Email é obrigatório';
                if (typeof value === 'string' && !/^\S+@\S+\.\S+$/.test(value)) return 'Email inválido';
                return '';

            case 'password':
                if (!value) return 'Senha é obrigatória';
                if (typeof value === 'string' && value.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
                return '';

            case 'confirmPassword':
                if (!value) return 'Confirmação de senha é obrigatória';
                if (value !== formData.password) return 'Senhas não coincidem';
                return '';

            case 'terms':
                if (!value) return 'Você deve aceitar os termos de serviço';
                return '';

            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: fieldValue
        }));

        if (errors.general) {
            setErrors(prev => ({ ...prev, general: undefined }));
        }

        if (errors[name as keyof FormErrors]) {
            const error = validateField(name, fieldValue);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key as keyof typeof formData]);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors(prev => ({ ...prev, general: undefined }));

        try {
            const { confirmPassword, terms, ...registerData } = formData;

            const response = await authService.register(registerData as RegisterData);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            navigate('/email-confirmation');

        } catch (error: unknown) {
            console.error('Erro no registro:', error);

            let errorMessage = 'Erro ao criar conta. Tente novamente.';

            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'object' && error !== null && 'message' in error) {
                errorMessage = String(error.message);
            }

            setErrors(prev => ({
                ...prev,
                general: errorMessage
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const getInputClass = (fieldName: keyof FormErrors) => {
        const baseClass = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none bg-white/10 backdrop-blur-sm text-white placeholder-blue-200";
        const hasError = errors[fieldName];

        if (hasError) {
            return `${baseClass} border-red-500 focus:ring-red-500 focus:border-red-500`;
        }

        return `${baseClass} border-blue-400/30 focus:ring-blue-500 focus:border-transparent`;
    };

    const isFieldValid = (fieldName: keyof FormErrors) => {
        return formData[fieldName as keyof typeof formData] && !errors[fieldName];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md border-2 border-blue-400/30 rounded-xl shadow-2xl p-6 border-opacity-20 w-full space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <Logo size="xl" className="justify-center mb-4" showText />
                    <h2 className="text-3xl font-cinzel text-white">Crie sua conta</h2>
                    <p className="text-blue-200 mt-2">
                        Ou{' '}
                        <Link to="/login" className="font-medium text-blue-300 hover:text-blue-100">
                            entre na sua conta existente
                        </Link>
                    </p>
                </div>

                {/* Erro geral */}
                {errors.general && (
                    <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <AlertCircle size={20} />
                            <span>{errors.general}</span>
                        </div>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-cinzel text-white mb-2">
                            Nome completo *
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getInputClass('name')}
                                placeholder="Seu nome completo"
                            />
                            {isFieldValid('name') && (
                                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                            )}
                        </div>
                        {errors.name && (
                            <p className="text-red-300 text-sm mt-1 flex items-center space-x-1">
                                <AlertCircle size={14} />
                                <span>{errors.name}</span>
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-cinzel text-white mb-2">
                            Email *
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getInputClass('email')}
                                placeholder="seu@email.com"
                            />
                            {isFieldValid('email') && (
                                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                            )}
                        </div>
                        {errors.email && (
                            <p className="text-red-300 text-sm mt-1 flex items-center space-x-1">
                                <AlertCircle size={14} />
                                <span>{errors.email}</span>
                            </p>
                        )}
                    </div>

                    {/* Senha */}
                    <div>
                        <label className="block text-sm font-cinzel text-white mb-2">
                            Senha *
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getInputClass('password')}
                                placeholder="Mínimo 6 caracteres"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {isFieldValid('password') && (
                                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                            )}
                        </div>
                        {errors.password && (
                            <p className="text-red-300 text-sm mt-1 flex items-center space-x-1">
                                <AlertCircle size={14} />
                                <span>{errors.password}</span>
                            </p>
                        )}
                    </div>

                    {/* Confirmar Senha */}
                    <div>
                        <label className="block text-sm font-cinzel text-white mb-2">
                            Confirmar senha *
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={getInputClass('confirmPassword')}
                                placeholder="Digite a senha novamente"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {isFieldValid('confirmPassword') && (
                                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                            )}
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-300 text-sm mt-1 flex items-center space-x-1">
                                <AlertCircle size={14} />
                                <span>{errors.confirmPassword}</span>
                            </p>
                        )}
                    </div>

                    {/* Termos e Condições */}
                    <div className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-4 h-4 text-blue-500 border-blue-400/50 rounded focus:ring-blue-500 mt-1"
                        />
                        <label htmlFor="terms" className="text-sm text-blue-200">
                            Concordo com os{' '}
                            <a href="#" className="text-blue-300 hover:text-blue-100 underline">
                                Termos de Serviço
                            </a>{' '}
                            e{' '}
                            <a href="#" className="text-blue-300 hover:text-blue-100 underline">
                                Política de Privacidade
                            </a>
                            *
                        </label>
                    </div>
                    {errors.terms && (
                        <p className="text-red-300 text-sm flex items-center space-x-1">
                            <AlertCircle size={14} />
                            <span>{errors.terms}</span>
                        </p>
                    )}

                    {/* Botão de Registro */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-cinzel px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Cadastrando...</span>
                            </>
                        ) : (
                            <>
                                <Scroll size={20} />
                                <span>Começar Aventura</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Decoração temática */}
                <div className="text-center pt-6 border-t border-blue-400/20">
                    <div className="inline-flex items-center space-x-2 text-blue-200">
                        <Shield size={28} />
                        <span className="text-xl italic">Suas informações estão protegidas</span>
                        <Shield size={28} />
                    </div>
                </div>
            </div>
        </div>
    );
};