import React from "react";
import {
  ArrowRight,
  MessageCircle,
  Users,
  Video,
  Globe,
  Shield,
  Zap,
  Code,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import heroImage from "../assets/hero-saas-ui.png";

const features = [
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description:
      "Instant messaging with friends worldwide. Share ideas, code, and learn together.",
    colSpan: "md:col-span-2",
  },
  {
    icon: Video,
    title: "HD Video Calls",
    description:
      "Face-to-face conversations to practice and collaborate more effectively.",
    colSpan: "md:col-span-1",
  },
  {
    icon: Globe,
    title: "Language Exchange",
    description:
      "Connect with native speakers and programming enthusiasts globally.",
    colSpan: "md:col-span-1",
  },
  {
    icon: Code,
    title: "Collaborative Coding",
    description:
      "Share snippets and debug together in a seamless synced environment.",
    colSpan: "md:col-span-2",
  },
];

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "150+", label: "Countries" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Community Support" },
];

const HowItWorksStep = ({ number, title, description, isLast }) => (
  <div className="flex relative">
    <div className="flex flex-col items-center mr-6">
      <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-bold text-primary-foreground shadow-glow z-10">
        {number}
      </div>
      {!isLast && <div className="w-1 bg-border/50 h-full -my-2" />}
    </div>
    <div className="pb-12 pt-2">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 glass border-b border-border/50"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
              <MessageCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Collab Sphere
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-bold gradient-bg text-primary-foreground px-6 py-2.5 rounded-full hover:opacity-90 transition-all shadow-glow hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex items-center z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-8 backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>The next generation of collaboration</span>
              </motion.div>

              <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
                Connect. <br />
                Create. <br />
                <span className="gradient-text">Collaborate.</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg border-l-4 border-primary/50 pl-6">
                A unified platform where developers and learners unite. Break
                language barriers, share code in real-time, and build the future
                together.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 gradient-bg text-primary-foreground px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-glow text-lg"
                >
                  Start For Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold bg-secondary/50 hover:bg-secondary text-foreground backdrop-blur-lg border border-border/50 hover:border-border transition-all text-lg"
                >
                  View Demo
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/30 blur-[100px] rounded-full" />
              <motion.img
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src={heroImage}
                alt="Collab Sphere 3D Abstract"
                className="relative rounded-3xl shadow-2xl w-full object-cover border border-white/10 glass"
              />

              {/* Floating Status Card */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-10 -left-10 glass p-5 rounded-2xl border border-white/10 shadow-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="User"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Sarah just joined!
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Looking for React partners
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 z-10 relative">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-2">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-32 px-6 z-10 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Everything you need to{" "}
              <span className="gradient-text">excel</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Enterprise-grade tools packed into a beautiful, intuitive
              interface designed for absolute focus.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`group relative overflow-hidden rounded-3xl p-8 border border-white/5 bg-gradient-to-b from-card/80 to-background/40 backdrop-blur-md hover:border-primary/30 transition-colors ${f.colSpan}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <f.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 bg-secondary/20 z-10 relative border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Seamless workflow from{" "}
                <span className="gradient-text">day one</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                We've stripped away the complexity so you can focus entirely on
                what matters: learning and building.
              </p>

              <div className="max-w-md">
                <HowItWorksStep
                  number="1"
                  title="Create your profile"
                  description="Tell us your skills, languages you speak, and what you're looking to learn."
                />
                <HowItWorksStep
                  number="2"
                  title="Get matched instantly"
                  description="Our algorithm pairs you with the perfect partner based on mutual goals."
                />
                <HowItWorksStep
                  number="3"
                  title="Hop into a workspace"
                  description="Start chatting, video calling, and sharing code all in one unified interface."
                  isLast={true}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="glass border border-white/10 rounded-2xl w-full h-[500px] p-6 shadow-2xl relative overflow-hidden flex flex-col">
                {/* Mock UI */}
                <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 space-y-4 overflow-hidden relative">
                  {/* Chat Bubble 1 */}
                  <div className="flex gap-3 max-w-[90%]">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border border-border shrink-0"
                    />
                    <div className="bg-secondary/50 rounded-2xl rounded-tl-sm p-3">
                      <p className="text-sm">
                        Hey! Are we still pairing on that Python script today?
                      </p>
                    </div>
                  </div>
                  {/* Chat Bubble 2 */}
                  <div className="flex gap-3 flex-row-reverse max-w-[90%] ml-auto">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border-2 border-primary shrink-0"
                    />
                    <div className="gradient-bg text-white rounded-2xl rounded-tr-sm p-3 shadow-glow">
                      <p className="text-sm">
                        Absolutely! Just wrapping up my coffee. Sent you a
                        workspace link.
                      </p>
                    </div>
                  </div>
                  {/* Chat Bubble 3 (Code Snippet) */}
                  <div className="flex gap-3 max-w-[90%]">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border border-border shrink-0"
                    />
                    <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl rounded-tl-sm p-3 w-full font-mono text-xs overflow-hidden shadow-xl">
                      <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                        <Code className="w-3 h-3 text-primary" />{" "}
                        <span className="text-white/80">app.py</span>
                      </div>
                      <div className="text-white/70 leading-relaxed">
                        <span className="text-pink-400">def</span>{" "}
                        <span className="text-blue-400">collab</span>():
                        <br />
                        &nbsp;&nbsp;
                        <span className="text-pink-400">return</span>{" "}
                        <span className="text-green-400">"Awesome!"</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 flex gap-4">
                  <div className="flex-1 h-12 bg-secondary/30 rounded-full border border-white/5 flex items-center px-4">
                    <span className="text-sm text-muted-foreground font-medium">
                      Type a message...
                    </span>
                  </div>
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center shadow-glow">
                    <ChevronRight className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Epic CTA */}
      <section className="py-32 px-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-5xl"
        >
          <div className="relative rounded-[3rem] overflow-hidden p-16 sm:p-24 text-center border border-white/10 glass">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 animate-pulse" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
                Ready to accelerate <br className="hidden md:block" /> your
                learning journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join the fastest growing community of developers and polyglots.
                Create your free account in seconds.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 gradient-bg text-primary-foreground px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_40px_rgba(34,197,94,0.4)] text-lg"
              >
                Join Collab Sphere Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background z-10 relative">
        <div className="container mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">Collab Sphere</span>
            </div>

            <div className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Collab Sphere. All rights reserved.
              Let's build together.
            </div>

            <div className="flex gap-6 text-sm font-medium">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
