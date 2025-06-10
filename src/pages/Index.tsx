import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { MascotAvatar } from "@/components/ui/mascot-avatar";
import { useLanguage } from "@/hooks/store/use-language";
import { useAuth } from "@/hooks/api/use-auth";
import {
  MessageSquare,
  Lightbulb,
  Github,
  Linkedin,
  ChevronRight,
  Globe,
  Mic,
  BarChart3,
  User,
  Brain,
} from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Note Taking",
      description:
        "Listens to lectures and generates lecture notes in any language.",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Chat-bot",
      description:
        "Answers academic questions based on lecture and Moodle content.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Progress Tracker",
      description:
        "Offers analytics and personalized recommendations for academic success.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Moodle Integration",
      description:
        "Seamlessly integrates with your university's Moodle platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass backdrop-blur-xl border-b border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <MascotAvatar
                size="md"
                animate={true}
                className="relative z-10"
              />
              {/* </div> */}
              <span className="font-orbitron font-bold text-xl smartmate-text-gradient">
                SmartMate
              </span>
            </div>

            <div className="flex items-center gap-4">
              <LanguageToggle />
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-2">
                {isAuthenticated ? (
                  <Link to="/app/dashboard">
                    <div className="flex items-center gap-2 hover:bg-smartmate-teal/10 p-2 rounded-lg transition-colors">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue text-white text-sm">
                          {user?.firstName?.[0]}
                          {user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">Go to App</span>
                    </div>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        variant="ghost"
                        className="hover:bg-smartmate-teal/10"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1920&q=80"
            alt="Student using laptop for studying"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/85"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 smartmate-text-gradient font-orbitron">
            Your Smart Classmate
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering university students to attain academic success through
            intelligent note-taking, AI-powered assistance, and comprehensive
            progress tracking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated ? (
              <Link to="/app/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 text-lg px-8 py-4 h-auto group"
                >
                  <User className="mr-2 w-5 h-5" />
                  Go to Dashboard
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 text-lg px-8 py-4 h-auto group"
                  >
                    Start Your Journey
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-smartmate-teal text-smartmate-teal hover:bg-smartmate-teal/10 text-lg px-8 py-4 h-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-orbitron">
              What We <span className="smartmate-text-gradient">Offer</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to excel in your academic journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-smartmate-teal to-smartmate-blue flex items-center justify-center mx-auto mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-orbitron">
              How It <span className="smartmate-text-gradient">Works</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="Woman using laptop for online learning"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-smartmate-teal to-smartmate-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Record or Upload
                  </h3>
                  <p className="text-muted-foreground">
                    Upload your lecture recordings or connect directly to live
                    sessions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-smartmate-blue to-smartmate-lavender flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">AI Processing</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI models transcribe, summarize, and process
                    the content.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-smartmate-pink to-smartmate-peach flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Get Smart Notes
                  </h3>
                  <p className="text-muted-foreground">
                    Receive comprehensive notes in your preferred language with
                    key insights.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-smartmate-mint to-smartmate-teal flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Chat & Learn</h3>
                  <p className="text-muted-foreground">
                    Ask questions and get instant, intelligent responses to
                    deepen understanding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Developer Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-orbitron">
              Built with <span className="smartmate-text-gradient">Love</span>
            </h2>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg leading-relaxed mb-6">
                    Created by{" "}
                    <strong className="smartmate-text-gradient">
                      Aishah Ayomide Mabayoje
                    </strong>{" "}
                    for her graduation project. Having been tutoring her
                    colleagues since first year, she wanted to leave something
                    meaningful behind - a tool that could help future students
                    succeed in their academic journey.
                  </p>

                  <div className="flex gap-6">
                    <a
                      href="https://github.com/m-aishah"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-smartmate-teal transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/aishah-mabayoje-a78430252/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-smartmate-blue transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80"
                    alt="Modern workspace setup"
                    className="w-full h-[250px] object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-orbitron">
            Ready to Transform Your{" "}
            <span className="smartmate-text-gradient">Academic Journey?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join students who are using SmartMate to achieve academic
            excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/app/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 text-lg px-12 py-4 h-auto group"
                >
                  <User className="mr-2 w-5 h-5" />
                  Go to Dashboard
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-smartmate-teal to-smartmate-blue hover:from-smartmate-teal/90 hover:to-smartmate-blue/90 text-lg px-12 py-4 h-auto"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-smartmate-teal text-smartmate-teal hover:bg-smartmate-teal/10 text-lg px-12 py-4 h-auto"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MascotAvatar size="sm" animate={true} className="relative z-10" />
            <span className="font-orbitron font-bold smartmate-text-gradient">
              SmartMate
            </span>
          </div>
          <p className="text-muted-foreground">
            Built with ❤️ by Aishah Mabayoje • Empowering Academic Success
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
