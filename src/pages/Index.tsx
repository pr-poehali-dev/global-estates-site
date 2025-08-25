import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    budget: '',
    market: '',
    priority: '',
    propertyType: ''
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const heroImages = [
    '/img/ec47ca2c-61fa-4062-b2e3-4bce24c13dcf.jpg',
    '/img/bd82b201-24fa-420e-acd7-844f14ebef27.jpg',
    '/img/01c11a36-b573-4728-9a62-b2b4c2ee73a3.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const quizQuestions = [
    {
      title: 'Какой бюджет вы рассматриваете для инвестиции?',
      field: 'budget',
      options: [
        'До $250k',
        '$250k - $500k', 
        '$500k - $1M',
        'Более $1M'
      ]
    },
    {
      title: 'Какой рынок вас интересует больше?',
      field: 'market',
      options: [
        'Динамичный Дубай (ОАЭ)',
        'Перспективный Оман',
        'Рассматриваю оба варианта',
        'Пока не знаю'
      ]
    },
    {
      title: 'Что для вас приоритетно?',
      field: 'priority',
      options: [
        'Максимальная доходность',
        'Рост стоимости актива',
        'Получение ВНЖ',
        'Сохранение капитала'
      ]
    },
    {
      title: 'Какой вид недвижимости предпочитаете?',
      field: 'propertyType',
      options: [
        'Вилла',
        'Апартаменты', 
        'Танхаусы'
      ]
    }
  ];

  const handleQuizAnswer = (value: string) => {
    const currentField = quizQuestions[quizStep].field as keyof typeof quizAnswers;
    setQuizAnswers(prev => ({ ...prev, [currentField]: value }));
  };

  const nextQuizStep = () => {
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      setQuizStep(quizQuestions.length); // Move to contact form
    }
  };

  const submitQuiz = () => {
    console.log('Quiz answers:', quizAnswers);
    console.log('Contact form:', contactForm);
    setShowQuiz(false);
    setQuizStep(0);
    // Here you would typically send data to your backend
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Luxury property ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Премиум-апартаменты в{' '}
            <span className="text-gold">ОАЭ и Омане</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-light">
            Ваш пассивный доход от{' '}
            <span className="text-gold font-semibold">12% до 50%</span>{' '}
            годовых
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Персональный подбор ликвидных объектов инвестиции с полным сопровождением и юридической гарантией
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-4 text-lg"
            >
              Получить Топ 10 ликвидных апартаментов в ОАЭ
            </Button>
            
            <Card className="bg-white border-gold/30 p-6 max-w-md">
              <CardContent className="p-0">
                <p className="text-gold font-semibold mb-2">
                  Персональная подборка объектов
                </p>
                <p className="text-sm mb-4 font-bold text-black">
                  Ответьте на 4 вопроса и получите персональную подборку объектов
                </p>
                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black"
                >
                  Начать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-gold' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quiz Dialog */}
      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {quizStep < quizQuestions.length ? (
                <>Вопрос {quizStep + 1} из {quizQuestions.length}</>
              ) : (
                'Идеальное решение уже подобрано!'
              )}
            </DialogTitle>
          </DialogHeader>
          
          {quizStep < quizQuestions.length ? (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-center">
                {quizQuestions[quizStep].title}
              </h3>
              
              <RadioGroup 
                value={quizAnswers[quizQuestions[quizStep].field as keyof typeof quizAnswers]}
                onValueChange={handleQuizAnswer}
              >
                {quizQuestions[quizStep].options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <Button 
                onClick={nextQuizStep}
                disabled={!quizAnswers[quizQuestions[quizStep].field as keyof typeof quizAnswers]}
                className="w-full bg-gold hover:bg-gold-dark text-black"
              >
                {quizStep === quizQuestions.length - 1 ? 'Завершить' : 'Далее'}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-center text-muted-foreground">
                Оставьте контакты, чтобы наш эксперт отправил вам персональную подборку объектов и расчет доходности.
              </p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input 
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Введите ваше имя"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input 
                    id="phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="example@email.com"
                  />
                </div>
              </div>
              
              <Button 
                onClick={submitQuiz}
                disabled={!contactForm.phone}
                className="w-full bg-gold hover:bg-gold-dark text-black"
              >
                Получить подборку
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* USP Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Ключевые <span className="text-gold">преимущества</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-gold/20">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="TrendingUp" className="text-gold" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Доходность</h3>
                <p className="text-muted-foreground">
                  Проработанная модель аренды с доходностью от 12% годовых
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-gold/20">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" className="text-gold" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Экспертиза</h3>
                <p className="text-muted-foreground">
                  Команда на местах в Дубае и Маскате. Доступ к эксклюзивным лотам
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-gold/20">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Headphones" className="text-gold" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Сервис</h3>
                <p className="text-muted-foreground">
                  Полное сопровождение «под ключ»: от подбора до управления
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-gold/20">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" className="text-gold" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
                <p className="text-muted-foreground">
                  Юридический аудит каждого объекта и сопровождение сделки
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Cases */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Инвестиционные <span className="text-gold">кейсы</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="/img/ec47ca2c-61fa-4062-b2e3-4bce24c13dcf.jpg" 
                alt="Dubai Marina apartment"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Апартаменты в Дубай Марине</h3>
                <p className="text-2xl font-bold text-gold mb-2">$580k</p>
                <p className="text-muted-foreground mb-4">
                  Расчетная годовая доходность: <span className="text-green-600 font-semibold">13.5%</span>
                </p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>2 спальни</span>
                  <span>120 м²</span>
                  <span>Сдан</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="/img/bd82b201-24fa-420e-acd7-844f14ebef27.jpg" 
                alt="Oman villa"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Вилла в Маскате</h3>
                <p className="text-2xl font-bold text-gold mb-2">$420k</p>
                <p className="text-muted-foreground mb-4">
                  Расчетная годовая доходность: <span className="text-green-600 font-semibold">15.2%</span>
                </p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>3 спальни</span>
                  <span>200 м²</span>
                  <span>Строится</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src="/img/01c11a36-b573-4728-9a62-b2b4c2ee73a3.jpg" 
                alt="Penthouse"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Пентхаус в Дубае</h3>
                <p className="text-2xl font-bold text-gold mb-2">$1.2M</p>
                <p className="text-muted-foreground mb-4">
                  Расчетная годовая доходность: <span className="text-green-600 font-semibold">12.8%</span>
                </p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>4 спальни</span>
                  <span>300 м²</span>
                  <span>Сдан</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" className="border-gold text-gold hover:bg-gold hover:text-black">
              Посмотреть другие кейсы
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            О <span className="text-gold">Global Estates</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Global Estates — это более <span className="text-gold font-semibold">150 довольных инвесторов</span> и{' '}
            <span className="text-gold font-semibold">$100M+ проданной недвижимости</span>. 
            Мы ваш надежный партнер в регионе.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-muted-foreground">EMAAR</div>
            <div className="text-2xl font-bold text-muted-foreground">DAMAC</div>
            <div className="text-2xl font-bold text-muted-foreground">OMRAN</div>
            <div className="text-2xl font-bold text-muted-foreground">MERAAS</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-8">
            Готовы сделать первый шаг к{' '}
            <span className="text-gold">пассивному доходу?</span>
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Заполните форму ниже, и наш эксперт свяжется с вами в течение 15 минут
          </p>
          
          <Card className="max-w-md mx-auto bg-white/10 backdrop-blur-sm border-gold/30">
            <CardContent className="p-8">
              <div className="space-y-4 mb-6">
                <Input 
                  placeholder="Ваше имя" 
                  className="bg-white/20 border-gold/30 text-white placeholder:text-white/70"
                />
                <Input 
                  placeholder="Ваш телефон" 
                  className="bg-white/20 border-gold/30 text-white placeholder:text-white/70"
                />
              </div>
              <Button className="w-full bg-gold hover:bg-gold-dark text-black font-semibold">
                Обсудить инвестицию
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gold mb-4">Global Estates</h3>
              <p className="text-gray-400">
                Ваш надежный партнер в инвестициях в недвижимость ОАЭ и Омана
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +971 50 123 4567
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@globalestates.ae
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <Icon name="Instagram" className="text-gold cursor-pointer hover:text-gold-light" size={24} />
                <Icon name="Linkedin" className="text-gold cursor-pointer hover:text-gold-light" size={24} />
                <Icon name="MessageCircle" className="text-gold cursor-pointer hover:text-gold-light" size={24} />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Global Estates. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;