/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SubjectType, Problem } from './types';
import { INITIAL_PROBLEMS, USER_PROFILE } from './mockData';
import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { ReviewPage } from './components/ReviewPage';
import { AiTutorPage } from './components/AiTutorPage';
import { DashboardPage } from './components/DashboardPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { RegisterModal } from './components/RegisterModal';
import { SettingsModal } from './components/SettingsModal';
import { GuideModal } from './components/GuideModal';
import { TutorialVideoModal } from './components/TutorialVideoModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('error-review');
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);
  const [selectedProblemId, setSelectedProblemId] = useState<string>('Q14');
  const [currentSubject, setCurrentSubject] = useState<SubjectType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [weeklySolved, setWeeklySolved] = useState(USER_PROFILE.weeklySolved);
  const [weeklyGoal, setWeeklyGoal] = useState(USER_PROFILE.weeklyGoal);

  // Modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Filter problems by subject & search query
  const filteredProblems = problems.filter((prob) => {
    const matchesSubject = currentSubject === 'all' || prob.subject === currentSubject;
    const matchesSearch =
      !searchQuery.trim() ||
      prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.questionText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const activeProblem =
    problems.find((p) => p.id === selectedProblemId) ||
    filteredProblems[0] ||
    problems[0];

  const handleToggleSolved = (probId: string) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id === probId) {
          const nextSolved = !p.isSolved;
          setWeeklySolved((w) => (nextSolved ? Math.min(weeklyGoal, w + 1) : Math.max(0, w - 1)));
          return { ...p, isSolved: nextSolved };
        }
        return p;
      })
    );
  };

  const handleAddProblem = (newProb: Problem) => {
    setProblems((prev) => [newProb, ...prev]);
    setSelectedProblemId(newProb.id);
    setCurrentTab('error-review');
  };

  const handleTabChange = (tab: NavTab) => {
    if (tab === 'error-register') {
      setIsRegisterOpen(true);
      return;
    }
    if (tab === 'ai-tutor' && selectedProblemId === 'Q14') {
      // Switch to Q15 for AI Socratic tutor mode
      setSelectedProblemId('Q15');
    }
    setCurrentTab(tab);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* Left Fixed Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        weeklySolved={weeklySolved}
        weeklyGoal={weeklyGoal}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenVideo={() => setIsVideoModalOpen(true)}
      />

      <div className="pl-64 flex flex-col min-h-screen">
        {/* Fixed Top Header */}
        <Header
          currentSubject={currentSubject}
          onSelectSubject={(subj) => {
            setCurrentSubject(subj);
            if (subj !== 'all') {
              const matched = problems.find((p) => p.subject === subj);
              if (matched) setSelectedProblemId(matched.id);
            }
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenRegisterModal={() => setIsRegisterOpen(true)}
        />

        {/* Main Content Workspace */}
        <main className="relative pt-16 bg-surface min-h-[calc(100vh-4rem)] w-full">
          {currentTab === 'error-review' && (
            <ReviewPage
              problem={activeProblem}
              onToggleSolved={handleToggleSolved}
              onNavigateToAiTutor={() => {
                setSelectedProblemId(activeProblem.id);
                setCurrentTab('ai-tutor');
              }}
              onSelectProblem={(id) => setSelectedProblemId(id)}
              allProblems={filteredProblems}
            />
          )}

          {currentTab === 'ai-tutor' && (
            <AiTutorPage
              problem={activeProblem}
              onNavigateToReview={() => setCurrentTab('error-review')}
            />
          )}

          {currentTab === 'dashboard' && (
            <DashboardPage
              problems={filteredProblems}
              onSelectProblem={(id) => setSelectedProblemId(id)}
              onNavigateToReview={() => setCurrentTab('error-review')}
              onNavigateToTutor={() => setCurrentTab('ai-tutor')}
              onOpenRegister={() => setIsRegisterOpen(true)}
              weeklySolved={weeklySolved}
              weeklyGoal={weeklyGoal}
              onOpenVideo={() => setIsVideoModalOpen(true)}
            />
          )}

          {currentTab === 'learning-analytics' && (
            <AnalyticsPage
              onNavigateToReview={() => setCurrentTab('error-review')}
              onNavigateToTutor={() => setCurrentTab('ai-tutor')}
              onOpenVideo={() => setIsVideoModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Tutorial Video Player Modal */}
      <TutorialVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onAddProblem={handleAddProblem}
        onOpenVideo={() => setIsVideoModalOpen(true)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        weeklyGoal={weeklyGoal}
        onUpdateGoal={setWeeklyGoal}
      />

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onOpenVideo={() => setIsVideoModalOpen(true)}
      />
    </div>
  );
}
