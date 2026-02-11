import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, ChevronRight, ChevronLeft, Play, Phone, 
  Shield, BarChart3, Package, Scissors, Ruler, 
  ShoppingCart, Users, Check, XIcon, ArrowRight,
  TrendingUp, Layers, Lock, Factory, CreditCard, Sparkles, Zap, Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// WhatsApp Icon Component
const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Logo Component
const OxenLogo = ({ size = 'md', animated = true }: { size?: 'sm' | 'md' | 'lg', animated?: boolean }) => {
  const sizes = {
    sm: { dots: [3, 4, 5, 7, 4, 5], text: 'text-sm', gap: 'gap-1' },
    md: { dots: [4, 5, 6, 8, 5, 6], text: 'text-xl', gap: 'gap-1.5' },
    lg: { dots: [5, 6, 8, 10, 6, 8], text: 'text-3xl', gap: 'gap-2' }
  };
  const s = sizes[size];
  const colors = ['#1e6cff', '#39b7ff', '#5ee7ff', '#4fffc1', '#3dff78', '#22e56f'];

  return (
    <div className="flex flex-col items-center">
      <div className={`flex ${s.gap}`}>
        {s.dots.map((d, i) => (
          <motion.span
            key={i}
            className="rounded-full"
            style={{ width: d, height: d, backgroundColor: colors[i] }}
            animate={animated ? { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] } : {}}
            transition={animated ? { duration: 1.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" } : {}}
          />
        ))}
      </div>
      <span className={`${s.text} font-bold tracking-[0.2em] gradient-text mt-1 font-['Montserrat']`}>OXEN</span>
    </div>
  );
};

// Navigation Component
const Navigation = ({ isContactOpen, setIsContactOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#modulos', label: 'Módulos' },
    { href: '#flujo', label: 'Flujo' },
    { href: '#seguridad', label: 'Permisos' },
    { href: '#reportes', label: 'Reportes' },
    { href: '#cotizacion', label: 'Precios' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible ${isScrolled ? 'glass shadow-lg' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Iconos flotantes en el header */}
        <div className="absolute inset-0 overflow-visible pointer-events-none">
          <motion.div
            animate={{
              x: [0, 30, -40, 20, -30, 0],
              y: [0, -20, 15, -30, 25, 0],
              opacity: [0, 1, 1, 0.5, 1, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-8 top-2 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #3498db25 0%, #3498db05 100%)',
              border: '1.5px solid #3498db60',
              boxShadow: '0 0 15px #3498db30'
            }}
          >
            <Layers className="w-5 h-5 text-[#3498db]" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            animate={{
              x: [0, -35, 25, -15, 40, 0],
              y: [0, 20, -25, 30, -20, 0],
              opacity: [1, 0.5, 1, 0, 1, 0.3]
            }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-8 top-4 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #27ae6025 0%, #27ae6005 100%)',
              border: '1.5px solid #27ae6060',
              boxShadow: '0 0 15px #27ae6030'
            }}
          >
            <Shield className="w-5 h-5 text-[#27ae60]" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            animate={{
              x: [0, -25, 35, -20, 15, 0],
              y: [0, 25, -15, 20, -35, 0],
              opacity: [0.5, 1, 0, 1, 0.5, 0]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute left-1/3 -top-3 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #9b59b625 0%, #9b59b605 100%)',
              border: '1.5px solid #9b59b660',
              boxShadow: '0 0 15px #9b59b630'
            }}
          >
            <Sparkles className="w-5 h-5 text-[#9b59b6]" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            animate={{
              x: [0, 40, -30, 25, -35, 0],
              y: [0, -30, 20, -25, 15, 0],
              opacity: [1, 0, 1, 0.6, 0, 1]
            }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute right-1/3 -top-2 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #f39c1225 0%, #f39c1205 100%)',
              border: '1.5px solid #f39c1260',
              boxShadow: '0 0 15px #f39c1230'
            }}
          >
            <TrendingUp className="w-5 h-5 text-[#f39c12]" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            animate={{
              x: [0, 35, -20, 30, -40, 0],
              y: [0, 30, -20, -30, 25, 0],
              opacity: [0, 1, 0.5, 1, 0, 0.8]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute left-1/4 top-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #e74c3c25 0%, #e74c3c05 100%)',
              border: '1.5px solid #e74c3c60',
              boxShadow: '0 0 15px #e74c3c30'
            }}
          >
            <Lock className="w-5 h-5 text-[#e74c3c]" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            animate={{
              x: [0, -40, 25, -35, 20, 0],
              y: [0, -25, 30, 20, -30, 0],
              opacity: [0.5, 0, 1, 0.3, 1, 0]
            }}
            transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute right-1/4 top-1 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #1abc9c25 0%, #1abc9c05 100%)',
              border: '1.5px solid #1abc9c60',
              boxShadow: '0 0 15px #1abc9c30'
            }}
          >
            <BarChart3 className="w-5 h-5 text-[#1abc9c]" strokeWidth={1.5} />
          </motion.div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="#" className="flex items-center gap-4">
              <OxenLogo size="md" animated={false} />
              <span className="text-base lg:text-lg font-bold hidden sm:block text-[#3498db]">Operación textil conectada</span>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-[#3498db] transition-colors relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3498db] transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Button size="sm" className="gap-2 bg-[#27ae60] hover:bg-[#229954] text-white cursor-pointer" onClick={() => setIsContactOpen(true)}>
                <WhatsAppIcon className="w-4 h-4" />WhatsApp
              </Button>
            </div>

            <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden glass border-t">
              <nav className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="py-2 px-4 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{link.label}</a>
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                  <Button className="w-full gap-2 bg-[#27ae60] text-white cursor-pointer" onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}>
                    <WhatsAppIcon className="w-4 h-4" />Solicitar cotización por WhatsApp
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl gradient-text">Solicitar cotización</DialogTitle></DialogHeader>
          <ContactForm onClose={() => setIsContactOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

const ContactForm = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    users: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, users: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Crear mensaje de WhatsApp con los datos del formulario
    const whatsappMessage = `Hola, soy ${formData.name} de ${formData.company}.

Me interesa conocer más sobre OXEN para nuestra operación textil.

*Mis datos:*
- Número de usuarios estimado: ${formData.users}

*Comentarios:* ${formData.message || 'No hay comentarios adicionales'}

¿Podrías ayudarme con una cotización personalizada?`;

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/573246802926?text=${encodedMessage}`;

    // Abrir WhatsApp inmediatamente
    window.open(whatsappUrl, '_blank');
    
    // Mostrar mensaje de éxito
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Cerrar el dialog después de mostrar el mensaje
    setTimeout(onClose, 1500);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">¡Abriendo WhatsApp!</h3>
        <p className="text-slate-600">Tu conversación está lista para enviar.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2"><Label htmlFor="name">Nombre completo</Label><Input id="name" placeholder="Tu nombre" value={formData.name} onChange={handleChange} required /></div>
      <div className="space-y-2"><Label htmlFor="company">Empresa</Label><Input id="company" placeholder="Nombre de la empresa" value={formData.company} onChange={handleChange} required /></div>
      <div className="space-y-2">
        <Label>Número de usuarios estimado</Label>
        <Select value={formData.users} onValueChange={handleSelectChange} required>
          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="1-5">1 a 5</SelectItem>
            <SelectItem value="6-10">6 a 10</SelectItem>
            <SelectItem value="11-15">11 a 15</SelectItem>
            <SelectItem value="16+">16 o más</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2"><Label htmlFor="message">Comentarios</Label><Textarea id="message" rows={3} placeholder="Cuéntanos qué necesitas implementar" value={formData.message} onChange={handleChange} /></div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1 cursor-pointer" onClick={onClose}>Cancelar</Button>
        <Button type="submit" className="flex-1 bg-[#27ae60] hover:bg-[#229954] cursor-pointer" disabled={isSubmitting}>{isSubmitting ? 'Preparando...' : 'Enviar por WhatsApp'}</Button>
      </div>
    </form>
  );
};

const HeroSection = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <>
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(52, 152, 219, 0.15) 0%, transparent 70%)', y: y1 }} />
          <motion.div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(39, 174, 96, 0.12) 0%, transparent 70%)', y: y2 }} />
          <div className="absolute inset-0 dot-pattern opacity-50" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center lg:text-left">
              <motion.div variants={fadeInUp}>
                <Badge variant="secondary" className="mb-4 bg-[#3498db]/10 text-[#3498db]"><Sparkles className="w-3 h-3 mr-1" />Sistema integral para la industria textil</Badge>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
                Todo tu negocio en un solo <span className="gradient-text">panel de control</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                OXEN centraliza inventarios, diseño, cortes, producción, trazabilidad y ventas en una experiencia clara y operativa.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Button size="lg" className="gap-2 bg-[#3498db] hover:bg-[#2980b9] cursor-pointer" onClick={() => setIsDemoOpen(true)}><Play className="w-5 h-5" />Ver vista previa guiada</Button>
                <a href="#cotizacion"><Button size="lg" variant="outline" className="gap-2 cursor-pointer">Ver planes y precios<ArrowRight className="w-5 h-5" /></Button></a>
              </motion.div>
              <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-4">
                <motion.div variants={fadeInUp} className="glass rounded-xl p-4 text-left card-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#3498db]/10 flex items-center justify-center"><Lock className="w-5 h-5 text-[#3498db]" /></div>
                    <span className="font-semibold text-slate-800">Permisos detallados</span>
                  </div>
                  <p className="text-sm text-slate-600">Controla quién ve y edita cada módulo.</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="glass rounded-xl p-4 text-left card-hover">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#27ae60]/10 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-[#27ae60]" /></div>
                    <span className="font-semibold text-slate-800">Trazabilidad viva</span>
                  </div>
                  <p className="text-sm text-slate-600">Órdenes, cortes y avances siempre visibles.</p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
              <div className="relative animate-float">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#3498db]/20 to-[#27ae60]/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
                  <div className="bg-slate-50 px-4 py-3 flex items-center gap-2 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="bg-gradient-to-r from-[#27ae60]/10 to-[#27ae60]/5 rounded-xl p-4 flex items-center justify-between">
                      <span className="font-semibold text-slate-700">Producción activa</span>
                      <span className="text-2xl font-bold text-[#27ae60]">68%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: 'Inventario Tela', desc: 'Entradas y salidas', icon: Package, color: '#3498db' },
                        { title: 'Órdenes de Corte', desc: 'Prioridad y avance', icon: Scissors, color: '#e74c3c' },
                        { title: 'Producción', desc: 'Control de piso', icon: Factory, color: '#f39c12' },
                        { title: 'POS', desc: 'Ventas y facturación', icon: ShoppingCart, color: '#9b59b6' },
                      ].map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="bg-slate-50 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                          <item.icon className="w-5 h-5 mb-2" style={{ color: item.color }} />
                          <div className="font-semibold text-sm text-slate-800">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.desc}</div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm"><span className="text-slate-600">Ruta operacional</span><span className="font-semibold text-slate-800">70%</span></div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-[#3498db] to-[#27ae60]" initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 1.5, delay: 0.8 }} />
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"><Check className="w-4 h-4 text-green-600" /></div>
                    <div><div className="text-xs text-slate-500">Órdenes hoy</div><div className="font-bold text-slate-800">+24</div></div>
                  </div>
                </motion.div>
                <motion.div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border" animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-blue-600" /></div>
                    <div><div className="text-xs text-slate-500">Eficiencia</div><div className="font-bold text-slate-800">94.2%</div></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl gradient-text">Conoce OXEN en 9 pasos</DialogTitle></DialogHeader>
          <DemoCarousel />
        </DialogContent>
      </Dialog>
    </>
  );
};

const DemoCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { title: 'Dashboard', description: 'Panel de control centralizado', image: '/src/assets/images/1.png' },
    { title: 'Tablero Kanban', description: 'Gestión visual de tareas y órdenes', image: '/src/assets/images/2.1.png' },
    { title: 'Inventarios', description: 'Gestión de materiales en tiempo real', image: '/src/assets/images/2.png' },
    { title: 'Diseño', description: 'Fichas técnicas y patrones', image: '/src/assets/images/3.png' },
    { title: 'Corte', description: 'Órdenes y planificación', image: '/src/assets/images/4.png' },
    { title: 'Producción', description: 'Control de piso y avances', image: '/src/assets/images/5.png' },
    { title: 'POS', description: 'Ventas integradas', image: '/src/assets/images/6.png' },
    { title: 'Reportes', description: 'Análisis y métricas', image: '/src/assets/images/7.png' },
    { title: 'Permisos', description: 'Control de acceso', image: '/src/assets/images/8.png' },
    { title: 'Configuración', description: 'Personalización completa', image: '/src/assets/images/9.png' },
  ];

  return (
    <div className="mt-4">
      <div className="bg-slate-50 rounded-xl p-6 mb-4">
        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
          {steps[currentStep].image ? (
            <motion.img 
              key={currentStep} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              src={steps[currentStep].image} 
              alt={steps[currentStep].title}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <motion.div key={currentStep} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center z-10">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur">
                  <span className="text-4xl font-bold text-white">{currentStep + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{steps[currentStep].title}</h3>
                <p className="text-slate-300">{steps[currentStep].description}</p>
              </motion.div>
            </>
          )}
        </div>
        <div className="mt-3 text-center">
          <h4 className="text-lg font-bold text-slate-800">{steps[currentStep].title}</h4>
          <p className="text-sm text-slate-600">{steps[currentStep].description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        {steps.map((_, i) => (
          <button key={i} onClick={() => setCurrentStep(i)} className={`flex-1 h-2 rounded-full transition-all ${i <= currentStep ? 'bg-[#3498db]' : 'bg-slate-200'}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="cursor-pointer"><ChevronLeft className="w-4 h-4 mr-2" />Anterior</Button>
        <span className="text-sm text-slate-500">Paso {currentStep + 1} de {steps.length}</span>
        <Button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1} className="bg-[#3498db] hover:bg-[#2980b9] cursor-pointer">Siguiente<ChevronRight className="w-4 h-4 ml-2" /></Button>
      </div>
    </div>
  );
};

const VideoSection = () => {
  const floatingIcons = [
    { icon: Layers, delay: 0 },
    { icon: Shield, delay: 0.2 },
    { icon: BarChart3, delay: 0.4 },
    { icon: TrendingUp, delay: 0.6 },
    { icon: Lock, delay: 0.8 },
    { icon: Sparkles, delay: 1 },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3498db]/5 to-transparent" />
      
      {/* Luces suaves de fondo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3498db]/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#27ae60]/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#9b59b6]/15 rounded-full blur-3xl opacity-30" />
      
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Conoce <span className="gradient-text">OXEN</span></h2>
          <p className="text-lg text-slate-600">Sistema integral para la industria textil</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
          {/* Iconos flotantes a los lados */}
          {floatingIcons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.8, scale: 1 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -30, 0],
              }}
              transition={{
                duration: 6 + i * 0.3,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-md z-20"
              style={{
                left: i < 3 ? '-50px' : 'auto',
                right: i >= 3 ? '-50px' : 'auto',
                top: `${20 + (i % 3) * 35}%`,
                background: `linear-gradient(135deg, ${['#3498db', '#27ae60', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c'][i]}25 0%, ${['#3498db', '#27ae60', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c'][i]}05 100%)`,
                border: `2px solid ${['#3498db', '#27ae60', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c'][i]}60`,
                boxShadow: `0 0 20px ${['#3498db', '#27ae60', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c'][i]}30`
              }}
            >
              <item.icon className="w-7 h-7" style={{ color: ['#3498db', '#27ae60', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c'][i] }} strokeWidth={1.5} />
            </motion.div>
          ))}
          
          <div className="absolute -inset-4 bg-gradient-to-r from-[#3498db]/20 to-[#27ae60]/20 rounded-3xl blur-2xl opacity-60" />
          <div className="relative bg-white rounded-2xl shadow-2xl p-4 border border-slate-100">
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-900">
              <video autoPlay muted controls className="w-full h-full object-cover" poster="">
                <source src="/src/assets/video/Vídeo sin título.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ModulesSection = () => {
  const modules = [
    { icon: Package, title: 'Inventarios conectados', description: 'Tela, insumos y producto terminado en un solo flujo, con alertas claras.', color: '#3498db', features: ['Kardex en tiempo real', 'Alertas de stock', 'Reservas por orden'] },
    { icon: Ruler, title: 'Diseño y ficha técnica', description: 'Patrones, tablas de medidas y ficha técnica listos para producción.', color: '#9b59b6', features: ['Fichas técnicas', 'Tablas de medida', 'Especificaciones'] },
    { icon: Scissors, title: 'Órdenes de corte', description: 'Planifica, ejecuta y controla cada corte con trazabilidad completa.', color: '#e74c3c', features: ['Planificación', 'Hojas de corte', 'Trazabilidad'] },
    { icon: Factory, title: 'Piso de producción', description: 'Seguimiento de órdenes, control de avances y rutas operacionales.', color: '#f39c12', features: ['Kanban visual', 'Control por etapas', 'Tiempos reales'] },
    { icon: BarChart3, title: 'Reportes inteligentes', description: 'Producción, inventarios y ventas con indicadores accionables.', color: '#27ae60', features: ['Dashboards', 'Exportación', 'Automatización'] },
    { icon: ShoppingCart, title: 'Punto de venta', description: 'Ventas y facturación integradas al stock de producto terminado.', color: '#1abc9c', features: ['Facturación', 'Múltiples cajas', 'Reportes diarios'] },
  ];

  return (
    <section id="modulos" className="py-20 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-[#3498db]/10 text-[#3498db]">Funcionalidades</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Módulos clave para tu <span className="gradient-text">operación</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Todo lo que el área de producción necesita para operar en tiempo real.</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group relative bg-white rounded-2xl p-6 shadow-lg border border-slate-100 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${module.color}08 0%, ${module.color}04 100%)` }} />
              <div className="absolute top-0 left-0 right-0 h-1 opacity-60" style={{ background: `linear-gradient(90deg, ${module.color}, transparent)` }} />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${module.color}15` }}>
                  <module.icon className="w-7 h-7" style={{ color: module.color }} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{module.title}</h3>
                <p className="text-slate-600 mb-4">{module.description}</p>
                <ul className="space-y-2">
                  {module.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-500"><Check className="w-4 h-4" style={{ color: module.color }} />{feature}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const KanbanSection = () => {
  const [tasks, setTasks] = useState({
    pending: [
      { id: 1, title: 'Revisión de especificaciones', priority: 'high' },
      { id: 2, title: 'Estimación de costos', priority: 'medium' },
      { id: 3, title: 'Aprobación de cliente', priority: 'high' }
    ],
    inProgress: [
      { id: 4, title: 'Creación de patrones', priority: 'high' },
      { id: 5, title: 'Preparación de materiales', priority: 'medium' }
    ],
    review: [
      { id: 6, title: 'QC primera línea', priority: 'medium' },
      { id: 7, title: 'Empaque y etiquetado', priority: 'low' }
    ],
    completed: [
      { id: 8, title: 'Producción completada', priority: 'high' },
      { id: 9, title: 'Envío a bodega', priority: 'medium' }
    ]
  });

  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (e, task, source) => {
    setDraggedTask({ task, source });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    if (!draggedTask) return;

    const { task, source } = draggedTask;
    if (source !== target) {
      setTasks(prev => ({
        ...prev,
        [source]: prev[source].filter(t => t.id !== task.id),
        [target]: [...prev[target], task]
      }));
    }
    setDraggedTask(null);
  };

  const columns = [
    { id: 'pending', title: 'Por hacer', color: '#e74c3c', bgColor: '#e74c3c' },
    { id: 'inProgress', title: 'En progreso', color: '#f39c12', bgColor: '#f39c12' },
    { id: 'review', title: 'Revisión', color: '#3498db', bgColor: '#3498db' },
    { id: 'completed', title: 'Completado', color: '#27ae60', bgColor: '#27ae60' }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50" />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-[#3498db]/10 text-[#3498db]">Gestión visual</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Tablero Kanban <span className="gradient-text">colaborativo</span></h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">Arrastra tareas entre columnas para gestionar el flujo de trabajo. Cada orden avanza visualmente a través de las etapas de producción.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              className="bg-white rounded-xl shadow-lg border-2 overflow-hidden"
              style={{ borderColor: `${column.bgColor}30` }}
            >
              <div className="p-4 border-b-2" style={{ borderColor: column.bgColor, backgroundColor: `${column.bgColor}08` }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.bgColor }} />
                  <h3 className="font-bold text-slate-800">{column.title}</h3>
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full inline-block">
                  {tasks[column.id].length} tareas
                </span>
              </div>

              <div className="p-3 space-y-3 min-h-[300px]">
                {tasks[column.id].map((task) => (
                  <motion.div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, column.id)}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white to-slate-50 rounded-lg p-3 shadow-md border border-slate-100 cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-slate-700 flex-1">{task.title}</p>
                      <span className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {tasks[column.id].length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <p className="text-sm">Sin tareas</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600 text-center">💡 <strong>Prueba arrastrando tareas</strong> entre columnas para ver cómo el sistema visualiza el avance de producción</p>
        </motion.div>
      </div>
    </section>
  );
};

const FlowSection = () => {
  const steps = [
    { number: '01', title: 'Diseño y planeación', description: 'Tablas de medida, ficha técnica y estimaciones listas para costeo.', icon: Ruler, color: '#9b59b6' },
    { number: '02', title: 'Corte y ejecución', description: 'Órdenes, insumos y avances con control de tiempos.', icon: Scissors, color: '#e74c3c' },
    { number: '03', title: 'Producción y trazabilidad', description: 'Rutas operacionales y seguimiento por lote o referencia.', icon: Factory, color: '#f39c12' },
    { number: '04', title: 'Inventario y ventas', description: 'Producto terminado conectado a POS y reportes finales.', icon: ShoppingCart, color: '#27ae60' },
  ];

  return (
    <section id="flujo" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#3498db]/5 to-transparent" />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Badge variant="secondary" className="mb-4 bg-[#27ae60]/10 text-[#27ae60]">Flujo de trabajo</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Un flujo de trabajo <span className="gradient-text">sin saltos</span></h2>
            <p className="text-lg text-slate-600 mb-8">Conecta los equipos de diseño, corte, producción y comercial en un mismo tablero.</p>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${step.color}15` }}>
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1"><span className="text-sm font-bold" style={{ color: step.color }}>{step.number}</span><h4 className="font-semibold text-slate-800">{step.title}</h4></div>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="bg-gradient-to-br from-[#2c3e50] to-[#34495e] rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><Layers className="w-6 h-6 text-[#3498db]" />Vista operativa</h3>
              <ul className="space-y-4">
                {['Órdenes en proceso y avance por línea', 'Tablas de medidas centralizadas', 'Alertas de insumos críticos', 'Distribución y entregas trazables', 'Dashboard en tiempo real', 'Reportes automáticos'].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#3498db]" /><span className="text-slate-200">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div><div className="text-sm text-slate-400">Eficiencia promedio</div><div className="text-3xl font-bold text-[#27ae60]">94.2%</div></div>
                  <div className="w-24 h-24 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                      <motion.circle cx="48" cy="48" r="40" fill="none" stroke="#27ae60" strokeWidth="8" strokeLinecap="round" initial={{ strokeDasharray: '0 251' }} whileInView={{ strokeDasharray: '236 251' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SecuritySection = () => {
  const permissions = [
    { module: 'Inventario Tela', access: 'edit', icon: Package },
    { module: 'Producción', access: 'view', icon: Factory },
    { module: 'POS', access: 'edit', icon: ShoppingCart },
    { module: 'Reportes', access: 'admin', icon: BarChart3 },
  ];

  return (
    <section id="seguridad" className="py-20 relative">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Badge variant="secondary" className="mb-4 bg-[#e74c3c]/10 text-[#e74c3c]"><Shield className="w-3 h-3 mr-1" />Seguridad</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Permisos detallados <span className="gradient-text">por módulo</span></h2>
            <p className="text-lg text-slate-600 mb-6">Define quién puede ver, editar o administrar cada parte del sistema. OXEN incluye perfiles con control detallado y modo solo lectura para equipos operativos.</p>
            <div className="flex flex-wrap gap-3">
              {['Admin total', 'Solo lectura', 'Edición por área', 'Perfiles por rol'].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-[#3498db]/10 text-[#3498db] rounded-full text-sm font-medium">{tag}</span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><Users className="w-5 h-5 text-[#3498db]" />Usuarios y permisos</h3>
              <div className="space-y-3">
                {permissions.map((perm, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center"><perm.icon className="w-5 h-5 text-slate-300" /></div>
                      <span className="text-white font-medium">{perm.module}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${perm.access === 'admin' ? 'bg-purple-500/20 text-purple-300' : perm.access === 'edit' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>
                      {perm.access === 'admin' ? 'Admin' : perm.access === 'edit' ? 'Editar' : 'Ver'}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm"><span className="text-slate-400">Total de usuarios</span><span className="text-white font-semibold">12 activos</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ReportsSection = () => {
  const reports = [
    { icon: Factory, title: 'Producción', description: 'Avance por orden, eficiencia por línea y cumplimiento de entregas.', color: '#3498db', metrics: ['Órdenes activas', 'Eficiencia', 'Tiempos'] },
    { icon: Package, title: 'Inventarios', description: 'Rotación de insumos, stock crítico y movimientos en tiempo real.', color: '#27ae60', metrics: ['Stock actual', 'Rotación', 'Alertas'] },
    { icon: ShoppingCart, title: 'Ventas', description: 'Análisis de referencias, puntos de venta y comportamiento de clientes.', color: '#f39c12', metrics: ['Ventas diarias', 'Top productos', 'Tendencias'] },
  ];

  return (
    <section id="reportes" className="py-20 bg-slate-50 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-[#f39c12]/10 text-[#f39c12]"><BarChart3 className="w-3 h-3 mr-1" />Reportes</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Reportes que hablan tu <span className="gradient-text">lenguaje</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Visualiza producción, ventas e inventarios para decidir más rápido.</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
          {reports.map((report, i) => (
            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -8 }} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${report.color}15` }}>
                <report.icon className="w-7 h-7" style={{ color: report.color }} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{report.title}</h3>
              <p className="text-slate-600 mb-4">{report.description}</p>
              <div className="flex flex-wrap gap-2">
                {report.metrics.map((metric, j) => (
                  <span key={j} className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${report.color}15`, color: report.color }}>{metric}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const PricingSection = ({ setIsContactOpen }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const plans = [
    { 
      id: 'basic', 
      name: 'Plan Básico', 
      users: 'Hasta 5 usuarios', 
      features: [
        { name: 'Inventarios (insumos, materia prima)', included: true }, 
        { name: 'Kardex y reservas por orden', included: true }, 
        { name: 'Órdenes de producción', included: true }, 
        { name: 'Diseño: ficha técnica y ficha de corte', included: true }, 
        { name: 'Diseño: ruta y tabla de medidas', included: false }, 
        { name: 'Registros de producción por etapa', included: false }, 
        { name: 'Control de talleres y satélites', included: false }, 
        { name: 'Producto terminado y ventas', included: false }, 
        { name: 'Dashboards y alertas operativas', included: false }, 
        { name: 'Módulo de costos', included: false }, 
        { name: 'Soporte prioritario 24/7', included: false }
      ] 
    },
    { 
      id: 'pro', 
      name: 'Plan Profesional', 
      users: 'Hasta 10 usuarios', 
      popular: true, 
      features: [
        { name: 'Inventarios (insumos, materia prima)', included: true }, 
        { name: 'Kardex y reservas por orden', included: true }, 
        { name: 'Órdenes de producción', included: true }, 
        { name: 'Diseño: ficha técnica y ficha de corte', included: true }, 
        { name: 'Diseño: ruta y tabla de medidas', included: true }, 
        { name: 'Registros de producción por etapa', included: true }, 
        { name: 'Control de talleres y satélites', included: true }, 
        { name: 'Producto terminado y ventas', included: true }, 
        { name: 'Dashboards y alertas operativas', included: true }, 
        { name: 'Módulo de costos', included: true }, 
        { name: 'Soporte prioritario 24/7', included: true }
      ] 
    },
  ];

  return (
    <section id="cotizacion" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3498db]/5 to-transparent" />
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-[#27ae60]/10 text-[#27ae60]"><CreditCard className="w-3 h-3 mr-1" />Cotización</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Planes pensados para <span className="gradient-text">crecer contigo</span></h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">OXEN centraliza inventarios, producción y control operativo en tiempo real. El Plan Básico ya entrega estructura completa para operar, y el Profesional desbloquea el control total.</p>
        </motion.div>
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-100 p-1 rounded-xl">
            {plans.map((plan) => (
              <button key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`px-6 py-3 rounded-lg font-medium transition-all ${selectedPlan === plan.id ? 'bg-white text-[#3498db] shadow-md' : 'text-slate-600 hover:text-slate-800'}`}>{plan.name}</button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {plans.map((plan) => plan.id === selectedPlan && (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <div className={`bg-white rounded-3xl shadow-xl border-2 overflow-hidden ${plan.popular ? 'border-[#3498db]' : 'border-slate-100'}`}>
                {plan.popular && <div className="bg-[#3498db] text-white text-center py-2 text-sm font-medium">Más popular</div>}
                <div className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    <div className="lg:col-span-1">
                      <div className="flex flex-col items-center justify-center h-full py-8 lg:py-0">
                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform hover:scale-110 ${plan.id === 'basic' ? 'bg-[#3498db]/15' : 'bg-[#27ae60]/15'}`}>
                          {plan.id === 'basic' ? (
                            <Layers className={`w-10 h-10 ${plan.id === 'basic' ? 'text-[#3498db]' : 'text-[#27ae60]'}`} />
                          ) : (
                            <Sparkles className={`w-10 h-10 ${plan.id === 'basic' ? 'text-[#3498db]' : 'text-[#27ae60]'}`} />
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">{plan.name}</h3>
                        <p className="text-slate-600 text-center mb-4">{plan.users}</p>
                        <p className="text-sm text-slate-500 text-center leading-relaxed">
                          {plan.id === 'basic' ? 'Estructura sólida para operaciones fundamentales y crecimiento inicial' : 'Solución integral con todas las herramientas para máximo control'}
                        </p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-slate-800 mb-4">Características incluidas</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {plan.features.map((feature, i) => (
                          <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${feature.included ? 'bg-slate-50' : 'bg-slate-50/50'}`}>
                            {feature.included ? <Check className="w-5 h-5 text-[#27ae60] flex-shrink-0" /> : <XIcon className="w-5 h-5 text-slate-300 flex-shrink-0" />}
                            <span className={feature.included ? 'text-slate-700' : 'text-slate-400'}>{feature.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
          <div className="bg-gradient-to-r from-[#3498db]/10 to-[#2980b9]/10 rounded-2xl border border-[#3498db]/20 p-8 lg:p-12">
            <h4 className="text-2xl font-bold text-slate-800 mb-4">Modelo de precios flexible</h4>
            <div className="space-y-3 mb-8 text-lg text-slate-700">
              <p>✓ <strong>Valor inicial de puesta en marcha:</strong> Implementación, instalación, configuración y capacitación (pago único)</p>
              <p>✓ <strong>Pago mensual:</strong> Según el plan elegido, con acceso a todas las características incluidas</p>
            </div>
            <p className="text-slate-600 mb-8">Cada negocio es único. Contáctanos para recibir una <strong>cotización personalizada</strong> basada en tus necesidades específicas.</p>
            <Button className="bg-[#27ae60] hover:bg-[#229954] text-white gap-2 cursor-pointer" onClick={() => setIsContactOpen(true)}>
              <WhatsAppIcon className="w-4 h-4" />
              Solicitar cotización por WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-12 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-[#2c3e50] to-[#34495e]" />
    <div className="absolute inset-0 dot-pattern opacity-10" />
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">¿Listo para modernizar tu <span className="text-[#3498db]">operación textil</span>?</h2>
        <p className="text-base text-slate-300 max-w-2xl mx-auto">Da el siguiente paso en tu negocio: te asesoramos y creamos un plan de implementación pensado para ti.</p>
      </motion.div>
    </div>
  </section>
);

const Footer = () => {
  const links = [
    { href: '#modulos', label: 'Módulos' },
    { href: '#flujo', label: 'Flujo' },
    { href: '#seguridad', label: 'Permisos' },
    { href: '#reportes', label: 'Reportes' },
    { href: '#cotizacion', label: 'Precios' },
  ];

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <OxenLogo size="sm" animated={false} />
            <div className="text-sm text-slate-400">Gestión de producción para la industria textil</div>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (<a key={link.href} href={link.href} className="text-slate-400 hover:text-white transition-colors">{link.label}</a>))}
          </nav>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} OXEN. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
};

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />
      <main>
        <HeroSection />
        <VideoSection />
        <ModulesSection />
        <KanbanSection />
        <FlowSection />
        <SecuritySection />
        <ReportsSection />
        <PricingSection setIsContactOpen={setIsContactOpen} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
