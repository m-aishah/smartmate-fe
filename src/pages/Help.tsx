
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/store/use-language";
import { Heart, Mail, Globe, Users, BookOpen, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Help = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("howToUploadLecture"),
      answer: t("howToUploadLectureAnswer")
    },
    {
      question: t("howChatAssistantWorks"),
      answer: t("howChatAssistantWorksAnswer")
    },
    {
      question: t("canSearchTopics"),
      answer: t("canSearchTopicsAnswer")
    },
    {
      question: t("howToFavoriteLecture"),
      answer: t("howToFavoriteLectureAnswer")
    },
    {
      question: t("canShareLectures"),
      answer: t("canShareLecturesAnswer")
    },
    {
      question: t("howToCreateFlashcardsQuizzes"),
      answer: t("howToCreateFlashcardsQuizzesAnswer")
    },
    {
      question: t("canSelectMaterials"),
      answer: t("canSelectMaterialsAnswer")
    }
  ];

  return (
    <div className="space-y-6 pb-10 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-smartmate-teal to-smartmate-blue bg-clip-text text-transparent mb-2">
          {t("smartMateHelpCenter")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("helpCenterDescription")}
        </p>
      </div>

      {/* About SmartMate Section */}
      <Card className="portal-card border-smartmate-blue/30 bg-gradient-to-br from-smartmate-blue/5 to-smartmate-teal/5">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-smartmate-teal" />
            <CardTitle className="text-2xl bg-gradient-to-r from-smartmate-teal to-smartmate-blue bg-clip-text text-transparent">
              {t("aboutSmartMate")}
            </CardTitle>
            <Sparkles className="h-6 w-6 text-smartmate-blue" />
          </div>
          <CardDescription className="text-base">
            {t("aboutSmartMateDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-smartmate-teal/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-smartmate-teal to-smartmate-blue flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t("builtWithPassion")}</h3>
                <p className="text-sm text-muted-foreground">{t("graduationProject")}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-smartmate-teal" />
                  <span className="font-medium">{t("createdBy")}</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  <strong>Aishah Mabayoje</strong> - {t("computerScienceGraduate")}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-smartmate-blue" />
                  <span className="font-medium">{t("projectType")}</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  {t("finalYearProject")}
                </p>
              </div>
            </div>

            <div className="border-t border-smartmate-teal/20 pt-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4 text-smartmate-teal" />
                {t("missionStatement")}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("missionStatementText")}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline" className="bg-smartmate-teal/10 border-smartmate-teal/30 text-smartmate-teal">
                {t("aiPoweredLearning")}
              </Badge>
              <Badge variant="outline" className="bg-smartmate-blue/10 border-smartmate-blue/30 text-smartmate-blue">
                {t("studentCenteredDesign")}
              </Badge>
              <Badge variant="outline" className="bg-smartmate-lavender/10 border-smartmate-lavender/30 text-smartmate-lavender">
                {t("academicExcellence")}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* FAQ Section */}
      <Card className="portal-card border-smartmate-teal/30 relative z-20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-smartmate-teal" />
            {t("frequentlyAskedQuestions")}
          </CardTitle>
          <CardDescription>
            {t("faqDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-30">
          <Accordion type="single" collapsible className="w-full relative z-40">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="relative z-50">
                <AccordionTrigger className="text-left hover:text-smartmate-teal transition-colors relative z-50">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed relative z-50">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      {/* Contact Support Section */}
      <Card className="portal-card border-smartmate-blue/30 bg-gradient-to-br from-smartmate-blue/5 to-smartmate-lavender/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-smartmate-blue" />
            {t("contactSupport")}
          </CardTitle>
          <CardDescription>
            {t("contactSupportDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-smartmate-blue/20">
            <p className="text-muted-foreground mb-4">
              {t("emailSupport")} <strong>support@smartmate.edu</strong> {t("orUseChat")}
              <Badge variant="outline" className="mx-1">{t("iNeedHelp")}</Badge> 
              {t("toConnectSupport")}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>{t("supportHours")}:</strong> {t("supportHoursTime")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <Card className="portal-card border-smartmate-lavender/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-smartmate-lavender" />
            {t("smartMateFeatures")}
          </CardTitle>
          <CardDescription>
            {t("featuresDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-smartmate-teal">{t("learningTools")}</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• {t("aiPoweredChatAssistant")}</li>
                <li>• {t("lectureUploadManagement")}</li>
                <li>• {t("interactiveFlashcardGeneration")}</li>
                <li>• {t("automatedQuizCreation")}</li>
                <li>• {t("smartMaterialOrganization")}</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-smartmate-blue">{t("studyFeatures")}</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• {t("contextualAttachmentSelection")}</li>
                <li>• {t("markdownCodeSupport")}</li>
                <li>• {t("downloadableResponses")}</li>
                <li>• {t("crossPlatformAccessibility")}</li>
                <li>• {t("realTimeCollaboration")}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
