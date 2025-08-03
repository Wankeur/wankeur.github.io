import React from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'

interface HomePageProps {
  user: User
  userProfile: any
}

export default function HomePage({ user, userProfile }: HomePageProps) {
  const handleSignOut = () => {
    supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen hero-gradient">
      {/* Navigation */}
      <nav className="bg-card/10 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="font-bold text-xl accent-gradient bg-clip-text text-transparent">
              DÆDALE
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {userProfile?.first_name || user.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="accent-gradient bg-clip-text text-transparent">DÆDALE</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Dynamic Automation & Electronics for Digital Advanced Learning in Engineering. 
            A project sharing and learning platform for automation enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="glow-effect">
              Explore Projects
            </Button>
            <Button size="lg" variant="outline">
              Share Knowledge
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-card/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About the Platform</h2>
              <p className="text-muted-foreground mb-4">
                Created by Alexandre Radermacker, an automation engineering student passionate about 
                sharing knowledge and resources in the field of industrial automation.
              </p>
              <p className="text-muted-foreground">
                This platform aims to bridge the gap in knowledge sharing for automation, robotics, 
                and industrial engineering projects.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Automation', 'Siemens', 'Beckhoff', 'C/C++', 'Python', 
                  'Industrial Robotics', 'ROS2', '3D Printing', 'CNC Machines'
                ].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-card text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">Automation Projects</h3>
              <p className="text-muted-foreground">
                Explore and share industrial automation projects with detailed documentation.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-card text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Learning Resources</h3>
              <p className="text-muted-foreground">
                Access tutorials, guides, and educational content for automation engineering.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-card text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Practical Tools</h3>
              <p className="text-muted-foreground">
                Find practical tools and resources for your automation projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}