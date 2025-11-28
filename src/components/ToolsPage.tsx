import React, { useState } from 'react';
import Sidebar from '@/components/ui/sidebar'; 
import Header from '@/components/Header';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Wrench, FileText, Users, Database, Shield, BarChart, X } from 'lucide-react';
import {
  aiAssistants,
  pharmacovigilanceTools,
  clinicalResearchTools,
  qaQcTools,
  regulatoryAffairsTools,
  medicalAffairsTools,
  clinicalDataManagementTools
} from '@/components/data/toolsdata';
import { BentoGrid, BentoCard } from '@/components/Reactbits/bento-grid';

export default function ToolsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAssistantLaunch = (name, link) => {
    window.open(link, '_blank');
  };

  const handleCategoryClick = (category, tools) => {
    setSelectedCategory({ name: category, tools });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCategory(null), 300);
  };

  const categories = [
    { 
      name: 'Pharmacovigilance Tools', 
      icon: Wrench, 
      tools: pharmacovigilanceTools,
      description: 'Tools for monitoring and ensuring drug safety.',
      background: (
        <div className="absolute inset-0 flex items-center justify-center z-10">
        
        </div>
      )
    },
    { 
      name: 'Clinical Research Tools', 
      icon: FileText, 
      tools: clinicalResearchTools,
      description: 'Resources for conducting clinical trials and research.',
      background: (
        <div className="absolute inset-0 flex items-center justify-center z-10">
       
        </div>
      )
    },
    { 
      name: 'QA/QC Tools', 
      icon: Shield, 
      tools: qaQcTools,
      description: 'Quality assurance and control tools for compliance.',
      background: (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          
        </div>
      )
    },
    { 
      name: 'Regulatory Affairs Tools', 
      icon: FileText, 
      tools: regulatoryAffairsTools,
      description: 'Tools for managing regulatory submissions and compliance.',
      background: (
        <div className="absolute inset-0 flex items-center justify-center z-10">
         
        </div>
      )
    },
    { 
      name: 'Medical Affairs Tools', 
      icon: Users, 
      tools: medicalAffairsTools,
      description: 'Resources for medical affairs and stakeholder engagement.',
      background: (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          
        </div>
      )
    },
    { 
      name: 'Clinical Data Management Tools', 
      icon: Database, 
      tools: clinicalDataManagementTools,
      description: 'Tools for managing and analyzing clinical data.',
      background: (
        <div className="absolute inset-0 flex items-center justify-center z-10">
         
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-2xl font-bold">ΩMEGA Tools</h1>

          {/* AI Assistants Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Research Assistants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiAssistants.map((assistant) => (
                  <Card
                    key={assistant.name}
                    className="border-2 border-primary/20 hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={assistant.icon} 
                          alt={`${assistant.name} icon`} 
                          className="h-8 w-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 
                            className="font-semibold transition-colors duration-200 group-hover:text-red-600"
                          >
                            {assistant.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {assistant.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAssistantLaunch(assistant.name, assistant.link)}
                        className="w-full transition-all duration-200 hover:scale-105"
                      >
                        Launch Assistant
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro Training Tools Section with BentoGrid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Pro Training Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <BentoCard
                    key={category.name}
                    name={category.name}
                    className="col-span-1 relative group cursor-pointer overflow-hidden"
                    background={category.background}
                    Icon={category.icon}
                    description={category.description}
                    href="#"
                    cta="View Tools"
                    onClick={() => handleCategoryClick(category.name, category.tools)}
                  />
                ))}
              </BentoGrid>
            </CardContent>
          </Card>

          {/* Modal for Displaying Tools */}
          {isModalOpen && selectedCategory && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
              <Card
                className={`w-[90vw] max-w-5xl max-h-[80vh] overflow-y-auto scrollbar-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
                  isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
              >
                <CardHeader className="relative border-b border-primary/10">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Wrench className="h-5 w-5 text-primary" />
                    {selectedCategory.name}
                  </CardTitle>
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedCategory.tools.map((tool) => (
                      <Card 
                        key={tool.name} 
                        className="hover:shadow-lg transition-transform duration-300 group hover:-translate-y-1"
                      >
                        <CardContent className="p-4 text-center">
                          {typeof tool.icon === 'string' ? (
                            <img 
                              src={tool.icon} 
                              alt={`${tool.name} icon`} 
                              className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform text-primary"
                            />
                          ) : (
                            <tool.icon className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                          )}
                          <h3 className="font-semibold text-sm mb-1 transition-colors duration-200 group-hover:text-primary">
                            {tool.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {tool.description}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {tool.category || 'General'}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {selectedCategory.tools.length === 0 && (
                    <div className="text-center py-12">
                      <Wrench className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">No tools available for this category.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Custom Styles */}
          <style >{`
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .scrollbar-hidden {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
            .scrollbar-hidden::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>
        </main>
      </div>
    </div>
  );
}